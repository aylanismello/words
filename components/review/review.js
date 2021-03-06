import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "dest"
    };

    this._flipCard = this._flipCard.bind(this);
    this._resetDest = this._resetDest.bind(this);
  }

  _flipCard() {
    if (this.state.language === "dest") {
      this.setState({language: "source"});
    } else if (this.state.language === "source") {
      this.setState({language: "dest"});
    }
  }

  _resetDest() {
    this.setState({language: "dest"});
  }

  render() {
    const cardSlides = this.props.deck.deck.map((card, index) => {
      if (this.state.language === "dest") {
        return (
          <View key={index} style={styles.cardView}>
          <Text style={styles.cardWord}>{card.dest}</Text>
          <Button onPress={this._flipCard} style={styles.flipButton}>Flip</Button>
          </View>
        );
      } else if (this.state.language === "source") {
        return (
          <View key={index} style={styles.cardView}>
          <Text style={styles.cardWord}>{card.source}</Text>
          <Button onPress={this._flipCard} style={styles.flipButton}>Flip</Button>
          </View>
        );
      }
    });

    return (
      <Swiper
        contentContainerStyle={styles.wrapper}
        onScrollBeginDrag={this._resetDest}>
        {cardSlides}
      </Swiper>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardWord: {
    color: "#4891C0",
    fontSize: 48
  },
  flipButton: {
    marginTop: 30,
    backgroundColor: '#4891C0',
    color: "#fff",
    padding: 8,
    fontSize: 20,
    borderRadius: 5
  }
});

export default Review;
