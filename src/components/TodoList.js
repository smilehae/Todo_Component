/*
  state의 구조
  [{id:1,text:해야할 일1, isCompleted:false},{id:2,text:해야할 일2, isCompleted:false}]
*/
import { getValidArr, areInObjectWithType, isNewCalled } from "../util.js";

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
    $todo.innerHTML = `
      <ul class="todo-list">
        ${
          this.state.length === 0
            ? "<li>오늘의 할일을 적어주세요!</li>"
            : this.state
                .map((todo) => {
                  if (
                    areInObjectWithType(
                      todo,
                      [["id", "number"], ["text"]],
                      "TodoList"
                    )
                  ) {
                    return makeListComponent(todo);
                  }
                })
                .join("")
        }
      </ul>
    `;
  };
  $todo.addEventListener("click", (e) => {
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
