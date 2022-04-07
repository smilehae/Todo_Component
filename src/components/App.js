import Header from "./Header.js";
import TodoList from "./TodoList.js";
import { dummyTodoListData, dummyTodoListDataRude } from "../data.js";
import TodoForm from "./TodoForm.js";
//Rude기 접미사인 더미값은 일부러 예외케이스를 첨가한 값입니다.
/*
  state구조
  {id}

*/

export default function App({ $app }) {
  this.state = {
    id: 10,
  };

  this.setState = (newState) => {
    this.state = newState;
  };

  new Header({ $target: $app, text: "To Do List" });
  new TodoForm({
    $target: $app,
    onSubmit: (inputData) => {
      const newId = this.state.id;
      this.setState({ id: (this.state.id += 1) });
      const newTodo = { text: inputData, isCompleted: false, id: newId };
      todoList.setState([...todoList.state, newTodo]);
    },
  });
  const todoList = new TodoList({
    $target: $app,
    initialState: dummyTodoListData,
    onToggle: (id) => {
      console.log("toggle", id);
    },
    onRemove: (id) => {
      console.log("remove", id);
    },
  });
}
