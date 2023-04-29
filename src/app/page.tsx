"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import useSWR from "swr";

import demo from "../../public/demo.webp";

const Home = () => {
  // The right arrangement is to convert from Regex to Natural Language.
  // Otherwise, it is reversed
  const [reversed, setReversed] = useState(false);
  const [regexData, setRegexData] = useState("");
  const [naturalLanguageData, setNaturalLanguageData] = useState("");
  const [requestType, setRequestType] = useState<"to-eng" | "to-regex">(
    "to-eng"
  );

  const [fieldsEmpty, setFieldsEmpty] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState(false);

  // if (regexData !== "" || naturalLanguageData !== "") {
  //   setFieldsEmpty(true);
  // } else {
  //   setFieldsEmpty(false);
  // }

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
        requestType === "to-eng"
          ? setNaturalLanguageData(res.eng)
          : setRegexData(res.regex);
      });
  }

  console.log("Components");

  return (
    <main className="">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img
          src="/img/beams.jpg"
          alt=""
          className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          width="1308"
        />
        <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-lg">
            {/* <img src="/img/logo.svg" className="h-6" alt="Tailwind Play" /> */}
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Regexify</h2>
              <Image
                src={demo}
                alt="Profile"
                width={30}
                className="cursor-pointer rounded-full ring ring-sky-400"
              />
            </div>
            <div className="divide-y divide-gray-300/50">
              <div className="space-y-6 py-2 text-sm font-medium leading-6 text-gray-400">
                <p>
                  Combining Regex with Artificial Intelligence. Only magic can
                  happen! Convert Regex to Natural Language and back!
                </p>
                <div
                  className={`flex h-full ${
                    reversed ? "flex-col-reverse" : "flex-col"
                  } justify-between`}
                >
                  <div className="font-space">
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
                  </div>

                  <div className="font-space">
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
                  </div>
                </div>
                <p>
                  Perfect for learning how the framework works, prototyping a
                  new idea, or creating a demo to share online.
                </p>
                {/* sign up button disappears upon login */}
                <div className="flex items-center justify-between pb-3">
                  <button
                    type="button"
                    className="mr-2 flex w-[7rem] cursor-pointer items-center justify-center rounded-lg bg-sky-500 px-5 py-1.5 text-sm font-semibold text-white outline-0 transition-all duration-150 ease-in-out hover:bg-sky-600 focus:outline-0 focus:ring-0
                    focus:ring-sky-600"
                    onClick={handleFetch}
                  >
                    Magic!
                  </button>
                  <button
                    type="button"
                    className="flex items-center font-normal"
                    onClick={() => alert("Saving to database")}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="flex items-center font-normal"
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
                </div>
              </div>
              <div className="pt-8 text-sm font-medium leading-7">
                <p className="text-gray-900">Links</p>
                <p>
                  <a
                    href="https://tailwindcss.com/docs"
                    className="text-sky-500 hover:text-sky-600"
                  >
                    MindsDB X Hashnode Hackathon &rarr;
                  </a>
                </p>
                <p>
                  <a
                    href="https://tailwindcss.com/docs"
                    className="text-sky-500 hover:text-sky-600"
                  >
                    Source Code &rarr;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
