import React from "react";
import Layout from "../components/layout";
import AlbumCard from "../components/albumCard";
import { graphql } from "gatsby";
import { Container, Row, Col } from "reactstrap";

export default ({ data }) => {
    return (
        <Layout>
            <Container>
                <Row>
                    {data.allAlbumsJson.edges.map(({ node }) => (
                        <Col xs="auto">
                            <AlbumCard
                                title={node.title}
                                thumbnail={
                                    node.image.src.childImageSharp.fluid.src
                                }
                            />
                        </Col>
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
                    image {
                        src {
                            childImageSharp {
                                fluid {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
