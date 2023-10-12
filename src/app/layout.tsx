import { ReduxProvider } from "@/redux/Provider";
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
  title: "Real estate",
  description: "Real Estate By UIT",
  openGraph: {
    images: [
      'https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp"',
    ],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logoEstate.png" />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </head>
      <body
        className={`${montserrat.variable} ${montserrat.style.fontWeight} font-mont`}
      >
        <QueryProvider>
          <AuthProvider>
            <ReduxProvider>
              <Toaster />
              {children}
            </ReduxProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
};
export { metadata };
export default RootLayout;
