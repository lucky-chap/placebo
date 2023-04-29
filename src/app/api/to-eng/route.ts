// @ts-nocheck

import { NextResponse } from "next/server";

import MindsDB from "mindsdb-js-sdk";

const mindsDBUserData = {
    user: process.env.MINDSDB_USER,
    password: process.env.MINDSDB_PASSWORD,
};

const createConnection = async (user) => {
    await MindsDB.connect(user);
};

const naturalLanguageGenerator = async (data: string) => {
    const model = await MindsDB.Models.getModel(
        "regex_to_eng",
        "mindsdb"
    );

    const queryOptions = {
        where: [`data = "${data}"`],
    };

    const response = model.query(queryOptions);
    return response;
};

export async function POST(request: Request, res: Response) {
    let naturalLanguage;
    let error;

    await createConnection(mindsDBUserData);

    const userInput = await request.json();

    try {
        let received = await naturalLanguageGenerator(userInput.text);
        // console.log(received);

        naturalLanguage = received.value;
    } catch (e) {
        console.log(e);
        error = e
    }

    return NextResponse.json({ naturalLanguage, error });
}
