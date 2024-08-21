import { useEffect, useState } from "react";
import { P } from "@/components/UI";

export const CountdownTimer = ({ registeredAt, className, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Parse the registration time and add 1 hour
    const targetTime = new Date(
      new Date(registeredAt).getTime() + 10 * 60 * 1000
    );

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetTime - now;
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft(null);
        onTimeUp();
      }
    };

    // Update the countdown every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [registeredAt, onTimeUp]);

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {/* <P name="Time remaining:" /> */}
      {timeLeft ? (
        <ul className="countdown-timer flex item-center gap-1">
          <li className="w-8 h-8 rounded bg-red-color text-white text-sm font-medium flex items-center justify-center">
            <span>{timeLeft.hours}</span>h
          </li>
          <li className="w-8 h-8 rounded bg-red-color text-white text-sm font-medium flex items-center justify-center">
            <span>{timeLeft.minutes}</span>m
          </li>
          <li className="w-8 h-8 rounded bg-red-color text-white text-sm font-medium flex items-center justify-center">
            <span>{timeLeft.seconds}</span>s
          </li>
        </ul>
      ) : (
        <span className="text-red-color">Time is up!</span>
      )}
    </div>
  );
};
