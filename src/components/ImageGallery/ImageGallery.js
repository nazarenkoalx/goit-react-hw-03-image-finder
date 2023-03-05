import { Component } from 'react';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

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
        {this.props.children}
      </>
    );
  }
}
