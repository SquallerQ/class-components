import React, { Component, JSX } from 'react';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import styles from './App.module.css';

interface AppState {
  searchTerm: string;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  handleSearch = (term: string): void => {
    this.setState({ searchTerm: term });
  };

  render(): JSX.Element {
    return (
      <div className={styles.container}>
        <Search onSearch={this.handleSearch} />
        <CardList searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
