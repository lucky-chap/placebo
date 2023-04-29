import Link from "next/link";
import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="">
        <button
          type="button"
          className="mr-2 w-[7rem] rounded-lg bg-sky-500 px-5 py-1.5 text-sm font-semibold text-white outline-0 transition-all duration-150 ease-in-out hover:bg-sky-600 focus:outline-0 focus:ring-0 focus:ring-sky-600"
        >
          {children}
        </button>
      </div>
    </div>
  );
}
