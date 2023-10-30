// E:\programming\Project\transvidtexter\pages\_app.tsx

import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/globals.css';
import { AppProps } from 'next/app';  // 追加

function MyApp({ Component, pageProps }: AppProps) {  // 型を追加
  return <Component {...pageProps} />;
}

export default MyApp;
