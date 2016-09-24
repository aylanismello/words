import React from 'react';
import {
	ScrollView,
	Text,
	View } from 'react-native';
import Button from 'react-native-button';
import GameContainer from './game_container';
import DeckMenuContainer from '../deck_menu/deck_menu_container';

class GameResults extends React.Component{

	constructor(props) {
		super(props);
		this.state = {height: 400};
	}

	_redirectToPlay() {
		this.props.nav.push({component: GameContainer, title: "Play"});
	}

	_redirectToDeckMenu() {
		this.props.nav.push(
			{component: DeckMenuContainer,
				title: this.props.deckTitle});
	}

	render() {
		return (
			<ScrollView
				contentContainerStyle={{
					marginLeft: 15,
					marginRight: 15,
					flex: 1,
					height: this.state.height}}>

					<View>
						<Text> {this.props.correctCount} correct. </Text>
						<Text> {this.props.incorrectCount} incorrect. </Text>
					</View>
					<View>
						<Button onPress={this._redirectToPlay.bind(this)}>
							Play Again
						</Button>
						<Button onPress={this._redirectToDeckMenu.bind(this)}>
							Done
						</Button>
					</View>


			</ScrollView>
		);
	}
}


export default GameResults;
