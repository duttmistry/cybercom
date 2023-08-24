
// import '../assets/css/style.css'
// import '../assets/css/responsive.css'
// import '../assets/css/flaticon.css'
// import '../assets/css/responsive.scss'
import React from "react"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader/Loader"
import { Router } from "next/router"
import "../assets/css/bootstrap.min.css"
import "../assets/css/animate.min.css"
import "../assets/css/boxicons.min.css"
import "../assets/css/flaticon.css"
import '../../node_modules/react-modal-video/css/modal-video.min.css'
import 'react-accessible-accordion/dist/fancy-example.css'
import 'react-image-lightbox/style.css'
import "../assets/css/style.css"
import "../assets/css/responsive.css"
import "../assets/css/fonts.css"
export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);
    Router.events.on('routeChangeError', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
      Router.events.off('routeChangeError', stopLoading);
    };
  }, []);

  return <>{isLoading && <Loader />}<Component {...pageProps} /></>
}
