import React from "react";
import { Card, CardTitle, CardBody, CardImg } from "reactstrap";

// This component will be used to define the album cards that lead to either more
// albums, or a gallery
export default ({ title, thumbnail }) => {
    return (
        <Card>
            <CardImg src={thumbnail} />
            <CardBody>
                <CardTitle>{title}</CardTitle>
            </CardBody>
        </Card>
    );
};
