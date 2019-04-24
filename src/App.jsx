import React, { Component } from "react";
import "./App.css";
import Category from "./Category";

class App extends Component {
  state = {
    id: 1,
    Layouttoggle: 0,
    Notes: []
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

  onDragOver = e => e.preventDefault();

  onDragStart = (e, id, idx) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("idx", idx);
  };

  onDrop = (e, cat) => {
    let DummyNotes = [...this.state.Notes];
    let id = parseInt(e.dataTransfer.getData("id"));
    let idx = e.dataTransfer.getData("idx");
    for (let note of DummyNotes) {
      if (note.id === id) {
        note.type = cat;
      }
    }
    DummyNotes.push(DummyNotes[idx]); //This and one line below to render moved card at bottom of destination column
    DummyNotes.splice(idx, 1);
    this.setState({ Notes: DummyNotes });
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
            <Category
              notetype="Went Well"
              color="bg-success"
              Layouttoggle={this.state.Layouttoggle}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              CreateNote={this.CreateNote}
              Notes={this.state.Notes}
              setUserInput={this.setUserInput}
              validateInput={this.validateInput}
              MoveLeft={this.MoveLeft}
              Delete={this.Delete}
              MoveRight={this.MoveRight}
              Thumbsup={this.Thumbsup}
              Thumbsdown={this.Thumbsdown}
              onDragStart={this.onDragStart}
            />
            <Category
              notetype="To Improve"
              color="bg-warning"
              Layouttoggle={this.state.Layouttoggle}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              CreateNote={this.CreateNote}
              Notes={this.state.Notes}
              setUserInput={this.setUserInput}
              validateInput={this.validateInput}
              MoveLeft={this.MoveLeft}
              Delete={this.Delete}
              MoveRight={this.MoveRight}
              Thumbsup={this.Thumbsup}
              Thumbsdown={this.Thumbsdown}
              onDragStart={this.onDragStart}
            />
            <Category
              notetype="Action Items"
              color="bg-danger"
              Layouttoggle={this.state.Layouttoggle}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              CreateNote={this.CreateNote}
              Notes={this.state.Notes}
              setUserInput={this.setUserInput}
              validateInput={this.validateInput}
              MoveLeft={this.MoveLeft}
              Delete={this.Delete}
              MoveRight={this.MoveRight}
              Thumbsup={this.Thumbsup}
              Thumbsdown={this.Thumbsdown}
              onDragStart={this.onDragStart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
