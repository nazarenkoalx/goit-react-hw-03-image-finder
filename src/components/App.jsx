import { Component } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './Container/Container.styled';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  onSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSearchFormSubmit} />
        <Container>
          <ImageGallery
            query={this.state.searchQuery}
            onLoading={this.onLoading}
          />
        </Container>
        <ToastContainer autoClose={3000} theme="dark" />
      </>
    );
  }
}
