import React from 'react';
import { Link } from 'gatsby';
import { Col } from 'reactstrap';
import '../styles/slider.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Img from 'gatsby-image';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      galleryItems: this.galleryItems(),
    };

    this.navButton = this.navButton.bind(this);
  }

  // Changes to the slide at the given index
  slideTo = i => this.setState({ currentIndex: i });

  onSlideChanged = e => this.setState({ currentIndex: e.item });

  // Moves to the next or previous slide
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
    const handleOnDragStart = e => e.preventDefault();
    console.log(this.state);

    // We have to convert the albums object from the props into an array so we
    // can iterate over it
    let albumsArray = Object.values(this.props.albums);
    return albumsArray.map(({ node }) => (
      <div>
        <Img
          fluid={node.thumbnail.childImageSharp.fluid}
          className="slider-image"
          onDragStart={handleOnDragStart}
        ></Img>
        <Link
          to={
            '/' +
            node.title
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/ü/g, 'u') +
            '/'
          }
        >
          <span className="label-touch">
            <span className="slider-label">{node.title}</span>
          </span>
        </Link>
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
        <span className="dot-tooltip">{item.node.title}</span>
      </li>
    );
  }

  render() {
    // return <div>Slider </div>;
    console.log(this.state.galleryItems);
    return (
      <Col className="slider">
        <AliceCarousel
          items={this.state.galleryItems}
          // We made our own buttons and dots, so hide the factory ones
          dotsDisabled={true}
          buttonsDisabled={true}
          mouseTrackingEnabled={true}
          touchTrackingEnabled={true}
          // Auto play is on by default, with a 3 second interval. Any
          // interaction with the slider stops auto play
          autoPlay={true}
          autoPlayInterval={3000}
          disableAutoPlayOnAction={true}
          stopAutoPlayOnHover={true}
          autoHeight={true}
          slideToIndex={this.state.currentIndex}
          onSlideChanged={this.onSlideChanged}
        ></AliceCarousel>

        {/* slider dots */}
        <ul className="slider-dots">
          {Object.values(this.props.albums).map(this.navButton)}
        </ul>

        {/* The left-facing "previous" arrow */}
        <div className="slider-button-left-wrapper">
          <span
            className="slider-button-touch"
            onClick={() => this.slidePrev()}
          >
            <i className="arrow arrow-left"></i>
          </span>
        </div>

        {/* The right-facing "next" arrow */}
        <div className="slider-button-right-wrapper">
          <span
            className="slider-button-touch"
            onClick={() => this.slideNext()}
          >
            <i className="arrow arrow-right"></i>
          </span>
        </div>
      </Col>
    );
  }
}
