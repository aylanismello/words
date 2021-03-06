import React from 'react';
import {
	Text,
	TextInput,
	View,
	StyleSheet,
	PickerIOS,
	ScrollView,
	Dimensions,
	TouchableHighlight
} from 'react-native';
import Button from 'react-native-button';
import DeckIndexContainer from '../deck_menu/deck_menu_container';
import GameResultsContainer from './game_results_container';
import * as _ from 'underscore';


class Game extends React.Component {
	constructor(props) {
		super(props);
		let deck = new Array(1).fill("");
		this._handleChoice = this._handleChoice.bind(this);
		this._isCorrectChoice = this._isCorrectChoice.bind(this);
		// GAME STATE:
		// WORDS
		// get funtionality where words are removed from words in state
		this.state = {height: 400};

	}

	_handleChoice(choice) {

		if (this._isCorrectChoice(choice))
			this.props.addCorrect();

		if (this.props.gameDeck.length > 0){
			this._goToNextWord();
		} else {
			this.props.nav.push(
				{component: GameResultsContainer,
					title: "Results",
					leftButtonTitle: " "});

			console.log('go to results!');
		}

		// this._goToNextWord();
		// now what we do is run game logic
	}

	_isCorrectChoice(choice) {
		// debugger;
		let wordCard = {};

		this.props.deck.forEach(card => {
			if (card.source === choice)
				wordCard = card;
		});

		let isCorrect = (wordCard.dest === this.props.word);
		return isCorrect;

	}

	_goToNextWord() {
		let word = _.sample(this.props.gameDeck).dest;
		// this.setState({word});
		this.props.setWord(word);
		this.props.removeWord(word);
	}

	componentDidMount() {
		this.props.initGameDeck(this.props.deck);
		let word = _.sample(this.props.words);
		this.props.setWord(word);
		this.props.removeWord(word);
	}

	render() {

		let title = (
			<View style={styles.wordContainer}>
				<Text style={styles.word}>{this.props.word}</Text>
			</View>

		);

		let choices = this.props.choices.map((choice, idx) => {
			return (
				<TouchableHighlight
					style={styles.choiceContainer}
					key={idx}
					onPress={this._handleChoice.bind(null, choice)}>
					<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
						<Text style={styles.choice}>
							{choice}</Text>
					</View>
				</TouchableHighlight>
			);
		});

		return(
				<ScrollView
					contentContainerStyle={{
						flex: 1,
						height: this.state.height}}>
					{title}

					<View style={styles.choicesContainer}>
						{choices}
					</View>

				</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	word: {
		fontSize: 45,
		padding: 5,
		margin: 40,
		textAlign: "center",
		color: "#4891C0"
	},
	wordContainer: {
		height: 200
	},
	choicesContainer: {
		backgroundColor: "#eee",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flex: 1
	},
	choiceContainer: {
		width: 200,
		height: 50,
		backgroundColor: "#fff",
		margin: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#ccc"
	},
	choice: {
		textAlign: "center",
		color: "#4891C0",
		fontSize: 20
	}
});

export default Game;
