/*
  state의 구조
  [{id:1,text:해야할 일1, isCompleted:false},{id:2,text:해야할 일2, isCompleted:false}]
*/
import { getValidArr, isInObject, isNewCalled } from "../util.js";

export default function TodoList({
  $target,
  initialState = [],
  onToggle,
  onRemove,
}) {
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
  const makeListComponent = (todo) => {
    return `
    <li data-id="${todo.id}" class="${todo.isCompleted ? "checked" : ""}">
      <span>${todo.text}</span>
      <button>❌</button>
    </li>`;
  };

  const toggleId = (id) => {
    if (onToggle) {
      onToggle(id);
    }
  };

  const removeId = (id) => {
    if (onRemove) {
      onRemove(id);
    }
  };

  this.render = () => {
    //아예 배열이 아닐 경우
    if (!getValidArr(this.state)) {
      console.log("유효한 state가 아닙니다. 현재 상태 :", this.state);
    }
    //TODO: state의 각 요소가 id와 text, isCompleted를 가지고 있는지 확인=>있는 것만 출력

    $todo.innerHTML = `
      <ul class="todo-list">
        ${
          this.state.length === 0
            ? "<li>오늘의 할일을 적어주세요!</li>"
            : this.state
                .map((todo) => {
                  //배열이지만 찾고자 하는 요소가 없을 경우
                  if (isInObject("text", todo) && isInObject("id", todo)) {
                    return makeListComponent(todo);
                  }
                })
                .join("")
        }
      </ul>
    `;
  };
  $todo.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.matches("li")) {
      const { id } = e.target.dataset;
      toggleId(id);
      return;
    }
    if (e.target.matches("span")) {
      const { id } = e.target.parentNode.dataset;
      toggleId(id);
      return;
    }
    if (e.target.matches("button")) {
      const { id } = e.target.parentNode.dataset;
      removeId(id);
      return;
    }
  });

  this.render();
}
