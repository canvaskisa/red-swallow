import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

export const Container = styled.section`display: flex;`;

export const Column = styled.aside`flex: 1 1 100%;`;

export const ColumnHeader = styled.h2`
  height: 14px;
  line-height: 16px;
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 400;
  padding-left: 16px;
  margin-bottom: 28px;
  letter-spacing: 0.6px;
  border-left: 1px solid #212121;
  font-family: 'PT Sans', sans-serif;
`;

export const List = styled.section``;

export const Book = styled.article`
  padding: 0 0 16px;

  &:not(:last-child) {
    border-bottom: 1px solid #dedede;
    margin: 0 0 20px;
  }
`;

export const BookImageContainer = styled.figure`
  width: 100px;
  height: 140px;
  flex: 0 0 100px;
  margin: 0 18px 0 0;
  background-color: #ccc;
`;

export const BookImage = styled.img``;

export const BookContainer = styled.section`display: flex`;

export const BookTextContainer = styled.section`flex: 1 1 100%;`;

export const BookTitle = styled.h2`
  color: #212121;
  font-size: 11px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export const BookDescription = styled.p`
  font-size: 11px;
  line-height: 16px;
  font-family: 'PT Sans', sans-serif;
  text-transform: lowercase;
  margin: 0;
  color: #212121;
  opacity: 0.8;
`;

export const BookName = styled.h3`
  color: #212121;
  font-size: 15px;
  line-height: 19px;
  margin: 12px 0 0;
`;

export const BookLink = styled(Link)`text-decoration: none;`;

export const IndexPage = ({data: {allMarkdownRemark: {edges: posts}}}) => (
  <Container>
    <Column>
      <ColumnHeader>Издательство</ColumnHeader>
      <List>
        {console.log(posts)}
        {posts.filter(post => post.node.fields.type === 'publishing-house').map(post => (
          <Book key={post.node.fields.slug}>
            <BookLink to={post.node.fields.slug}>
              <BookContainer>
                <BookImageContainer>
                  <BookImage/>
                </BookImageContainer>

                <BookTextContainer>
                  <BookTitle>{post.node.frontmatter.title}</BookTitle>
                  <BookDescription>{post.node.frontmatter.description}</BookDescription>
                </BookTextContainer>
              </BookContainer>

              <BookName>{post.node.frontmatter.name}</BookName>
            </BookLink>
          </Book>
        ))}
      </List>
    </Column>

    <Column/>

    <Column>
      <ColumnHeader>Лаборатория</ColumnHeader>
    </Column>
  </Container>
);

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 2000) {
      edges {
        node {
          fields {
            type
            slug
          }
          frontmatter {
            title
            name
            description
          }
        }
      }
    }
  }
`;
