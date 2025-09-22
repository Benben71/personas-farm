import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Plus_Jakarta_Sans, Noto_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-plus-jakarta'
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${plusJakarta.variable} ${notoSans.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
