import { Component } from 'react';
import { GalleryList, EmptyGal } from './ImageGallery.styled';
import { goSearch } from 'components/api/GoSearch';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
// import { Modal } from 'components/Modal/Modal';
// import { LargeImage } from 'components/LargeImage/LargeImage';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    totalHits: 0,
    page: 1,
    totalPages: 0,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      this.state.page !== prevState.page
    ) {
      // this.clearPictures();
      this.setState({ loading: true });
      goSearch(this.props.query, this.state.page)
        .then(response => {
          this.setState({
            pictures: [...prevState.pictures, ...response.data.hits],
            totalHits: response.data.totalHits,
            totalPages: Math.floor(response.data.totalHits / 12),
          });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }
  }

  clearPictures = () => {
    this.setState({ pictures: [] });
  };

  onLoadMoreClick = () => {
    console.log('want more');
    this.setState(prevProps => {
      this.setState({ page: prevProps.page + 1 });
    });
  };

  render() {
    const { pictures, loading, totalHits, totalPages } = this.state;
    return (
      <>
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
        {loading && <Loader />}
        {totalPages !== 0 && <Button onLoadMoreClick={this.onLoadMoreClick} />}
      </>
    );
  }
}
