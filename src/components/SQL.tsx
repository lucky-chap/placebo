"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
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

const SQLSorcery = () => {
  const { data: session, status, update } = useSession();

  const [magicType, setMagicType] = useRecoilState(magicState);

  const [reversed, setReversed] = useState(false);
  const [sqlData, setSqlData] = useState("");
  const [naturalLanguageData, setNaturalLanguageData] = useState("");
  const [requestType, setRequestType] = useState<"to-lng" | "to-sql">("to-lng");

  const [isFetching, setIsFetching] = useState(false);

  const handleReverseChange = () => {
    if (reversed === true) {
      setReversed(false);
      setRequestType("to-lng");
    } else {
      setReversed(true);
      setRequestType("to-sql");
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
        text: requestType === "to-lng" ? sqlData : naturalLanguageData,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        setIsFetching(false);
        // console.log(res);
        requestType === "to-lng"
          ? setNaturalLanguageData(res.humanLanguage)
          : setSqlData(res.sql);
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
                  version="1.0"
                  viewBox="0 0 256.000000 256.000000"
                  className="-mt-2 mr-1 inline-block h-6 w-6 shrink-0 select-none text-gray-900"
                >
                  <g
                    transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path d="M1379 2215 c0 -3 0 -39 0 -80 0 -41 0 -82 0 -90 1 -12 18 -15 91 -15 l91 0 -3 93 -3 92 -87 3 c-49 1 -88 0 -89 -3z" />
                    <path d="M2036 2213 c-3 -4 -6 -46 -6 -95 l0 -88 94 0 94 0 -1 93 -2 92 -86 2 c-48 1 -90 -1 -93 -4z" />
                    <path d="M1550 1914 c-38 -14 -130 -101 -598 -568 -420 -419 -558 -563 -577 -600 -51 -102 -26 -245 56 -323 79 -74 207 -97 306 -53 67 29 1131 1089 1168 1164 20 39 25 65 25 120 -1 109 -46 189 -137 243 -58 34 -173 42 -243 17z m171 -193 c46 -47 41 -90 -20 -154 l-49 -51 -36 32 c-20 17 -50 48 -68 67 l-31 36 39 41 c65 67 117 76 165 29z" />
                    <path d="M2030 1470 l0 -90 94 0 94 0 0 73 c1 111 5 107 -99 107 l-89 0 0 -90z" />
                  </g>
                </svg>
                SQL Sorcery
                <button
                  type="button"
                  onClick={() => setMagicType("regex")}
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
                {/* status was checked like this because of jest tests */}
                {(status === "unauthenticated" || status === "loading") && (
                  <Image
                    src={demo}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="cursor-default rounded-full ring ring-sky-400"
                    onClick={() => signIn("github")}
                  />
                )}
                {status === "authenticated" && (
                  <Image
                    src={session?.user!.image as string}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="cursor-default rounded-full ring ring-sky-400"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  />
                )}
              </motion.div>
            </div>
            <div className="divide-y divide-gray-300/50">
              <div className="space-y-6 py-3 text-sm font-medium leading-6 text-gray-400">
                <motion.p variants={item}>
                  Combining SQL with Artificial Intelligence. Only magic can
                  happen! Alakazam! 🪄
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
                          placeholder="SQL Query"
                          className="font-space h-full w-full"
                          disabled={reversed === true}
                          value={sqlData}
                          onChange={(e) => setSqlData(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </motion.div>
                  <div className="py-3"></div>
                  <motion.div className="font-space relative" variants={item}>
                    <div className="absolute -top-2 right-0 z-20 w-1/2">
                      {/* <Dropdown /> */}
                    </div>
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
                      href="https://github.com/lucky-chap/placebo/issues"
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
                      {isFetching ? "Loading..." : "Alakazam!"}
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
                    href="https://github.com/lucky-chap/placebo"
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

export default SQLSorcery;
