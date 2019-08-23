import React from 'react';
import Layout from '../components/layout';
import AlbumCard from '../components/albumCard';
import { graphql, Link } from 'gatsby';
import { Container, Row } from 'reactstrap';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    Image,
    DotGroup,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Img from 'gatsby-image';
import { css } from '@emotion/core';
import '../styles/home.css';

export default class Home extends React.Component {
    updateLabel() {
        console.log("hello")
    }
 
    componentDidMount() {
        // Add an event listener to the slider so we know when it animates
        var element = document.getElementsByClassName('slider!!!')[0];

        // Code for Chrome, Safari and Opera
        element.addEventListener('webkitAnimationEnd', this.updateLabel());

        // Standard syntax
        element.addEventListener('animationend', this.updateLabel());
    }


    render() {
        return (
            <Layout>
                <Container>
                    <CarouselProvider
                        naturalSlideWidth={20}
                        naturalSlideHeight={14}
                        totalSlides={this.props.data.allAlbumsJson.edges.length}
                    >
                        <Slider
                        classNameTray="slider!!!">
                            {this.props.data.allAlbumsJson.edges.map(
                                ({ node }, index) => (
                                    <Slide index={index} onAnimationEnd={this.updateLabel()} onWebkitAnimationEnd={this.updateLabel()}>
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
                                                class="slider-image"
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
                        <ButtonBack class="back-button slider-button">
                            <div class="slider-button-touch">
                                <i class="arrow left" />
                            </div>
                        </ButtonBack>

                        <ButtonNext class="forward-button slider-button">
                            <i class="arrow right" />
                        </ButtonNext>
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
