"use client";

import { useEffect, useState } from "react";

export default function TopBar() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();

    const day = today
      .toLocaleDateString("en-US", {
        weekday: "short",
      })
      .toUpperCase();

    const month = today
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase();

    const year = today.getFullYear();

    const dayNumber = today.getDate();

    function getOrdinal(number: number) {
      if (number >= 11 && number <= 13) {
        return "TH";
      }

      switch (number % 10) {
        case 1:
          return "ST";
          case 2:
          return "ND";
        case 3:
          return "RD";
        default:
          return "TH";
      }
    }

    setDate(
      `${day}. ${month} ${dayNumber}${getOrdinal(dayNumber)}, ${year}`
    );
  }, []);

  return (
    <div className="bg-[#0B1235] h-[70px] flex items-center">
      <div className="w-full px-6">

        <div className="inline-flex items-center gap-2 bg-[#078B8D] text-white px-4 py-2 rounded-full font-bold text-sm">

          {/* Calendar Icon */}
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="17"
  height="17"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <rect x="3" y="4" width="18" height="17" rx="2" />
  <line x1="16" y1="2" x2="16" y2="6" />
  <line x1="8" y1="2" x2="8" y2="6" />
  <line x1="3" y1="10" x2="21" y2="10" />
</svg>
          {/* Automatic Date */}
          <span>{date}</span>

        </div>

      </div>
    </div>
  );
}