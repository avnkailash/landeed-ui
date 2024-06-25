// import React, { useState, useEffect } from "react";
// import { FaRegClock } from "react-icons/fa";

// const TimerComponent = ({ minutes }) => {
//   const calculateTimeLeft = () => {
//     const endTime = localStorage.getItem("endTime");
//     const currentTime = new Date().getTime();
//     const difference = endTime - currentTime;
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         minutes: Math.floor((difference / (1000 * 60)) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     if (!localStorage.getItem("endTime")) {
//       const endTime = new Date().getTime() + minutes * 60000;
//       localStorage.setItem("endTime", endTime);
//     }

//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [timeLeft, minutes]);

//   const timerComponents = [];

//   Object.keys(timeLeft).forEach((interval) => {
//     if (!timeLeft[interval]) {
//       return;
//     }

//     timerComponents.push(
//       <span className="text-sm font-semibold" key={interval}>
//         {timeLeft[interval]} {interval}{" "}
//       </span>
//     );
//   });

//   return (
//     <div className="flex justify-center items-center h-fit bg-gray-100">
//       <div className="text-center flex space-x-4">
//         <FaRegClock className="mx-auto text-xl text-indigo-500" />
//         <>
//           {timerComponents.length ? (
//             timerComponents
//           ) : (
//             <span className="text-xl">Time's up!</span>
//           )}
//         </>
//       </div>
//     </div>
//   );
// };

// export default TimerComponent;

import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";

const TimerComponent = ({ minutes, onTimeout }) => {
  const calculateTimeLeft = () => {
    const endTime = localStorage.getItem("endTime");
    const currentTime = new Date().getTime();
    const difference = endTime - currentTime;
    let timeLeft = {};

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
      localStorage.setItem("endTime", endTime);
    }

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, minutes, onTimeout]);

  const formatTime = (time) => {
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
