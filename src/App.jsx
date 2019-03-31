import React, { Component } from "react";
import "./App.css";
import Note from "./Note";

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
            <div
              className={this.state.Layouttoggle === 1 ? "row mb-5" : "col"}
              onDragOver={this.onDragOver}
              onDrop={e => this.onDrop(e, "Went Well")}
            >
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
                      onDragStart={this.onDragStart}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div
              className={this.state.Layouttoggle === 1 ? "row mb-5" : "col"}
              onDragOver={this.onDragOver}
              onDrop={e => this.onDrop(e, "To Improve")}
            >
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
                      onDragStart={this.onDragStart}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div
              className={this.state.Layouttoggle === 1 ? "row mb-5" : "col"}
              onDragOver={this.onDragOver}
              onDrop={e => this.onDrop(e, "Action Items")}
            >
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
                      onDragStart={this.onDragStart}
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
