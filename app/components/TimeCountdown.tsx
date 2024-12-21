"use client";
import React, { useState, useEffect } from "react";

const TimeCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set the target date for the countdown
  const targetDate = new Date("2024-12-31T23:59:59");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If the target date has passed, set everything to zero
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update the countdown every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-[11.5px] text-gray-400">
      <span className="bg-[#F55266] w-[40px] h-[40px] rounded-[6px] py-[10px] text-center px-[2px] text-white">
        {timeLeft.days}d
      </span>
      :
      <span className="bg-[#F55266] w-[40px] h-[40px] rounded-[6px] py-[10px] px-[2px] text-center text-white">
        {timeLeft.hours}h
      </span>
      :
      <span className="bg-[#F55266] w-[40px] h-[40px] rounded-[6px] py-[10px] text-center px-[2px] text-white">
        {timeLeft.minutes}m
      </span>
      :
      <span className="bg-[#F55266] w-[40px] h-[40px] rounded-[6px] py-[10px] text-center px-[2px] text-white">
        {timeLeft.seconds}s
      </span>
    </div>
  );
};

export default TimeCountdown;
