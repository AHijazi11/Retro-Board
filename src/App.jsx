import React, { Component } from "react";
import "./App.css";
import Notes from "./Notes";

function Note(props) {
  return (
    <div className={"card mt-1 mb-2 mr-1 ml-1 " + props.color}>
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
      <div className="Text-center">
        <div className="btn-group" role="group" aria-label="Basic example">
          <i
            className={
              "fa fa-arrow-left float-left btn " +
              (props.Layouttoggle && " Rotate-2")
            }
            onClick={() => {
              props.MoveLeft(props.identifier, props.idx);
            }}
          />
          <i
            className="fa fa-thumbs-up btn"
            onClick={() => props.Thumbsup(props.idx)}
          />
          {props.thumbsupcount}
          <i
            className="fa fa-trash btn"
            onClick={() => props.Delete(props.identifier)}
          />
          <i
            className="fa fa-thumbs-down btn"
            onClick={() => props.Thumbsdown(props.idx)}
          />
          {props.thumbsdowncount}
          <i
            className={
              "fa fa-arrow-right float-right btn " +
              (props.Layouttoggle && " Rotate-2")
            }
            onClick={() => {
              props.MoveRight(props.identifier, props.idx);
            }}
          />
        </div>
      </div>
    </div>
  );
}

class App extends Component {
  state = {
    id: 6,
    Layouttoggle: 0,
    Notes: Notes
  };

  setUserInput = (e, idx) => {
    let DummyNotes = [...this.state.Notes];
    DummyNotes[idx].input = e.target.value;
    this.setState({
      Notes: DummyNotes
    });
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
        {
          id: this.state.id,
          type: type,
          input: input,
          thumbsup: 0,
          thumbsdown: 0
        }
      ],
      id: this.state.id + 1
    });

  MoveLeft = (id, idx) => {
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
    DummyNotes.push(DummyNotes[idx]); //This and one line below to render moved card at bottom of destination column
    DummyNotes.splice(idx, 1);
    this.setState({ Notes: DummyNotes });
  };

  MoveRight = (id, idx) => {
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
    DummyNotes.push(DummyNotes[idx]); //This and one line below to render moved card at bottom of destination column
    DummyNotes.splice(idx, 1);
    this.setState({ Notes: DummyNotes });
  };

  Thumbsup = idx => {
    let DummyNotes = [...this.state.Notes];
    DummyNotes[idx].thumbsup++;
    this.setState({
      Notes: DummyNotes
    });
  };

  Thumbsdown = idx => {
    let DummyNotes = [...this.state.Notes];
    DummyNotes[idx].thumbsdown--;
    this.setState({
      Notes: DummyNotes
    });
  };

  ToggleLayout = () => {
    if (this.state.Layouttoggle === 2) {
      this.setState({ Layouttoggle: 0 });
    } else {
      this.setState({ Layouttoggle: this.state.Layouttoggle + 1 });
    }
  };
  render() {
    return (
      <div>
        <h2 className="text-center text-primary">
          Retro Board
          <button
            type="button"
            className="btn btn-primary float-right"
            onClick={() => {
              this.ToggleLayout();
            }}
          >
            Layout Toggle
          </button>
        </h2>
        <br />
        <div className="text-center">
          <div
            className={
              this.state.Layouttoggle === 1
                ? "col"
                : this.state.Layouttoggle === 2
                ? "col"
                : "row"
            }
          >
            <div className={this.state.Layouttoggle === 1 ? "row mb-5" : "col"}>
              <div
                className={(this.state.Layouttoggle === 1
                  ? " Rotate-1"
                  : ""
                ).toString()}
              >
                <h2>Went Well</h2>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => this.CreateNote("Went Well", "")}
                >
                  +
                </button>
              </div>
              {this.state.Notes.map((note, idx) => {
                if (note.type === "Went Well") {
                  return (
                    <Note
                      key={"Went Well" + idx}
                      idx={idx}
                      identifier={note.id}
                      value={note.input}
                      thumbsupcount={note.thumbsup}
                      thumbsdowncount={note.thumbsdown}
                      setUserInput={this.setUserInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      Thumbsup={this.Thumbsup}
                      Thumbsdown={this.Thumbsdown}
                      Layouttoggle={this.state.Layouttoggle}
                      color={"bg-success"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className={this.state.Layouttoggle === 1 ? "row mb-5" : "col"}>
              <div
                className={(this.state.Layouttoggle === 1
                  ? " Rotate-1"
                  : ""
                ).toString()}
              >
                <h2>To Improve</h2>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => this.CreateNote("To Improve", "")}
                >
                  +
                </button>
              </div>
              {this.state.Notes.map((note, idx) => {
                if (note.type === "To Improve") {
                  return (
                    <Note
                      key={"To Improve" + idx}
                      idx={idx}
                      identifier={note.id}
                      value={note.input}
                      thumbsupcount={note.thumbsup}
                      thumbsdowncount={note.thumbsdown}
                      setUserInput={this.setUserInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      Thumbsup={this.Thumbsup}
                      Thumbsdown={this.Thumbsdown}
                      Layouttoggle={this.state.Layouttoggle}
                      color={"bg-warning"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className={this.state.Layouttoggle === 1 ? "row mb-5" : "col"}>
              <div
                className={(this.state.Layouttoggle === 1
                  ? " Rotate-1"
                  : ""
                ).toString()}
              >
                <h2>Action Items</h2>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => this.CreateNote("Action Items", "")}
                >
                  +
                </button>
              </div>
              {this.state.Notes.map((note, idx) => {
                if (note.type === "Action Items") {
                  return (
                    <Note
                      key={"Action Items" + idx}
                      idx={idx}
                      identifier={note.id}
                      value={note.input}
                      thumbsupcount={note.thumbsup}
                      thumbsdowncount={note.thumbsdown}
                      setUserInput={this.setUserInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      Thumbsup={this.Thumbsup}
                      Thumbsdown={this.Thumbsdown}
                      Layouttoggle={this.state.Layouttoggle}
                      color={"bg-danger"}
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
