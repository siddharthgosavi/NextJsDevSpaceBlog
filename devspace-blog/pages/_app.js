import { StrictMode } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  );
}

export default MyApp;
