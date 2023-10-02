import { ReduxProvider } from '@/redux/Provider';
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '../../context/AuthProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
  weight: '500',
});

const metadata: Metadata = {
  title: 'Real estate',
  description: 'Real Estate By UIT',
  openGraph: {
    images: [
      'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/16b3442b-cfbb-4be0-8541-682a26631f15/nike-just-do-it.png',
      'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/b3e44fd7-df8f-449a-a2c7-48bb948518ab/men-s-shoes-clothing-accessories.png',
      'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/481ae448-c295-48cb-b593-fbb80821d102/jordan.png',
    ],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logoEstate.png" />
      </head>
      <body
        className={`${montserrat.variable} ${montserrat.style.fontWeight} font-mont`}
      >
        <AuthProvider>
          <ReduxProvider>
            <Toaster />
            {children}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
};
export { metadata };
export default RootLayout;
