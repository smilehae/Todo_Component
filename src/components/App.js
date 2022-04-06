import Header from "./Header.js";
import TodoList from "./TodoList.js";
import { dummyTodoListData, dummyTodoListDataRude } from "../data.js";
import TodoForm from "./TodoForm.js";
//Rude기 접미사인 더미값은 일부러 예외케이스를 첨가한 값입니다.

export default function App({ $app }) {
  new Header({ $target: $app, text: "To Do List" });
  new TodoForm({
    $target: $app,
    onSubmit: (inputData) => {
      const newTodo = { text: inputData };
      todoList.setState([...todoList.state, newTodo]);
    },
  });
  const todoList = new TodoList({
    $target: $app,
    initialState: dummyTodoListData,
  });
}
