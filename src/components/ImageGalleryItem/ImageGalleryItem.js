import { GalleryLi, GalleryImg } from './ImageGalleryItem.styled';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { LargeImage } from 'components/LargeImage/LargeImage';
import PropTypes from 'prop-types';
export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  showModalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <>
        <GalleryLi>
          {this.state.showModal && (
            <Modal onModalShow={this.showModalToggle}>
              <LargeImage imgUrl={this.props.largeImageURL} />
            </Modal>
          )}
          <GalleryImg
            onClick={this.showModalToggle}
            src={this.props.webformatURL}
            alt={this.props.tags}
            width="290"
          />
        </GalleryLi>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
