import { SearchbarHeader, Form, Field, SearchButton } from './Searchbar.styled';
import { CiSearch } from 'react-icons/ci';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onInputChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
  };

  onSearchSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast('Please, enter your search query and try again!');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
    evt.target.reset();
  };

  render() {
    return (
      <SearchbarHeader>
        <Form onSubmit={this.onSearchSubmit}>
          <SearchButton type="submit">
            <CiSearch name="search loop" color="#000" size="40px" />
          </SearchButton>

          <Field
            id={nanoid()}
            name="searchInput"
            type="text"
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </Form>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
