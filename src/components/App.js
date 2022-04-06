import Header from "./Header.js";
import TodoList from "./TodoList.js";
import { dummyTodoListData, dummyTodoListDataRude } from "../data.js";
//Rude기 접미사인 더미값은 일부러 예외케이스를 첨가한 값입니다.

export default function App({ $app }) {
  new Header({ $target: $app, text: "오늘의 할 일!" });
  new TodoList({ $target: $app, initialState: dummyTodoListDataRude });
}
