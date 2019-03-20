import React, { Component } from 'react';
import './App.css';
import Notes from './Notes';

console.log(Notes)

function CreateNote(props) {
  let type = props.type
  let identifier = props.identifier
  let UserEntered = props.userInput
  return <div>  
  <br></br>
  {/* <input type="text" className="UserForm" placeholder = {props.input} value = {inputtext} onChange = {() => props.SaveInput(type, identifier, inputtext)}/> */}
  <input type="text" className="UserForm" placeholder = "Input Text" value={props.value} onChange = {props.setUserInput} onBlur = {props.validateInput}/>
  <br></br>
  <button onClick = {() => {props.MoveLeft(type,identifier,UserEntered); console.log(UserEntered)}}>&larr;</button>
  <button onClick = {() => props.Delete(type,identifier)}>x</button>
  <button onClick = {() => {props.MoveRight(type,identifier,UserEntered); console.log(UserEntered)}}>&rarr;</button>
  </div>
}


class App extends Component {
  state = {
  identifier : 0,
  wentWell: [],
  toImprove: [],
  actionItems: [],
  userInput : ""
  };

  CreateWentWell = (textinput) => this.setState({
    wentWell: [...this.state.wentWell,
    <CreateNote key={this.state.identifier} identifier={this.state.identifier} type="Went Well" userInput={this.state.userInput} value={textinput} setUserInput={this.setUserInput} validateInput={this.validateInput} MoveLeft={this.MoveLeft} Delete={this.Delete} MoveRight={this.MoveRight} />], identifier: this.state.identifier + 1
  })
  CreateToImprove = (textinput) => this.setState({ toImprove: [...this.state.toImprove, <CreateNote key={this.state.identifier} identifier={this.state.identifier} type="To Improve" userInput={this.state.userInput} value={textinput} setUserInput={this.setUserInput} validateInput={this.validateInput} MoveLeft={this.MoveLeft} Delete={this.Delete} MoveRight={this.MoveRight} />], identifier: this.state.identifier + 1 })
  CreateActionItems = (textinput) => this.setState({ actionItems: [...this.state.actionItems, <CreateNote key={this.state.identifier} identifier={this.state.identifier} type="Action Items" userInput={this.state.userInput} value={textinput} setUserInput={this.setUserInput} validateInput={this.validateInput} MoveLeft={this.MoveLeft} Delete={this.Delete} MoveRight={this.MoveRight} />], identifier: this.state.identifier + 1 })
  CreateDemoNotes = Notearray => Notearray.forEach(Note => {
      if (Note.type === "Went Well") {this.CreateWentWell(Note.input); console.log(1) }
      else if (Note.type === "To Improve") {this.CreateToImprove(Note.input); console.log(2) }
      else if (Note.type === "Action Items") {this.CreateActionItems(Note.input); console.log(3) }
      else {alert("Demo Notes Error - type not found")}
    });
    setUserInput = e => { this.setState({ userInput: e.target.value }) }
    validateInput = e => { if (e.target.value === "") { window.alert("input required") } }  
    Delete = (a, b) => {
        if (a === "Went Well") { this.setState({ wentWell: this.state.wentWell.filter(entry => entry.props.identifier !== b) }) }
        else if (a === "To Improve") { this.setState({ toImprove: this.state.toImprove.filter(entry => entry.props.identifier !== b) }) }
        else { this.setState({ actionItems: this.state.actionItems.filter(entry => entry.props.identifier !== b) }) }
    }
    MoveLeft = (a,b,c) => {
        this.Delete(a, b);
        if (a === "Went Well") { this.CreateActionItems(c) }
        else if (a === "To Improve") { this.CreateWentWell(c) }
        else { this.CreateToImprove(c) }
    }
    MoveRight = (a,b,c) => {
        this.Delete(a, b);
        if (a === "Went Well") { this.CreateToImprove(c) }
        else if (a === "To Improve") { this.CreateActionItems(c) }
        else { this.CreateWentWell(c) }
    }                   
  render() {
    return (
      
      <div>
      <button className="AddEntryButton" onClick = {() => this.CreateDemoNotes(Notes)}>Create Demo Notes</button>
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