import useApi from "@/helpers/apiRequest";
import { cursor } from "@/svgs/RemoverCursor";
import { useEffect, useRef, useState } from "react";
import { ScratchCanvas } from "./ScratchCanvas";
import ScratchModal from "./ScratchModal";

export const ScratchCard = ({
  className = "",
  onComplete = (num) => {},
  setScratchComplete,
}) => {
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState(null);
  const [winnerIndexs, setWinnerIndexs] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [winAmount, setWinAmount] = useState(null);
  const { fetchData } = useApi();

  const winAudioRef = useRef(null);
  const card = useRef();

  const handleScratchComplete = () => {
    const count = {};
    const indices = {};

    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];
      count[num] = (count[num] || 0) + 1;

      if (!indices[num]) {
        indices[num] = [];
      }
      indices[num].push(i);

      if (count[num] === 3) {
        setResult(num);
        setWinnerIndexs(indices[num].slice(0, 3));
        onComplete(num);
        setWinAmount(num);
        setModalIsOpen(true);
        winAudioRef.current.play();
        sendWinAmountToApi(num);
        setScratchComplete(true);
        return;
      }
    }

    setResult(false);
    setWinnerIndexs([null, null, null]);
    onComplete(null);
    setWinAmount(0);
    setModalIsOpen(true);
    sendWinAmountToApi(0);
    setScratchComplete(true);
  };

  const sendWinAmountToApi = async (winAmount) => {
    try {
      const response = await fetchData("/player/scratchBonusClaim", "POST", {
        winAmount,
      });

      console.log("scratchBonusClaim", response);
    } catch (error) {}
  };

  useEffect(() => {
    if (card.current) {
      card.current.style.cursor = `url(${cursor}), auto`;
    }
    const fetchSymbols = async () => {
      setLoading(true);
      setError(null);
      const timestamp = new Date().getTime();

      try {
        const response = await fetch(`/api/getSymbols?timestamp=${timestamp}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch symbols");
        }
        const data = await response.json();
        setNumbers(data.symbols);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSymbols();
  }, []);

  const settings = {
    image: "/images/scratch.png",
    width: 310,
    height: 310,
    finishPercent: 40,
    onComplete: handleScratchComplete,
    customBrush: {
      image: cursor,
      width: 40,
      height: 40,
    },
  };

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.reload();
  };

  return (
    <>
      <div ref={card} className={`w-full ${className}`}>
        <div className="border border-border-color rounded-xl">
          {!loading ? (
            <ScratchCanvas {...settings}>
              <div className="grid grid-cols-3">
                {numbers.map((number, index) => (
                  <div
                    key={index}
                    className="h-[100px] w-full flex items-center justify-center"
                  >
                    <span
                      className={`text-gray-800 text-2xl font-bold ${
                        winnerIndexs.includes(index) &&
                        "animate-pulse text-yellow-600"
                      }`}
                      style={{
                        textShadow:
                          "-2px 0 1px #fff, 0 2px 1px #fff, 2px 0 1px #fff, 0 -2px 1px #fff",
                      }}
                    >
                      ${number}
                    </span>
                  </div>
                ))}
              </div>
            </ScratchCanvas>
          ) : (
            <div className="w-[310px] h-[310px] bg-gray-400 flex justify-center items-center">
              <h2 className="h2">Loading...</h2>
            </div>
          )}
        </div>
      </div>
      <ScratchModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        btnPosition="!-top-[50px] !right-5"
      >
        {winAmount ? (
          <div
            className="p-3 text-center w-[300px] bg-white rounded-lg relative -top-[55px] left-1"
            btnPosition="Rasel2"
          >
            <h2 className="text-2xl font-bold">
              Congratulations! you won: ${winAmount}
            </h2>
          </div>
        ) : (
          <div className="p-3 text-center w-[300px] bg-white rounded-lg relative -top-[55px] left-1">
            <p className="text-lg">Better luck next time</p>
          </div>
        )}
      </ScratchModal>
      <audio ref={winAudioRef} src="/audios/scratch_win.mp3" />
    </>
  );
};
