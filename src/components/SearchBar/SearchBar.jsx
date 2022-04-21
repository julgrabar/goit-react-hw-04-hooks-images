import propTypes from 'prop-types';
import { Component } from 'react';
import { StyledSearchBar, SearchForm } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    searchValue: '',
  };

  static propTypes = {
    onSubmit: propTypes.func.isRequired,
  };

  onInput = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { searchValue } = this.state;

    if (!searchValue.trim()) {
      alert('Enter the search request');
      return;
    }

    this.props.onSubmit(searchValue);
  };

  render() {
    return (
      <StyledSearchBar>
        <SearchForm onSubmit={this.onSubmit}>
          <button type="submit">
            <span className="material-icons">search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInput}
            value={this.state.searchValue}
          />
        </SearchForm>
      </StyledSearchBar>
    );
  }
}
