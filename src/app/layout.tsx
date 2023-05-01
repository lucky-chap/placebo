import "./globals.css";
import StateProvider from "@/providers/StateProvider";
import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { Space_Grotesk as SpaceGrotesk } from "next/font/google";

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  preload: true,
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Placebo - Magical Tools For Everyone",
  description: "A bit of magic here and there, ya know!",
  generator: "Next.js",
  applicationName: "Placebo",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript", "MindsDB", "Hashnode"],
  authors: [{ name: "Virgil", url: "https://heylel.vercel.app" }],
  colorScheme: "light",
  creator: "Virgil",
  publisher: "Virgil",
  alternates: {},
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/app.png",
    shortcut: "/app.png",
    apple: "/app.png",
    other: {
      rel: "app.png",
      url: "/app.png",
    },
  },
  openGraph: {
    title: "Placebo",
    description: "Magical Tools For Everyone",
    url: "https://placebo.vercel.app",
    siteName: "placebo",
    images: [
      {
        url: "https://placebo.vercel.app/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://placebo.vercel.app/og.png",
        width: 1800,
        height: 1600,
        alt: "Magical Tools For Everyone",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
  },
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
            <ThemeProvider>
              <main className="min-h-screen">{children}</main>
            </ThemeProvider>
          </StateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
