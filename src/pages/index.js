import React, { useEffect } from "react";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import MoreStories from "../components/more-stories";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";
import * as qs from "query-string"
import {Provider, TitleBar} from '@shopify/app-bridge-react';


export default function Index({ data: { allPosts, site, blog }, location }) {
  const heroPost = allPosts.nodes[0];
  const morePosts = allPosts.nodes.slice(1);
  const query = qs.parse(location.search);
  const scopes = "read_products"
  const redirect_uri = "https://datocmsgatsbyblogdemo570092236.gatsbyjs.io/api/callback"
  const apiKey = "d955339d700eaf37bad64ce860512823"

  const URL = `https://${query.shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirect_uri}&state=1`

  console.log(URL)
  console.log(query)
  console.log(window)
  
  useEffect(() => {
    if (query.hmac) {
      if (typeof window !== "undefined") {
        window.location.assign(URL)
      }
    }
  })

  const config = {apiKey: apiKey, shopOrigin: query.shop};

  return (
    <Provider config={config} >
      <TitleBar title="cloud test"/>
      <Container>
        <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Provider>
  );
}

export const query = graphql`
  {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    blog: datoCmsBlog {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    allPosts: allDatoCmsPost(sort: { fields: date, order: DESC }, limit: 20) {
      nodes {
        title
        slug
        excerpt
        date
        coverImage {
          large: fluid(imgixParams: { fm: "jpg" }, sizes: "(max-width: 1500px) 100vw, 1500px") {
            ...GatsbyDatoCmsFluid
          }
          small: fluid(imgixParams: { fm: "jpg" }, sizes: "(max-width: 760px) 100vw, (max-width: 1500px) 50vw, 700px") {
            ...GatsbyDatoCmsFluid
          }
        }
        author {
          name
          picture {
            fixed(
              width: 48
              height: 48
              imgixParams: { fm: "jpg", fit: "crop", sat: -100 }
            ) {
              ...GatsbyDatoCmsFixed
            }
          }
        }
      }
    }
  }
`;
