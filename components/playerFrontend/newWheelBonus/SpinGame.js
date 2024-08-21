"use client";

import useApi from "@/helpers/apiRequest";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SpinModal from "./SpinModal";
import "./style.css";

const SpinGame = ({ winNumber, wheelPrizes }) => {
  const { fetchData } = useApi();
  const [activeBtn, setActiveBtn] = useState(false);
  const [deg, setDeg] = useState(0);
  const [winningNumber, setWinningNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [prizes, setPrizes] = useState([]);
  const audioRef = useRef(null);

  // console.log("winNumber spin game", winNumber.id);

  useEffect(() => {
    if (wheelPrizes) {
      setPrizes(wheelPrizes);
    }
  }, [wheelPrizes]);

  const spin = async () => {
    setActiveBtn(true);
    setShowModal(false);

    if (audioRef.current) {
      audioRef.current.play();
    }

    setTimeout(() => {
      setActiveBtn(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }, 5100);

    const numPrizes = prizes.length;
    const prizeIndex = prizes.findIndex((prize) => prize.number === winNumber);

    let spins = Math.floor(Math.random() * 7) + 9;
    let sectorAngle = prizeIndex * (360 / numPrizes);

    let newDeg = deg + 360 * spins + sectorAngle;
    setDeg(newDeg);

    setTimeout(async () => {
      setWinningNumber(prizes[prizeIndex].prize_name);
      setShowModal(true);

      const { data, error } = await fetchData(
        "/player/wheelBonusResult",
        "POST",
        {
          winNumber: prizes[prizeIndex].number,
        }
      );

      if (data) {
        // console.log("API response:", response);
        // toast.success("Your win has been recorded!");
      } else if (error) {
        toast.error(error.message);
      }
    }, 5100);
  };

  return (
    <>
      <div className="tab:w-[600px] h-[400px] tab:h-[500px] relative mt-12">
        <audio
          ref={audioRef}
          src="/audios/spin_sound.mp3"
          preload="auto"
        ></audio>

        <div className="wheel-img">
          <Image
            src="/images/wheel-img.png"
            alt="wheel"
            width="500"
            height="500"
            className="w-full h-full rounded-full"
          />
        </div>

        <div className="wheel">
          <div className="inner" style={{ transform: `rotate(${deg}deg)` }}>
            {prizes.map((prize, index) => (
              <div key={index} className="slice">
                <span className="prize">{prize.prize_name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wheel-outer"></div>

        <svg id="svg-arrow" xmlns="http://www.w3.org/2000/svg">
          <path
            style={{
              fill: "#ff2e52",
              stroke: "#012e52",
              strokeWidth: 4,
              strokeLinejoin: "round",
            }}
            d="M 81.540414,49.378716 H 121.51935 L 101.4866,69.420346 Z"
          />
        </svg>
        <button onClick={spin} disabled={activeBtn} className="spin-btn">
          <Image
            src="/images/spin-button.png"
            alt="wheel"
            width="100"
            height="100"
            className="w-full h-full rounded-full"
          />
        </button>

        <SpinModal
          show={showModal}
          onClose={() => setShowModal(false)}
          winningNumber={winningNumber}
        />
      </div>
    </>
  );
};

export default SpinGame;
