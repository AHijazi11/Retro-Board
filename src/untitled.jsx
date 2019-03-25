let state = [
  { id: 6, Notes: Array(5), userInput: "" },
  { id: 1, type: "Went Well", input: "last homework" },
  { id: 2, type: "To Improve", input: "HTML & CSS" },
  { id: 3, type: "Action Items", input: "Finish project" },
  { id: 4, type: "To Improve", input: "coding speed" },
  { id: 5, type: "Went Well", input: "Sunday" }
];

const setState = obj => {
  state = Object.assign(state, obj);
};

setState({ Ahmad: "Cool", Nina: "Hot" });

const setUserInput = (e, idx) => {
  state[idx].input = e.target.value;
};

setUserInput({ target: { value: "Sunday" } }, 5);

let x = { target: { value: "Test" } };
console.log(x.target.value);

console.log(state);
