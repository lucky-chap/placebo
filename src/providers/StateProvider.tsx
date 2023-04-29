"use client";

import React from "react";

import { RecoilRoot } from "recoil";

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
