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

import RightArrow from './../media/graphics/right_triangle.svg';

export default class Home extends React.Component {
    render() {
        return (
            <Layout>
                <Container>
                    <CarouselProvider
                        naturalSlideWidth={20}
                        naturalSlideHeight={14}
                        totalSlides={this.props.data.allAlbumsJson.edges.length}
                    >
                        <Slider>
                            {/* <Slide index={0}>I am the first Slide.</Slide>
                            <Slide index={1}>I am the second Slide.</Slide>
                            <Slide index={2}>I am the third Slide.</Slide> */}
                            {this.props.data.allAlbumsJson.edges.map(
                                ({ node }, index) => (
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
                                                src={
                                                    node.thumbnail
                                                        .childImageSharp.fluid
                                                        .src
                                                }
                                            />
                                            <div
                                                class="slider-label"
                                            >
                                                {node.title}
                                            </div>
                                        </Link>
                                    </Slide>
                                )
                            )}
                        </Slider>
                        <ButtonBack class="back-button slider-button">{'<'}</ButtonBack>
                        {/* <DotGroup css={css`display:inline-block`} /> */}

                        <ButtonNext class="forward-button slider-button">{'>'}</ButtonNext>
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
