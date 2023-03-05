import { Component } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './Container/Container.styled';
import { goSearch } from './api/GoSearch';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { EmptyGal } from './ImageGallery/ImageGallery.styled';
import { AppCustomStyle } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    totalHits: 0,
    page: 1,
    totalPages: 0,
    loading: false,
    error: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, error } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true, error: '' });

      await goSearch(searchQuery, page)
        .then(response => {
          this.setState(prevState => {
            return {
              pictures: [...prevState.pictures, ...response.data.hits],
              totalHits: response.data.totalHits,
            };
          });
        })
        .catch(error =>
          this.setState({
            error: 'ooopsie, app crashed, we`re solving this issue write now',
          })
        )
        .finally(() => this.setState({ loading: false }));
    }

    if (error !== prevState.error && error) {
      toast.error({ error });
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
    const { pictures, loading, totalHits } = this.state;
    return (
      <AppCustomStyle>
        <Searchbar onSubmit={this.onSearchFormSubmit} />
        <Container>
          {totalHits === 0 && <EmptyGal>there are no images found</EmptyGal>}
          <ImageGallery pictures={pictures} />

          {totalHits !== pictures.length && !loading && (
            <Button onLoadMoreClick={this.onLoadMoreClick} />
          )}
          {loading && <Loader />}
        </Container>
        <ToastContainer autoClose={3000} theme="dark" />
      </AppCustomStyle>
    );
  }
}
