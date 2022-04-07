import Header from "./Header.js";
import TodoList from "./TodoList.js";
import { dummyTodoListData, dummyTodoListDataRude } from "../data.js";
import TodoForm from "./TodoForm.js";
import TodoCount from "./TodoCount.js";
import { isNewCalled, areInObject, areInObjectWithType } from "../util.js";
//Rude기 접미사인 더미값은 일부러 예외케이스를 첨가한 값입니다.
/*
  state구조
  {
    id:1,
    todoList:[
      {id:1,text:"sample text",isCompleted:false}
    ]
  }

*/

export default function App({ $app }) {
  if (!isNewCalled(new.target, "App")) return;

  this.state = {
    id: 10,
    todoList: dummyTodoListData,
  };

  this.setState = (newState) => {
    // TODO: newState validation

    if (
      !areInObjectWithType(newState, [["id"], ["todoList", "array"]], "App")
    ) {
      return;
    }

    this.state = newState;
    todoListComponent.setState(this.state.todoList);
    todoCountComponent.setState(this.state.todoList);
  };

  new Header({ $target: $app, text: "To Do List" });
  new TodoForm({
    $target: $app,
    onSubmit: (inputData) => {
      const newId = this.state.id;
      const newTodo = { text: inputData, isCompleted: false, id: newId };
      this.setState({
        id: (this.state.id += 1),
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
          if (parseInt(todo.id) === parseInt(id)) {
            return {
              ...todo,
              isCompleted: todo.isCompleted ? !todo.isCompleted : true,
            };
          } else {
            return todo;
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
