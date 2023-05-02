import { RenderOptions, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "mutationobserver-shim";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { RecoilRoot } from "recoil";

const CustomWrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>{children} </RecoilRoot>
);

// Custom render function allowing Chakra UI to be used
const customRender = (ui: any, options?: RenderOptions) =>
  render(ui, {
    wrapper: CustomWrapper,
    ...options,
  });

// custom function to mock next-auth's session
// I call it in every test page that needs session
export function withSession() {
  const mockSession: Session = {
    expires: "1",
    user: { email: "a", name: "Delta", image: "c" },
  };
  return (useSession as jest.Mock).mockReturnValue([mockSession, false]);
}

export * from "@testing-library/react";
export { customRender as render };
