import { Component } from 'react';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  render() {
    const { pictures } = this.props;
    return (
      <>
        {Boolean(pictures.length) && (
          <GalleryList>
            {pictures.map(picture => {
              const { id, webformatURL, largeImageURL, tags } = picture;
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </GalleryList>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
