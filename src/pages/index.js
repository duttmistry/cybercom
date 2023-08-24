import React from 'react';
import Head from 'next/head'
import { ApolloProvider } from "@apollo/react-hooks";
import client from 'ApolloClient/client'
import Layout from '@/components/App/Layout'
import Navbar from '@/components/App/Navbar'
import Banner from '@/components/index/Banner'
import OurSolutions from '@/components/index/OurSolutions'
import OurFeatures from '@/components/index/OurFeatures'
import Pricing from '@/components/index/Pricing'
import Testimonials from '@/components/index/Testimonials'
import Partner from '@/components/index/Partner'
import Footer from '@/components/App/Footer'
import ProjectStartArea from '@/components/index/ProjectStartArea'
function Home(props) {
  console.log(props?.seo,"footer data")
  const metaDetails = props.seo.seoDetails.find((details)=>details.pageName==='home')
  console.log(metaDetails,"current meta details")
  return (
    <>
      <Head>
        <title>Home - Cybercom Creation</title>
        <meta name="title" content={metaDetails.metaTitle} />
        <meta name="description" content={metaDetails.metaDescription} />
        <meta name="keywords" content={metaDetails.metaKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://www.cybercom.co.in/wp-content/uploads/2013/04/favicon.ico"
          type="image/x-icon"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap"
          rel="stylesheet"
        />

        {/* <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;0,6..12,1000;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800;1,6..12,900;1,6..12,1000&display=swap"
          rel="stylesheet"
        /> */}
      </Head>

      <ApolloProvider client={client}>
        <Layout pageName="home">
          <Navbar />
          <Banner data={props.banner} />
          <OurSolutions
            data={props.solution}
            serviceSolutions={props.serviceSolutions}
          />
          {/* <OurServices
          servicesOne={props.servicesOne}
          servicesTwo={props.servicesTwo}
      /> */}
          <OurFeatures data={props.features} />
          {/* <RecentProjects
          recentProjects={props.recentProjects}
          projects={props.projects}
        /> */}
          <Pricing />
          <Testimonials Testimonials={props.Testimonials} />
          <Partner Partner={props.Partner} />
          {/* <OurBlog OurBlog={props.OurBlog} /> */}
          <ProjectStartArea ProjectStartArea={props.ProjectStartArea} />
          <Footer footer={props.footer} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
export default Home;
export async function getServerSideProps() {
  console.log(process.env.NEXT_PUBLIC_GRAPHQL_API_URL,"env variable")
  try{
    const seo=  await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}seo`);
    const footer = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}address`);
    const banner = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}default-banner`);
    const solution = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}solution`);
    const serviceSolutions = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}service-solutions`
    );
    const servicesOne = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}services-one`
    );
    const servicesTwo = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}services-two`
    );
    const features = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}our-features`);
    const RecentProjects = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}recent-projects`
    );
    const Testimonials = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}testimonials`
    );
    const Partner = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}partner`);
    const OurBlog = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}blogs`);
    const ProjectStartArea = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}start-your-project`
    );
    return{
      props:{
        seo: await seo.json(),
        footer: await footer.json(),
        banner: await banner.json(),
        solution: await solution.json(),
        serviceSolutions: await serviceSolutions.json(),
        servicesOne: await servicesOne.json(),
        servicesTwo: await servicesTwo.json(),
        features: await features.json(),
        recentProjects: await RecentProjects.json(),
        Testimonials: await Testimonials.json(),
        Partner: await Partner.json(),
        OurBlog: await OurBlog.json(),
        ProjectStartArea: await ProjectStartArea.json(),
      }
    }
  }catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}

