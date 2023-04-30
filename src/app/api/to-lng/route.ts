// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";

import MindsDB from "mindsdb-js-sdk";

import { env } from "@/env.mjs";

const connectData = {
  user: env.MINDSDB_USER,
  password: env.MINDSDB_PASSWORD,
};

const mindsDBConnector = async (user) => {
  await MindsDB.connect(user);
};

const convertToHumanLanguage = async (text: string, language: string) => {
  const model = await MindsDB.Models.getModel(
    "converter_human",
    "mindsdb"
  );

  const queryOptions = {
    // where: [`text = "${text}"`, `language = "${language}"`],
    where: [`text = "${text}"`],
  };

  const response = model.query(queryOptions);
  return response;
};

export async function POST(request: Request, res: Response) {
  let humanLanguage;
  let error;

  await mindsDBConnector(connectData);

  const data = await request.json();

  try {
    // let convertedHumanLanguage = await convertToHumanLanguage(data.text, data.lng);
    let convertedHumanLanguage = await convertToHumanLanguage(data.text);

    humanLanguage = convertedHumanLanguage["data"]["response"];
  } catch (e) {

    error = e
  }

  return NextResponse.json({ humanLanguage, error });
}

