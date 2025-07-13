import React, { Component, JSX } from 'react';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import styles from './CardList.module.css';

interface PokemonSummary {
  name: string;
  url: string;
}

interface Pokemon extends PokemonSummary {
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

interface CardListProps {
  searchTerm: string;
}

interface CardListState {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

class CardList extends Component<CardListProps, CardListState> {
  state: CardListState = {
    pokemonList: [],
    isLoading: false,
    error: null,
  };

  componentDidMount(): void {
    this.fetchPokemon(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: CardListProps): void {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchPokemon(this.props.searchTerm);
    }
  }

  async fetchPokemon(searchTerm: string): Promise<void> {
    this.setState({ isLoading: true, error: null });
    try {
      let pokemonDetails: Pokemon[] = [];
      if (searchTerm) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'No Pokémon found'
              : `HTTP error! Status: ${response.status}`
          );
        }
        const data: Pokemon = await response.json();
        console.log(`Fetched Pokémon: ${searchTerm}`, data);
        pokemonDetails = [data];
      } else {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Pokémon list:', data.results);
        pokemonDetails = await Promise.all(
          data.results.map(async (summary: PokemonSummary) => {
            const detailResponse = await fetch(summary.url);
            if (!detailResponse.ok) {
              throw new Error(`HTTP error! Status: ${detailResponse.status}`);
            }
            const detailData: Pokemon = await detailResponse.json();
            console.log(`Fetched details for ${summary.name}:`, detailData);
            return detailData;
          })
        );
      }
      this.setState({ pokemonList: pokemonDetails, isLoading: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  }

  render(): JSX.Element {
    const { pokemonList, isLoading, error } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <div className={styles.error}>{error}</div>;
    }

    return (
      <div className={styles.grid}>
        {pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <Card
              key={pokemon.name}
              name={pokemon.name}
              description={`Type: ${pokemon.types.map((t) => t.type.name).join(', ')}`}
              imageUrl={pokemon.sprites.front_default}
            />
          ))
        ) : (
          <div className={styles.noResults}>No Pokémon found</div>
        )}
      </div>
    );
  }
}

export default CardList;
