"use client";

import { useRecoilState } from "recoil";

import SQLSorcery from "@/components/SQL";
import Regex from "@/components/Regex";

import { magicState } from "@/state";

const Home = () => {
  const [magicType, setMagicType] = useRecoilState(magicState);

  return (
    <main className="">{magicType === "sql" ? <SQLSorcery /> : <Regex />}</main>
  );
};

export default Home;
