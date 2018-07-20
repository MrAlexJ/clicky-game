import React, { Component } from 'react';
//import { Line } from 'rc-progress';
import Wrapper from './components/Wrapper';
import Card from './components/Card';
import Characters from './characters.json';
import './App.css';

let topScore = 0;
let guessesCorrect = 0;
let pokeballs = 0;
let message = "";


class App extends Component {

  state = {
    Characters,
    topScore,
    guessesCorrect,
    message,
    pokeballs
  };

  setClicked = id => {
    const Characters = this.state.Characters;
    const cardClicked = Characters.filter(Character => Character.id === id);

    if (cardClicked[0].clicked){
      guessesCorrect = 0;
      message = "Uh Oh, You fainted! Start Over";

      for (let i = 0; i < Characters.length; i++){
        Characters[i].clicked = false;
      }

      this.setState({message});
      this.setState({guessesCorrect});
      this.setState({Characters});
    } else {
      cardClicked[0].clicked = true;
      guessesCorrect = guessesCorrect + 4;
      message = "Great!!";

      if (guessesCorrect > topScore){
        topScore = guessesCorrect;
        pokeballs++;
        this.setState({pokeballs});
        this.setState({topScore});
        this.renderPokeballs();
      }

      Characters.sort((a, b) => {
        return 0.5 - Math.random();
      });

      this.setState({Characters});
      this.setState({guessesCorrect});
      this.setState({message});
    }
  };

  renderPokeballs(){
    let balls = [];

    for (let i = 0; i < this.state.pokeballs; i++){
      balls.push(<div key={i} className="pokeball"></div>);
    }

    return <div>{balls}</div>;
  };


  render() {
    return (
      <Wrapper>
        <div className="trainer">
          <div className="trainerText">
            <h1 className="banner">Pokemon Click Game</h1>
            <h3 className="catchphrase">Gotta catchem all!!</h3>
            <h3 className ="mesage">{this.state.message}</h3>
          </div>
          <div className="buttonWrapper">
            <img className="buttons" src="images/gamepad.png" alt="gamepad" />
          </div>
        </div>
        <div className="row">
          {this.state.Characters.map(Characters => (
            <Card
              setClicked={this.setClicked}
              id={Characters.id}
              key={Characters.id}
              name={Characters.name}
              className="col-sm-1"
            />
          ))}

        </div>
      </Wrapper>

    );
  }
};

export default App;
