import React from "react";
import Note from "./Note";

function Category(props) {
  return (
    <div
      className={props.Layouttoggle === 1 ? "row mb-5" : "col"}
      onDragOver={props.onDragOver}
      onDrop={e => props.onDrop(e, props.notetype)}
    >
      <div className={(props.Layouttoggle === 1 ? " Rotate-1" : "").toString()}>
        <h2>{props.notetype}</h2>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => props.CreateNote(props.notetype, "")}
        >
          +
        </button>
      </div>
      {props.Notes.map((note, idx) => {
        if (note.type === props.notetype) {
          return (
            <Note
              key={props.notetype + idx}
              idx={idx}
              identifier={note.id}
              value={note.input}
              thumbsupcount={note.thumbsup}
              thumbsdowncount={note.thumbsdown}
              setUserInput={props.setUserInput}
              validateInput={props.validateInput}
              MoveLeft={props.MoveLeft}
              Delete={props.Delete}
              MoveRight={props.MoveRight}
              Thumbsup={props.Thumbsup}
              Thumbsdown={props.Thumbsdown}
              Layouttoggle={props.Layouttoggle}
              color={props.color}
              onDragStart={props.onDragStart}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Category;
