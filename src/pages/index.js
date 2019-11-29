import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import { Container, Row, Col } from 'reactstrap';
// import {
//   CarouselProvider,
//   Slider,
//   Slide,
//   ButtonBack,
//   ButtonNext,
//   Image,
//   Dot,
// } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import '../styles/home.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Img from 'gatsby-image';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      galleryItems: this.galleryItems(),
    };

    this.navButton = this.navButton.bind(this);
  }

  slideTo = i => this.setState({ currentIndex: i });

  onSlideChanged = e => this.setState({ currentIndex: e.item });

  slideNext = () =>
    this.setState({
      currentIndex:
        (this.state.currentIndex + 1) % (this.state.galleryItems.length + 1),
    });

  slidePrev = () =>
    this.setState({
      currentIndex:
        (this.state.currentIndex - 1) % this.state.galleryItems.length,
    });

  // Creates the items that will be displayed in the carousel
  galleryItems() {
    return this.props.data.allAlbumsJson.edges.map(({ node }) => (
      <div>
        <Link
          to={
            '/' +
            node.title
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/ü/g, 'u') +
            '/'
          }
        ></Link>
        <Img
          fluid={node.thumbnail.childImageSharp.fluid}
          className="slider-image"
        ></Img>
      </div>
    ));
  }

  navButton(item, i) {
    var sliderClass = 'slider-dot';

    // We have speical styling for the selected dot
    if (this.state.currentIndex === i) {
      sliderClass += ' slider-dot--selected';
    }
    return (
      <li onClick={() => this.slideTo(i)} className={sliderClass}>
        <span className="dot-tooltip"></span>
      </li>
    );
  }

  render() {
    return (
      <Layout>
        <Container>
          <Row>
            <Col>
              <AliceCarousel
                items={this.state.galleryItems}
                dotsDisabled={true}
                buttonsDisabled={true}
                mouseTrackingEnabled={true}
                touchTrackingEnabled={true}
                autoPlay={false}
                autoPlayInterval={5000}
                stopAutoPlayOnHover={true}
                autoHeight={true}
                slideToIndex={this.state.currentIndex}
                onSlideChanged={this.onSlideChanged}
              ></AliceCarousel>
              <ul className="slider-dots">
                {this.props.data.allAlbumsJson.edges.map(this.navButton)}
              </ul>
              <div className="slider-button-left-wrapper">
                <span
                  className="slider-button-touch"
                  onClick={() => this.slidePrev()}
                >
                  <i className="arrow arrow-left"></i>
                </span>
              </div>

              <div className="slider-button-right-wrapper">
                <span
                  className="slider-button-touch"
                  onClick={() => this.slideNext()}
                >
                  <i className="arrow arrow-right"></i>
                </span>
              </div>
            </Col>
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
