import React, { Component, JSX } from 'react';
import Card from '../Card/Card';
import styles from './CardList.module.css';

interface Pokemon {
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

interface CardListState {
  pokemon: Pokemon | null;
  error: string | null;
}

class CardList extends Component<Record<string, never>, CardListState> {
  state: CardListState = {
    pokemon: null,
    error: null,
  };

  componentDidMount(): void {
    this.fetchPokemon();
  }

  async fetchPokemon(): Promise<void> {
    try {
      // const response = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: Pokemon = await response.json();
      console.log('Fetched Pokémon data:', data);
      this.setState({ pokemon: data });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }

  render(): JSX.Element {
    const { pokemon, error } = this.state;

    if (error) {
      return <div className={styles.error}>{error}</div>;
    }

    if (!pokemon) {
      return <div className={styles.loading}>Loading...</div>;
    }

    return (
      <div className={styles.container}>
        <Card
          name={pokemon.name}
          description={`Type: ${pokemon.types.map((t) => t.type.name).join(', ')}`}
          imageUrl={pokemon.sprites.front_default}
        />
      </div>
    );
  }
}

export default CardList;
