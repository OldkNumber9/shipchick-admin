import "@/styles/globals.css";// _app.tsx
import type { AppProps } from 'next/app';
import { Work_Sans, Kanit } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner"
// import '../styles/globals.css'; 

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
});

const kanit = Kanit({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-kanit',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${workSans.className} ${kanit.className}  `}> 
        <Toaster position="top-center" richColors />
        <Component {...pageProps} /> 
    </div>
  );
}