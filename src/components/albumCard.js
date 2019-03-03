import React from 'react';
import { Card, CardBody, CardImg, Col, CardText } from 'reactstrap';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

// This component will be used to define the album cards that lead to either more
// albums, or a gallery
export default ({ title, thumbnail, link }) => {
    return (
        <Col
            md="4"
            css={css`
                margin-top: 20px;
                margin-bottom: 20px;
            `}
        >
            <Link to={link}>
                <Card>
                    <CardImg src={thumbnail} />
                    <CardBody>
                        <CardText>{title}</CardText>
                    </CardBody>
                </Card>
            </Link>
        </Col>
    );
};
