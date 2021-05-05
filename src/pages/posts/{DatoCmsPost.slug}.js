import React from "react";
import { graphql } from "gatsby";
import Container from "../../components/container";
import Header from "../../components/header";
import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import { HelmetDatoCms } from "gatsby-source-datocms";

// export const datoCmsAssetResolutions = graphql`
//   fragment GatsbyDatoCmsResolutions on DatoCmsFixed {
//     base64
//     width
//     height
//     src
//     srcSet
//   }
// `

// export const datoCmsAssetResolutionsTracedSVG = graphql`
//   fragment GatsbyDatoCmsResolutions_tracedSVG on DatoCmsFixed {
//     tracedSVG
//     width
//     height
//     src
//     srcSet
//   }
// `

// export const datoCmsAssetResolutionsNoBase64 = graphql`
//   fragment GatsbyDatoCmsResolutions_noBase64 on DatoCmsFixed {
//     width
//     height
//     src
//     srcSet
//   }
// `

// export const datoCmsAssetSizes = graphql`
//   fragment GatsbyDatoCmsSizes on DatoCmsFluid {
//     base64
//     aspectRatio
//     src
//     srcSet
//     sizes
//   }
// `

// export const datoCmsAssetSizesTracedSVG = graphql`
//   fragment GatsbyDatoCmsSizes_tracedSVG on DatoCmsFluid {
//     tracedSVG
//     aspectRatio
//     src
//     srcSet
//     sizes
//   }
// `

// export const datoCmsAssetSizesNoBase64 = graphql`
//   fragment GatsbyDatoCmsSizes_noBase64 on DatoCmsFluid {
//     aspectRatio
//     src
//     srcSet
//     sizes
//   }
// `

// export const datoCmsAssetFixed = graphql`
//   fragment GatsbyDatoCmsFixed on DatoCmsFixed {
//     base64
//     width
//     height
//     aspectRatio
//     src
//     srcSet
//   }
// `

// export const datoCmsAssetFixedTracedSVG = graphql`
//   fragment GatsbyDatoCmsFixed_tracedSVG on DatoCmsFixed {
//     tracedSVG
//     width
//     height
//     aspectRatio
//     src
//     srcSet
//   }
// `

// export const datoCmsAssetFixedNoBase64 = graphql`
//   fragment GatsbyDatoCmsFixed_noBase64 on DatoCmsFixed {
//     width
//     height
//     src
//     srcSet
//     aspectRatio
//   }
// `

// export const datoCmsAssetFluid = graphql`
//   fragment GatsbyDatoCmsFluid on DatoCmsFluid {
//     base64
//     aspectRatio
//     src
//     srcSet
//     sizes
//   }
// `

// export const datoCmsAssetFluidTracedSVG = graphql`
//   fragment GatsbyDatoCmsFluid_tracedSVG on DatoCmsFluid {
//     tracedSVG
//     aspectRatio
//     src
//     srcSet
//     sizes
//   }
// `

// export const datoCmsAssetFluidNoBase64 = graphql`
//   fragment GatsbyDatoCmsFluid_noBase64 on DatoCmsFluid {
//     aspectRatio
//     src
//     srcSet
//     sizes
//   }
// `
// export const datoCmsSeoMetaTags = graphql`
//   fragment GatsbyDatoCmsSeoMetaTags on DatoCmsSeoMetaTags {
//     tags
//   }
// `
// export const datoCmsFaviconMetaTags = graphql`
//   fragment GatsbyDatoCmsFaviconMetaTags on DatoCmsFaviconMetaTags {
//     tags
//   }
// `


export default function Post({ data: { site, post, morePosts } }) {
  return (
    <Container>
      <HelmetDatoCms seo={post.seo} favicon={site.favicon} />
      <Header />
      <article>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
      </article>
      <SectionSeparator />
      {morePosts.nodes.length > 0 && <MoreStories posts={morePosts.nodes} />}
    </Container>
  );
}

export const query = graphql`
  query PostBySlug($id: String) {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    post: datoCmsPost(id: { eq: $id }) {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      content {
        value
        blocks {
          __typename
          ... on DatoCmsImageBlock {
            id: originalId
            image {
              fluid(
                imgixParams: { fm: "jpg" }
                sizes: "(max-width: 700) 100vw, 700px"
              ) {
                ...GatsbyDatoCmsFluid
              }
            }
          }
        }
      }
      date
      coverImage {
        fluid(
          imgixParams: { fm: "jpg" }
          sizes: "(max-width: 1500px) 100vw, 1500px"
        ) {
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
    morePosts: allDatoCmsPost(
      sort: { fields: date, order: DESC }
      limit: 2
      filter: { id: { ne: $id } }
    ) {
      nodes {
        title
        slug
        excerpt
        date
        coverImage {
          small: fluid(
            imgixParams: { fm: "jpg" }
            sizes: "(max-width: 760px) 100vw, (max-width: 1500px) 50vw, 700px"
          ) {
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
