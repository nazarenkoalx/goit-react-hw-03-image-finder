import { Component } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './Container/Container.styled';
import { TailSpin } from 'react-loader-spinner';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  onSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSearchFormSubmit} />
        <Container>
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <ImageGallery query={this.state.searchQuery} page={this.state.page} />
          <ToastContainer autoClose={3000} theme="dark" />
        </Container>
      </div>
    );
  }
}
