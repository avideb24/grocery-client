import { Inter } from "next/font/google";
import "./globals.css";
import MiddleComp from "@/components/layout/MiddleComp/MiddleComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Grocery',
  description: 'Grocery online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-xs md:text-sm 2xl:text-lg bg-primary-bg text-primary-text dark:bg-secondary-bg dark:text-secondary-text`}>
        <MiddleComp>{children}</MiddleComp>
      </body>
    </html>
  );
}
