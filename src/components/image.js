import React from 'react';
import { Col, Modal, ModalBody } from 'reactstrap';
import { css } from '@emotion/core';
import Img from 'gatsby-image';
import '../styles/image.css';

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
          padding: 0px;
          margin-top: 20px;
          margin-left: 5px;
          margin-right: 5px;
        `}
      >
        {/* This div is just serves as a container so that clicking on the
                    image will open the modal */}
        <div onClick={this.toggle} class="image">
          <Img fluid={this.props.src} alt="this is an image" />
        </div>

        {/* This modal will pop up upon clicking on an image, allowing
                    a bigger version to be shown */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="xl"
          fade={true}
          onClick={this.toggle}
        >
          <ModalBody>
            <Img fluid={this.props.src} />
          </ModalBody>
        </Modal>
      </Col>
    );
  }
}
