import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import AlbumCard from '../components/albumCard';
import { Container, Row } from 'reactstrap';

export default ({ data }) => {
    return (
        <Layout>
            <Container>
                <Row>
                    {data.allAlbumsJson.edges.map(({ node }) => (
                        <AlbumCard
                            title={node.title}
                            thumbnail={node.thumbnail.childImageSharp.fixed.src}
                            
                            // replace spaces w/ -
                            link={
                                node.parentAlbum.toLowerCase() +
                                '/' +
                                node.title.toLowerCase().replace(/ /g, '-').replace(/ü/g, "u")
                            }
                        />
                    ))}
                </Row>
            </Container>
        </Layout>
    );
};

export const query = graphql`
    query($parent: String) {
        allAlbumsJson(filter: { parentAlbum: { eq: $parent } }) {
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
