import React from 'react';
import { graphql } from 'gatsby';
import { Media, Container, Col, Row } from 'reactstrap';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import { css } from '@emotion/core';

export default ({ data }) => {
    return (
        <Layout>
            <Container css={css`padding: 5px`}>
                <Row>
                    <Col>
                        {data.allImageSharp.edges.map(({ node }) => (
                            <Img fluid={node.fluid} />
                        ))}
                    </Col>
                    <Col>
                        <Media>
                            <Media body>
                                Hello, I'm Tyler and this is my photography
                                website! <br />
                                I'm currently living in the PNW and work as a
                                software engineer, but I also really enjoy just
                                walking around and taking pictures of stuff and
                                I try to do that whenever I can. <br />
                                I'd describe my style as street photography,
                                since I take pictures of things I see while on
                                the street and while I primarily shoot digital,
                                I also love shooting to film, both on 35mm and
                                medium format. <br />
                                Going back to the software engineering side of
                                things, I made this entire website myself using
                                ReactJs and more specifically with the help of
                                the{' '}
                                <a
                                    href="https://www.gatsbyjs.org/"
                                    css={css`
                                        text-decoration: underline;
                                    `}
                                >
                                    GatsbyJS framework
                                </a>{' '}
                                <br />
                                Some relevant links:
                                <ul>
                                    <li>
                                        <a
                                            href="https://www.instagram.com/tylernorbury/"
                                            css={css`
                                                text-decoration: underline;
                                            `}
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/TNorbury"
                                            css={css`
                                                text-decoration: underline;
                                            `}
                                        >
                                            GitHub
                                        </a>
                                    </li>
                                </ul>
                            </Media>
                        </Media>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export const query = graphql`
    query {
        allImageSharp(filter: { fluid: { originalName: { eq: "me.jpg" } } }) {
            edges {
                node {
                    fluid(quality: 90) {
                        src
                        originalName
                        aspectRatio
                    }
                }
            }
        }
    }
`;
