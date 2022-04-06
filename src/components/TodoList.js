/*
  state의 구조
  [{text:해야할 일1, isCompleted:false},{text:해야할 일2, isCompleted:false}]
*/
import { getValidArr, isInObject, isNewCalled } from "../util.js";

export default function TodoList({ $target, initialState = [] }) {
  if (!isNewCalled(new.target, "TodoList")) return;

  const $todo = document.createElement("div");
  $target.appendChild($todo);

  //배열이 아닐 시 빈배열
  this.state = getValidArr(initialState);

  this.setState = (newState) => {
    this.state = getValidArr(newState, this.state);
    this.render();
  };

  this.render = () => {
    //아예 배열이 아닐 경우
    if (!getValidArr(this.state)) {
      console.log("유효한 state가 아닙니다. 현재 상태 :", this.state);
    }

    $todo.innerHTML = `
      <ul>
        ${
          this.state.length === 0
            ? "<li>오늘의 할일을 적어주세요!</li>"
            : this.state
                .map((todo, i) => {
                  //배열이지만 찾고자 하는 요소가 없을 경우
                  if (isInObject("text", todo)) {
                    return `
                    <li>
                      <input type="checkbox" id="todo${i}" ${
                      todo.isCompleted ? "checked" : ""
                    }>
                      <label for="todo${i}">${todo.text}</label>
                    </li>`;
                  }
                })
                .join("")
        }
      </ul>
    `;
  };

  this.render();
}
