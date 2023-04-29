import Image from "next/image";

import demo from "../../public/demo.webp";
import Button from "@/components/Button";

export default function Home() {
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
              <Image src={demo} alt="Profile" width={30} />
            </div>
            <div className="divide-y divide-gray-300/50">
              <div className="space-y-6 py-2 text-sm font-medium leading-6 text-gray-400">
                <p>
                  Combining Regex with Artificial Intelligence. Only magic can
                  happen! Convert Regex to Natural Language and back!
                </p>
                <div className="font-space">
                  <div className="">
                    <div className="field">
                      <textarea
                        placeholder="Regex pattern"
                        className="font-space h-full w-full rounded"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="font-space">
                  <div className="">
                    <div className="field">
                      <textarea
                        placeholder="Regex pattern"
                        className="font-space h-full w-full rounded"
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/* <p>
                  Perfect for learning how the framework works, prototyping a
                  new idea, or creating a demo to share online.
                </p> */}
                <Button>Sign up</Button>
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
}
