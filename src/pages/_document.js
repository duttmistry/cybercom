import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://www.cybercom.co.in" />
        <link
          rel="icon"
          href="https://www.cybercom.co.in/wp-content/uploads/2013/04/favicon.ico"
          type="image/x-icon"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;0,6..12,1000;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800;1,6..12,900;1,6..12,1000&display=swap"
          rel="stylesheet"
        /> */}
        {/* <link
          href="/src/assets/css/fonts.css"
          rel="stylesheet"
          type="text/css"
        /> */}
        {/* <link
          href="/src/assets/css/fonts.css"
          rel="stylesheet"
          type="text/css"
        /> */}
        {/* <link href="/fonts.css" rel="stylesheet" type="text/css" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
