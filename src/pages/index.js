import React from 'react';
import Layout from '../components/layout';
import AlbumCard from '../components/albumCard';
import { graphql } from 'gatsby';
import { Container, Row } from 'reactstrap';

export default ({ data }) => {
    return (
        <Layout>
            <Container>
                <Row>
                    {data.allAlbumsJson.edges.map(({ node }) => (
                        <AlbumCard
                            title={node.title}
                            thumbnail={
                                node.thumbnail.childImageSharp.fixed.src
                            }
                            link={'/' + node.title.toLowerCase()}
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
