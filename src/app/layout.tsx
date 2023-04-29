import "./globals.css";
import StateProvider from "@/providers/StateProvider";
import { Space_Grotesk as SpaceGrotesk } from "next/font/google";

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  preload: true,
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Regexify",
  description: "Combining AI with Regex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} relative flex-col text-gray-800`}
      >
        <StateProvider>
          <main className="min-h-screen">{children}</main>
        </StateProvider>
      </body>
    </html>
  );
}
