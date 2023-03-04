import { Component } from 'react';
import { GalleryList } from './ImageGallery.styled';
import { goSearch } from 'components/api/GoSearch';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    pictures: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      goSearch(this.props.query, this.props.page)
        .then(response => {
          this.setState({ pictures: { ...response } });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <GalleryList>
        {this.state.pictures &&
          this.state.pictures.data.hits.map(picture => {
            const { id, webformatURL, largeImageURL } = picture;
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            );
          })}
      </GalleryList>
    );
  }
}
