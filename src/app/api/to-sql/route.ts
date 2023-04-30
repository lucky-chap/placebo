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

const convertToSQLCode = async (text: string) => {
  const model = await MindsDB.Models.getModel(
    "converter_sql",
    "mindsdb"
  );

  const queryOptions = {
    where: [`text = "${text}"`],
  };

  const response = model.query(queryOptions);
  return response;
};

export async function POST(request: Request, res: Response) {
  let sql;
  let error;

  await mindsDBConnector(connectData);

  const data = await request.json();

  try {
    let generatedSQLCode = await convertToSQLCode(data.text);

    sql = generatedSQLCode["data"]["response"];
  } catch (e) {
    error = e
  }

  return NextResponse.json({ sql, error });
}

