import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const { session, ...restPageProps } = pageProps;

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...restPageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
