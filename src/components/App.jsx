import { Component } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './Container/Container.styled';
import { goSearch } from './api/GoSearch';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { EmptyGal } from './ImageGallery/ImageGallery.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    totalHits: 0,
    page: 1,
    totalPages: 0,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });

      await goSearch(searchQuery, page)
        .then(response => {
          this.setState(prevState => {
            return {
              pictures: [...prevState.pictures, ...response.data.hits],
              totalHits: response.data.totalHits,
              totalPages: Math.floor(response.data.totalHits / 12),
            };
          });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery, page: 1, pictures: [] });
  };
  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { pictures, loading, totalPages, totalHits, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSearchFormSubmit} />
        <Container>
          {totalHits === 0 && <EmptyGal>there are no images found</EmptyGal>}
          {loading && page === 1 && <Loader />}
          <ImageGallery pictures={pictures}>
            {loading && <Loader />}
            {totalPages !== page && totalPages !== 0 && (
              <Button onLoadMoreClick={this.onLoadMoreClick} />
            )}
          </ImageGallery>
        </Container>
        <ToastContainer autoClose={3000} theme="dark" />
      </>
    );
  }
}
