import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "../../context/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  weight: "500",
});

const metadata: Metadata = {
  title: "UITEstate",
  description: "Real Estate By UIT",
  openGraph: {
    images: [
      "https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp",
    ],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logoEstate.png" />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </head>
      <body
        className={`${montserrat.variable} ${montserrat.style.fontWeight}`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <QueryProvider>
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
};
export { metadata };
export default RootLayout;
