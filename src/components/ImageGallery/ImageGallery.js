import { Component } from 'react';
import { GalleryList, EmptyGal } from './ImageGallery.styled';
import { goSearch } from 'components/api/GoSearch';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
// import { Modal } from 'components/Modal/Modal';
// import { LargeImage } from 'components/LargeImage/LargeImage';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    totalHits: 0,
    page: 1,
    loading: false,
  };

  clearPictures = () => {
    this.setState({ pictures: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.clearPictures();
      this.setState({ loading: true });
      goSearch(this.props.query, this.state.page)
        .then(response => {
          this.setState({
            pictures: response.data.hits,
            totalHits: response.data.total,
          });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { pictures, loading, totalHits } = this.state;
    return (
      <>
        {loading && <Loader />}
        {totalHits === 0 && <EmptyGal>there are no images found</EmptyGal>}
        {Boolean(pictures.length) && (
          <GalleryList>
            {pictures.map(picture => {
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
        )}
      </>
    );
  }
}
