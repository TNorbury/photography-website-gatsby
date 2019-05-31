import React from 'react';
import Layout from '../components/layout';
import AlbumCard from '../components/albumCard';
import { graphql } from 'gatsby';
import { Container, Row } from 'reactstrap';
import { css } from '@emotion/core';

export default ({ data }) => {
    return (
        <Layout>
            <Container
                css={css`
                    margin-right: auto;
                `}
            >
                <Row>
                    {data.allAlbumsJson.edges.map(({ node }) => (
                        <AlbumCard
                            title={node.title}
                            thumbnail={node.thumbnail.childImageSharp.fixed.src}
                            
                            // replace spaces w/ -
                            link={
                                '/' +
                                node.title.toLowerCase().replace(/ /g, '-')
                            }
                        />
                    ))}
                </Row>
            </Container>
        </Layout>
    );
};

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
                            fixed(width: 300, height: 300, quality: 90) {
                                src
                            }
                        }
                    }
                }
            }
        }
    }
`;
