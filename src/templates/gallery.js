import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import { Container, Row } from 'reactstrap';
import Image from '../components/image';

export default ({ data }) => {
  var container = [];
  var imageRows = [];
  // Iterate over all the nodes, putting them into groups of 3
  data.allFile.edges.forEach(function(node, index) {
    container.push(node);
    if (index % 3 === 2) {
      imageRows.push(container);
      container = [];
    }
  });

  // If the number of files we have isn't divisible by 3, then we need to make sure
  // the last row of images also gets included
  if (!imageRows.includes(container)) {
    imageRows.push(container);
  }

  return (
    <Layout>
      <Container>
        {imageRows.map(row => {
          return (
            <Row>
              {row.map(image => (
                <Image src={image.node.childImageSharp.fluid} />
              ))}
            </Row>
          );
        })}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query($images: [String]) {
    allFile(
      filter: { relativeDirectory: { in: $images } }
      sort: { fields: relativePath }
    ) {
      edges {
        node {
          relativeDirectory
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
`;
