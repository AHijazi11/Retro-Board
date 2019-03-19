import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Notes from './Notes';

console.log(Notes)

class Userinput extends Component {
    state = {
      userInput : ""
    };
  
    setUserInput = e => {this.setState({userInput : e.target.value})}
    validateInput = e => {if(e.target.value === ""){window.alert("input required")}}
  
    render() {
      return (
        <input type="text" className="UserForm" placeholder = "Input Text" value = {this.state.userInput} onChange = {this.setUserInput} onBlur = {this.validateInput}/>
      )
    }
}


function CreateNote(props) {
  var type = props.type
  var identifier = props.identifier
  return <div>  
  <br></br>
  {/* <input type="text" className="UserForm" placeholder = {props.input} value = {inputtext} onChange = {() => props.SaveInput(type, identifier, inputtext)}/> */}
  <Userinput input = {props.input}/>
  <br></br>
  <button onClick = {() => props.MoveLeft(type,identifier)}>&larr;</button>
  <button onClick = {() => props.Delete(type,identifier)}>x</button>
  <button onClick = {() => props.MoveRight(type,identifier)}>&rarr;</button>
  </div>
}


class App extends Component {
  state = {
  identifier : 0,
  wentWell: [],
  toImprove: [],
  actionItems: []
  };

  CreateWentWell = (c) => this.setState({wentWell : [...this.state.wentWell,<CreateNote key={this.state.identifier} identifier = {this.state.identifier} type = "Went Well" input = {c} MoveLeft={this.MoveLeft} Delete={this.Delete} MoveRight={this.MoveRight}/>], identifier: this.state.identifier +1})
  CreateToImprove = () => this.setState({toImprove : [...this.state.toImprove,<CreateNote key={this.state.identifier} identifier = {this.state.identifier} type = "To Improve" input = "Input Text" MoveLeft={this.MoveLeft} Delete={this.Delete} MoveRight={this.MoveRight}/>], identifier: this.state.identifier +1})
  CreateActionItems = () => this.setState({actionItems : [...this.state.actionItems,<CreateNote key={this.state.identifier} identifier = {this.state.identifier} type = "Action Items" input = "Input Text" MoveLeft={this.MoveLeft} Delete={this.Delete} MoveRight={this.MoveRight}/>], identifier: this.state.identifier +1})
    Delete = (a, b) => {
        if (a === "Went Well") { this.setState({ wentWell: this.state.wentWell.filter(entry => entry.props.identifier !== b) }) }
        else if (a === "To Improve") { this.setState({ toImprove: this.state.toImprove.filter(entry => entry.props.identifier !== b) }) }
        else { this.setState({ actionItems: this.state.actionItems.filter(entry => entry.props.identifier !== b) }) }
    }
    MoveLeft = (a, b,c) => {
        this.Delete(a, b);
        if (a === "Went Well") { this.CreateActionItems(c) }
        else if (a === "To Improve") { this.CreateWentWell(c) }
        else { this.CreateToImprove(c) }
    }
    MoveRight = (a, b,c) => {
        this.Delete(a, b);
        if (a === "Went Well") { this.CreateToImprove(c) }
        else if (a === "To Improve") { this.CreateActionItems(c) }
        else { this.CreateWentWell(c) }
    }                   

  render() {
    return (
      <div>
     <h1 className="App">Retro Board</h1>
      <div className="column">
      <h2>Went Well</h2>
      <button className="AddEntryButton" onClick = {() => this.CreateWentWell()}>+</button>
      {this.state.wentWell.map(x=>x)}
      {console.log(this.state.wentWell)}
      </div>
      <div className="column">
      <h2>To Improve</h2>
      <button className="AddEntryButton" onClick = {() => this.CreateToImprove()}>+</button>
      {this.state.toImprove.map(x=>x)}
      {console.log(this.state.toImprove)}
      <br></br>
      </div>
      <div className="column">
      <h2>Action Items</h2>
      <button className="AddEntryButton" onClick = {() => this.CreateActionItems()}>+</button>
      {this.state.actionItems.map(x=>x)}
      {console.log(this.state.actionItems)}
      <br></br>
      </div>
      </div>
    );
  }
}

export default App;