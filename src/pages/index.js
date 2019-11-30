import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import { Container, Row } from 'reactstrap';
import '../styles/slider.css';
import 'react-alice-carousel/lib/alice-carousel.css';

import Loadable from 'react-loadable';

// We load the slider at run time, in order to make our builds work
const LoadableSlider = Loadable({
  loader: () => import('../components/slider'),
  loading() {
    return <div></div>;
  },
  render(loaded, props) {
    let Component = loaded.default;
    return <Component albums={props} />;
  },
});

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Container>
          <Row>
            <LoadableSlider {...this.props.data.allAlbumsJson.edges} />
          </Row>
        </Container>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    allAlbumsJson(filter: { parentAlbum: { eq: "home" } }) {
      edges {
        node {
          title
          type
          parentAlbum
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 2000) {
                src
                aspectRatio
              }
            }
          }
        }
      }
    }
  }
`;
