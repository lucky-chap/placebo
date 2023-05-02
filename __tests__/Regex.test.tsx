import React from "react";
import { render, screen, withSession } from "./utils";
import Regex from "../src/components/Regex";

jest.mock("next-auth/react");

describe("Regexify", () => {
  it("renders the Regex heading and description", () => {
    withSession();

    render(<Regex />);

    const heading = screen.getByText(/Regexify/i);
    const description = screen.getByText(
      /Combining Regex with Artificial Intelligence. Only magic can happen! Shazam! ⚡/i
    );

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
