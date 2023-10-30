// E:\programming\Project\transvidtexter\pages\api\_document.tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Bootstrap CSS CDN */}
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Optional: Bootstrap JS CDN if you need Bootstrap's JavaScript features */}
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
