import React, { Component, JSX } from 'react';
import styles from './Card.module.css';

interface CardProps {
  name: string;
  description: string;
  imageUrl: string;
}

class Card extends Component<CardProps> {
  render(): JSX.Element {
    const { name, description, imageUrl } = this.props;
    return (
      <div className={styles.card}>
        <img src={imageUrl} alt={name} className={styles.image} />
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    );
  }
}

export default Card;
