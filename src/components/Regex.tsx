"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { magicState } from "@/state";

import demo from "../../public/demo.webp";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Regex = () => {
  const { data: session, status, update } = useSession();
  const [magicType, setMagicType] = useRecoilState(magicState);

  const [reversed, setReversed] = useState(false);
  const [regexData, setRegexData] = useState("");
  const [naturalLanguageData, setNaturalLanguageData] = useState("");
  const [requestType, setRequestType] = useState<"to-eng" | "to-regex">(
    "to-eng"
  );

  const [isFetching, setIsFetching] = useState(false);

  const handleReverseChange = () => {
    console.log("Change");
    if (reversed === true) {
      setReversed(false);
      setRequestType("to-eng");
    } else {
      setReversed(true);
      setRequestType("to-regex");
    }
  };

  async function handleFetch() {
    console.log("Fetching");
    setIsFetching(true);
    fetch(`/api/${requestType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: requestType === "to-eng" ? regexData : naturalLanguageData,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        setIsFetching(false);
        // console.log(res);
        requestType === "to-eng"
          ? setNaturalLanguageData(res.naturalLanguage)
          : setRegexData(res.regex);
      });
  }

  return (
    <main className="">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img
          src="/beams.jpg"
          alt=""
          className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          width="1308"
        />
        <div className="absolute inset-0 bg-center"></div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
        >
          <div className="mx-auto max-w-lg">
            {/* <img src="/img/logo.svg" className="h-6" alt="Tailwind Play" /> */}
            <div className="flex items-center justify-between">
              <motion.h2
                variants={item}
                className="flex items-center font-bold text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  focusable="false"
                  className="mr-1 inline-block h-4 w-4 shrink-0 select-none text-gray-900"
                >
                  <g height="fill">
                    <path d="M215.78857,118.16406a8.00125,8.00125,0,0,0-4.97949-5.6626L153.17871,90.89014l14.666-73.3291a8.00018,8.00018,0,0,0-13.69336-7.02735l-112,120a7.99995,7.99995,0,0,0,3.03955,12.94922l57.63037,21.61133-14.666,73.3291a7.99991,7.99991,0,0,0,13.69336,7.02734l112-120A8.00057,8.00057,0,0,0,215.78857,118.16406Z"></path>
                  </g>
                </svg>
                Regexify
                <button
                  type="button"
                  onClick={() => setMagicType("sql")}
                  className="ml-5 flex h-6 w-6 cursor-default items-center justify-center rounded-md shadow ring-1 ring-slate-900/10 transition-all duration-150 ease-in-out hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-[14px] w-[14px] font-bold text-sky-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="#38BDF8"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                </button>
              </motion.h2>
              <motion.div className="" variants={item}>
                <Image
                  src={
                    status === "unauthenticated"
                      ? demo
                      : (session?.user?.image as string)
                  }
                  alt="Profile"
                  width={30}
                  height={30}
                  className="cursor-default rounded-full ring ring-sky-400"
                />
              </motion.div>
            </div>
            <div className="divide-y divide-gray-300/50">
              <div className="space-y-6 py-3 text-sm font-medium leading-6 text-gray-400">
                <motion.p variants={item}>
                  Combining Regex with Artificial Intelligence. Only magic can
                  happen! Shazam! ⚡
                </motion.p>
                <div
                  className={`flex h-full ${
                    reversed ? "flex-col-reverse" : "flex-col"
                  } justify-between`}
                >
                  <motion.div className="font-space" variants={item}>
                    <div className="">
                      <div className="">
                        <textarea
                          placeholder="Regex pattern"
                          className="font-space h-full w-full"
                          disabled={reversed === true}
                          value={regexData}
                          onChange={(e) => setRegexData(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </motion.div>
                  <div className="py-3"></div>
                  <motion.div className="font-space" variants={item}>
                    <div className="">
                      <div className="">
                        <textarea
                          placeholder="Natural Language"
                          className="font-space h-full w-full"
                          disabled={reversed === false}
                          value={naturalLanguageData}
                          onChange={(e) =>
                            setNaturalLanguageData(e.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <motion.p className="" variants={item}>
                  NB:{" "}
                  <span className="italic">
                    This is a work in progress as I had only a few hours on my
                    hands to build. Do let me know of any known issues{" "}
                    <a
                      href="https://github.com/lukcy-chap/regexify/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:text-sky-600"
                    >
                      here
                    </a>
                  </span>
                </motion.p>
                {/* sign up button disappears upon login */}
                <motion.div
                  className="flex items-center justify-between py-3"
                  variants={item}
                >
                  {status === "unauthenticated" ? (
                    <button
                      type="button"
                      className="mr-2 flex w-[7rem] cursor-default items-center justify-center rounded-lg bg-sky-500 px-5 py-1.5 text-sm font-semibold text-white outline-0 transition-all duration-150 ease-in-out hover:bg-sky-600 focus:outline-0 focus:ring-0
                    focus:ring-sky-600"
                      onClick={() => signIn("github")}
                      disabled={isFetching}
                    >
                      Log in
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mr-2 flex w-[7rem] cursor-default items-center justify-center rounded-lg bg-sky-500 px-5 py-1.5 text-sm font-semibold text-white outline-0 transition-all duration-150 ease-in-out hover:bg-sky-600 focus:outline-0 focus:ring-0
                    focus:ring-sky-600"
                      onClick={handleFetch}
                      disabled={isFetching}
                    >
                      {isFetching ? "Loading..." : "Shazam!"}
                    </button>
                  )}
                  {status === "loading" ?? "Hold up..."}
                  {/* <button
                    type="button"
                    className="flex items-center font-normal"
                    onClick={() => alert("Saving to database")}
                  >
                    Save
                  </button> */}
                  <button
                    type="button"
                    className="flex cursor-default items-center font-normal"
                    onClick={handleReverseChange}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="mr-[2px] h-[14px] w-[14px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                      />
                    </svg>
                    Change order
                  </button>
                </motion.div>
              </div>
              <div className="pt-8 text-sm font-medium leading-7">
                <motion.p variants={item} className="text-gray-900">
                  Links
                </motion.p>
                <motion.p variants={item}>
                  <a
                    href="https://hashnode.com/hackathons/mindsdb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-600"
                  >
                    MindsDB X Hashnode Hackathon &rarr;
                  </a>
                </motion.p>
                <motion.p variants={item}>
                  <a
                    href="https://github.com/lucky-chap/regexify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-600"
                  >
                    Source Code &rarr;
                  </a>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Regex;
