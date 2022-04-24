import Header from "./Header.js";
import TodoList from "./TodoList.js";
import TodoForm from "./TodoForm.js";
import TodoCount from "./TodoCount.js";
import { isNewCalled, areInObjectWithType } from "../utils/validation.js";

/*
  state구조 : 모든 데이터를 app에서 관리합니다
  {
    todoId:1,
    todoList:[
      {id:1,text:"sample text",isCompleted:false}
    ]
  }

*/

export default function App({ $app }) {
  if (!isNewCalled(new.target, "App")) return;

  this.state = JSON.parse(localStorage.getItem("state")) || {
    todoId: 1,
    todoList: [],
  };

  this.setState = (newState) => {
    if (
      !areInObjectWithType(
        newState,
        [
          ["todoId", "number"],
          ["todoList", "array"],
        ],
        "App"
      )
    ) {
      return;
    }

    this.state = newState;
    todoListComponent.setState(this.state.todoList);
    todoCountComponent.setState(this.state.todoList);
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  new Header({ $target: $app, text: "To Do List" });
  new TodoForm({
    $target: $app,
    onSubmit: (inputData) => {
      const newId = this.state.todoId;
      const newTodo = { text: inputData, isCompleted: false, id: newId };
      this.setState({
        todoId: (this.state.todoId += 1),
        todoList: [...this.state.todoList, newTodo],
      });
    },
  });
  const todoListComponent = new TodoList({
    $target: $app,
    initialState: this.state.todoList,
    onToggle: (id) => {
      const { todoList } = this.state;
      this.setState({
        ...this.state,
        todoList: todoList.map((todo) => {
          if (parseInt(todo.id) !== parseInt(id)) {
            return todo;
          } else {
            return {
              ...todo,
              isCompleted: todo.isCompleted ? !todo.isCompleted : true,
            };
          }
        }),
      });
    },
    onRemove: (id) => {
      const { todoList } = this.state;
      this.setState({
        ...this.state,
        todoList: todoList.filter((todo) => parseInt(todo.id) !== parseInt(id)),
      });
    },
  });
  const todoCountComponent = new TodoCount({
    $target: $app,
    initialState: this.state.todoList,
  });
}
