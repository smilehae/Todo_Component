/*
  state의 구조
  [{id:1,text:해야할 일1, isCompleted:false},{id:2,text:해야할 일2, isCompleted:false}]
*/
import { getValidArr, isInObject, isNewCalled } from "../util.js";

export default function TodoList({ $target, initialState = [], onToggled }) {
  if (!isNewCalled(new.target, "TodoList")) return;

  const $todo = document.createElement("div");
  $target.appendChild($todo);

  //배열이 아닐 시 빈배열
  this.state = getValidArr(initialState);

  //유효하지 않을 시 이전 값
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
      <ul class="todo-list">
        ${
          this.state.length === 0
            ? "<li>오늘의 할일을 적어주세요!</li>"
            : this.state
                .map((todo) => {
                  //배열이지만 찾고자 하는 요소가 없을 경우
                  if (isInObject("text", todo) && isInObject("id", todo)) {
                    return `
                    <li data-id="${todo.id}" class="${
                      todo.isCompleted ? "checked" : ""
                    }">
                      ${todo.text}
                    </li>`;
                  }
                })
                .join("")
        }
      </ul>
    `;
    const $lists = document.querySelectorAll(".todo-list li");
    $lists.forEach((li) => {
      li.addEventListener("click", (e) => {
        const { id } = e.target.dataset;
        const newState = this.state.map((todo) => {
          if (parseInt(todo.id) === parseInt(id)) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted,
            };
          }
          return todo;
        });
        this.setState(newState);
        if (onToggled) {
          onToggled(id);
        }
      });
    });
  };

  this.render();
}
