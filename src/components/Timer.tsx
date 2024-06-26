import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { TimerComponentProps } from "../types";

interface TimeLeft {
  minutes?: number;
  seconds?: number;
}

const TimerComponent: React.FC<TimerComponentProps> = ({
  minutes,
  onTimeout,
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const endTime = localStorage.getItem("endTime");
    if (!endTime) return {};

    const currentTime = new Date().getTime();
    const difference = parseInt(endTime) - currentTime;
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      onTimeout();
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!localStorage.getItem("endTime")) {
      const endTime = new Date().getTime() + minutes * 60000;
      localStorage.setItem("endTime", endTime.toString());
    }

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, minutes, onTimeout]);

  const formatTime = (time: number | undefined) => {
    if (time === undefined) return "00";
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="flex justify-center items-center h-fit">
      <div className="text-center flex space-x-2 items-center">
        <FaRegClock className="mx-auto text-lg text-indigo-500" />
        {timeLeft.minutes !== undefined ? (
          <span className="text-sm font-semibold">
            {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
        ) : (
          <span className="text-xl">Time's up!</span>
        )}
      </div>
    </div>
  );
};

export default TimerComponent;
