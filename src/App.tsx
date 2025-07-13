import React, { Component, JSX } from 'react';
import CardList from './components/CardList/CardList';
import styles from './App.module.css';

class App extends Component {
  render(): JSX.Element {
    return (
      <div className={styles.container}>
        <CardList />
      </div>
    );
  }
}

export default App;
