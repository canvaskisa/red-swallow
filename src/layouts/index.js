import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import './index.css'

export const Container = styled.main`
  max-width: 1020px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Navigation = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavigationItem = styled.li`
  margin-left: 32px;
  list-style: none;
`;

export const NavigationLink = styled(Link)`
  opacity: 0.6;
  color: #212121;
  font-size: 12px;
  letter-spacing: 0.6px;
  text-decoration: none;
  text-transform: lowercase;
  font-family: 'PT Sans', sans-serif;
  transition: opacity 0.3s ease 0s;
  will-change: opacity;

  &:hover {
    opacity: 1;
  }
`;

export const LogoContainer = styled.figure`
  display: flex;
`;

export const links = [{
  url: '/about',
  title: 'О проекте'
}, {
  url: '/partners',
  title: 'Партнёры'
}, {
  url: '/contacts',
  title: 'Контакты'
}];

export const Layout = ({children}) => (
  <Container>
    <Helmet
      title="Красная Ласточка"
      meta={[
        {name: 'description', content: 'Красная Ласточка'},
        {name: 'keywords', content: 'red, swallow'}
      ]}
      />

    <Header>
      <LogoContainer/>

      <Navigation>
        {links.map(({url, title}) => (
          <NavigationItem key={url}>
            <NavigationLink to={url}>{title}</NavigationLink>
          </NavigationItem>
        ))}
      </Navigation>
    </Header>

    <section>
      {children()}
    </section>
  </Container>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;
