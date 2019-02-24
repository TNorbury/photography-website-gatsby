import React from 'react';
import { Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { css } from '@emotion/core';
import Img from 'gatsby-image';

// This component will be used for housing the images that are displayed in
// galleries
export default class Image extends React.Component {
    constructor(props) {
        super(props);

        // Keep track of the state of the modal
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    render() {
        return (
            <Col
                css={css`
                    padding: 5px;
                `}
            >
                {/* This div is just serves as a container so that clicking on the
                    image will open the modal */}
                <div
                    onClick={this.toggle}
                    css={css`
                        border-style: solid;
                        border-width: 1px;
                        cursor: pointer;
                    `}
                >
                    <Img fluid={this.props.src} />
                </div>

                {/* This modal will pop up upon clicking on an image, allowing
                    a bigger version to be shown */}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    size="xl"
                    fade={true}
                >
                    <ModalBody
                        css={css`
                            background-color: #bdbdbd;
                        `}
                    >
                        <Img fluid={this.props.src} />
                    </ModalBody>
                </Modal>
            </Col>
        );
    }
}
