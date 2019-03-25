import React, { Component } from "react";
import "./App.css";
import Notes from "./Notes";

function Note(props) {
  return (
    <div>
      <br />
      <input
        type="text"
        className="UserForm"
        placeholder="Input Text"
        value={props.value}
        onChange={e => props.setUserInput(e, props.idx)}
        onBlur={props.validateInput}
      />
      <br />
      <button
        onClick={() => {
          props.MoveLeft(props.identifier);
        }}
      >
        &larr;
      </button>
      <button onClick={() => props.Delete(props.identifier)}>x</button>
      <button
        onClick={() => {
          props.MoveRight(props.identifier);
        }}
      >
        &rarr;
      </button>
    </div>
  );
}

class App extends Component {
  state = {
    id: 6,
    Notes: Notes
  };

  setUserInput = (e, idx) => {
    let DummyNotes = [...this.state.Notes];
    DummyNotes[idx].input = e.target.value;
    this.setState({
      Notes: DummyNotes
    });
    console.log(this.state, e.target.value, this.state.Notes[idx].input);
  };

  validateInput = e => {
    if (e.target.value === "") {
      window.alert("input required");
    }
  };
  Delete = id => {
    this.setState({
      Notes: this.state.Notes.filter(note => note.id !== id)
    });
  };

  CreateNote = (type, input) =>
    this.setState({
      Notes: [
        ...this.state.Notes,
        { id: this.state.id, type: type, input: input }
      ],
      id: this.state.id + 1
    });

  MoveLeft = id => {
    let DummyNotes = [...this.state.Notes];
    for (let note of DummyNotes) {
      if (note.id === id && note.type === "Went Well") {
        note.type = "Action Items";
      } else if (note.id === id && note.type === "To Improve") {
        note.type = "Went Well";
      } else if (note.id === id && note.type === "Action Items") {
        note.type = "To Improve";
      }
    }
    this.setState({ Notes: DummyNotes });
  };

  MoveRight = id => {
    let DummyNotes = [...this.state.Notes];
    for (let note of DummyNotes) {
      if (note.id === id && note.type === "Went Well") {
        note.type = "To Improve";
      } else if (note.id === id && note.type === "To Improve") {
        note.type = "Action Items";
      } else if (note.id === id && note.type === "Action Items") {
        note.type = "Went Well";
      }
    }
    this.setState({ Notes: DummyNotes });
  };
  render() {
    return (
      <div>
        <br />
        <br />
        <div className="container text-center">
          <div className="row">
            <div className="col-sm">
              <h2>Went Well</h2>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => this.CreateNote("Went Well", "")}
              >
                +
              </button>
              {this.state.Notes.map((note, idx) => {
                if (note.type === "Went Well") {
                  return (
                    <Note
                      key={"Went Well" + idx}
                      idx={idx}
                      identifier={note.id}
                      value={note.input}
                      setUserInput={this.setUserInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="col-sm">
              <h2>To Improve</h2>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => this.CreateNote("To Improve", "")}
              >
                +
                <i className="fa fa-search" />
              </button>
              {this.state.Notes.map((note, idx) => {
                if (note.type === "To Improve") {
                  return (
                    <Note
                      key={"To Improve" + idx}
                      idx={idx}
                      identifier={note.id}
                      value={note.input}
                      setUserInput={this.setUserInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="col-sm">
              <h2>Action Items</h2>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => this.CreateNote("Action Items", "")}
              >
                +
              </button>
              {this.state.Notes.map((note, idx) => {
                if (note.type === "Action Items") {
                  return (
                    <Note
                      key={"Action Items" + idx}
                      idx={idx}
                      identifier={note.id}
                      value={note.input}
                      setUserInput={this.setUserInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
