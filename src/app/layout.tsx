import "./globals.css";

export const metadata = {
  title: 'Mortgage Calculator',
  description: 'A simple mortgage calculator application',
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
