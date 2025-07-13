import React, { Component, JSX } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  inputValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    inputValue: localStorage.getItem('searchTerm') || '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: event.target.value });
  };

  handleSearch = (): void => {
    const searchTerm = this.state.inputValue.trim();
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  handleReset = (): void => {
    this.setState({ inputValue: '' });
    localStorage.removeItem('searchTerm');
    this.props.onSearch('');
  };

  render(): JSX.Element {
    return (
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          className={styles.input}
          placeholder="Search Pokémon..."
        />
        {this.state.inputValue && (
          <button
            onClick={this.handleReset}
            className={styles.resetButton}
            title="Reset search"
          >
            ✕
          </button>
        )}
        <button onClick={this.handleSearch} className={styles.button}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
