/*
  state의 구조
  [{text:해야할 일1},{text:해야할 일2}]
*/
import { getValidArr, isInObject } from "../util.js";

export default function TodoList({ $target, initialState = [] }) {
  const $todo = document.createElement("div");
  $target.appendChild($todo);

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
        ${this.state
          .map((todo) => {
            //배열이지만 찾고자 하는 요소가 없을 경우
            if (isInObject("text", todo)) {
              return `<li>${todo.text}</li>`;
            }
          })
          .join("")}
      </ul>
    `;
  };

  this.render();
}
