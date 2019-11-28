import React from 'react';
import { Card, CardBody, CardImg, Col, CardText } from 'reactstrap';
import { Link } from 'gatsby';
import '../styles/albumCard.css';

// This component will be used to define the album cards that lead to either more
// albums, or a gallery
export default ({ title, thumbnail, link }) => {
  return (
    <Col md="4">
      <Link to={link}>
        <Card>
          <CardImg src={thumbnail} alt="This will link to another page" />
          <CardBody>
            <CardText>{title}</CardText>
          </CardBody>
        </Card>
      </Link>
    </Col>
  );
};
