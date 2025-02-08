import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var pathSegments = window.location.pathname.split('/');
                  var basePath = pathSegments.length > 1 ? '/' + pathSegments[1] : '';
                  window.__NEXT_DATA__ = window.__NEXT_DATA__ || {};
                  window.__NEXT_DATA__.assetPrefix = basePath;
                })();
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

