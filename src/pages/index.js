import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import { Container } from 'reactstrap';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    Image,
    DotGroup,
    Dot,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../styles/home.css';

export default class Home extends React.Component {
    render() {
        return (
            <Layout>
                <Container>
                    <CarouselProvider
                        naturalSlideWidth={20}
                        naturalSlideHeight={14}
                        totalSlides={this.props.data.allAlbumsJson.edges.length}
                        isPlaying={true}
                        interval={3000}
                        className="slider"
                    >
                        <Slider>
                            {this.props.data.allAlbumsJson.edges.map(
                                ({ node, index }) => (
                                    <Slide index={index}>
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
                                            <Image
                                                className="slider-image"
                                                src={
                                                    node.thumbnail
                                                        .childImageSharp.fluid
                                                        .src
                                                }
                                            />
                                            <div class="slider-label">
                                                {node.title}
                                            </div>
                                        </Link>
                                    </Slide>
                                )
                            )}
                        </Slider>
                        <ButtonBack className="back-button slider-button">
                            <i class="arrow left" />
                        </ButtonBack>

                        <ButtonNext className="forward-button slider-button">
                            <i class="arrow right" />
                        </ButtonNext>
                        <div className="slider-dots">
                            {this.props.data.allAlbumsJson.edges.map(
                                ({ node }, index) => (
                                    <Dot slide={index}>
                                        <span className="dot-tooltip">{node.title}</span>
                                    </Dot>
                                )
                            )}
                        </div>
                        {/* <DotGroup className="slider-dots"></DotGroup> */}
                    </CarouselProvider>
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
