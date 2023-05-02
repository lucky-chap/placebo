import React from "react";
import { render, screen, withSession } from "./utils";
import SQLSorcery from "../src/components/SQL";

jest.mock("next-auth/react");

describe("SQL Sorcery", () => {
  it("renders the SQL heading and description", () => {
    withSession();

    render(<SQLSorcery />);

    const heading = screen.getByText(/SQL Sorcery/i);
    const description = screen.getByText(
      /Combining SQL with Artificial Intelligence. Only magic can happen! Alakazam! 🪄/i
    );

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
