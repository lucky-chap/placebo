"use client";

import { atom } from "recoil";

export const magicState = atom<"sql" | "regex">({
  key: "magicState",
  default: "sql",
});
