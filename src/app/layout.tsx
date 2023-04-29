import "./globals.css";
import StateProvider from "@/providers/StateProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Space_Grotesk as SpaceGrotesk } from "next/font/google";

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  preload: true,
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Merlin - Magical Tools For Everyone",
  description: "A bit of magic here and there, ya know!",
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
        <AuthProvider>
          <StateProvider>
            <main className="min-h-screen">{children}</main>
          </StateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
