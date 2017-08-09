import React from 'react';
import Link from 'gatsby-link';

export const BlogPostRoute = ({data: {markdownRemark: post}}) => (
  <div>
    <header>
      <h1>{post.frontmatter.title}</h1>
    </header>

    <div dangerouslySetInnerHTML={{__html: post.html}}/>
  </div>
);

export default BlogPostRoute;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`;
