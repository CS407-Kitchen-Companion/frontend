import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    )
  }
}
