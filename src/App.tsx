import React, { Component, JSX } from 'react';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import styles from './App.module.css';

interface MainContentProps {
  searchTerm: string;
  throwError: boolean;
}

class MainContent extends Component<MainContentProps> {
  render(): JSX.Element {
    if (this.props.throwError) {
      throw new Error('Test error thrown by button');
    }
    return <CardList searchTerm={this.props.searchTerm} />;
  }
}

interface AppState {
  searchTerm: string;
  throwError: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    throwError: false,
  };

  handleSearch = (term: string): void => {
    this.setState({ searchTerm: term, throwError: false });
  };

  handleThrowError = (): void => {
    this.setState({ throwError: true });
  };

  handleResetError = (): void => {
    this.setState({ throwError: false });
  };

  render(): JSX.Element {
    return (
      <ErrorBoundary onReset={this.handleResetError}>
        <div className={styles.container}>
          <Search onSearch={this.handleSearch} />
          <MainContent
            searchTerm={this.state.searchTerm}
            throwError={this.state.throwError}
          />
          <button
            onClick={this.handleThrowError}
            className={styles.errorButton}
          >
            Throw Error
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
