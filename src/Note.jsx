import React from "react";

function Note(props) {
  return (
    <div
      className={"card mt-1 mb-2 mr-1 ml-1 " + props.color}
      draggable
      onDragStart={e => props.onDragStart(e, props.identifier, props.idx)}
    >
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

export default Note;
