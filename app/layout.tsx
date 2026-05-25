import type { Metadata } from "next";
// 1. Import your new font
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

// 2. Configure the font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  // This variable allows you to use it in Tailwind
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: "Federal University of Oluku Portal",
  description: "Student and Staff Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font variable to the body */}
      <body className={`${jakarta.variable} font-sans flex h-screen overflow-hidden bg-slate-50`}>

        <SideBar />

        <div className="flex flex-col flex-1 min-w-0">
          <NavBar />
          <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}