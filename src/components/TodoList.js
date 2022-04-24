/*
  state의 구조 : todoList를 받아 렌더링합니다.
  [{id:1,text:해야할 일1, isCompleted:false},{id:2,text:해야할 일2, isCompleted:false}]
*/
import {
  isValidArray,
  isValidProperties,
  isContructor,
} from "../utils/validation.js";

export default function TodoList({
  $target,
  initialState = [],
  onToggle,
  onRemove,
}) {
  if (!isContructor(new.target, "TodoList")) return;

  const $todo = document.createElement("div");
  $todo.classList.add("todo-container");
  $target.appendChild($todo);

  if (isValidArray(initialState)) {
    this.state = initialState;
  } else {
    this.state = [];
  }

  this.setState = (newState) => {
    if (!isValidArray(newState)) return;
    this.state = newState;
    this.render();
  };

  const ListComponent = (todo) => {
    return `
    <li data-id="${todo.id}" class="${todo.isCompleted ? "checked" : ""}">
      <span>${todo.text}</span>
      <button>❌</button>
    </li>`;
  };

  this.render = () => {
    $todo.innerHTML = `
      <ul class="todo-list">
        ${
          this.state.length === 0
            ? "<li>오늘의 할일을 적어주세요!</li>"
            : this.state
                .map((todo) => {
                  if (isValidProperties(todo, [["id", "number"]], "TodoList")) {
                    return ListComponent(todo);
                  }
                })
                .join("")
        }
      </ul>
    `;
  };

  $todo.addEventListener("click", (e) => {
    if (e.target.matches("li") && onToggle) {
      const { id } = e.target.dataset;
      onToggle(id);
      return;
    }

    if (e.target.matches("span") && onToggle) {
      const { id } = e.target.parentNode.dataset;
      onToggle(id);
      return;
    }

    if (e.target.matches("button") && onRemove) {
      const { id } = e.target.parentNode.dataset;
      onRemove(id);
      return;
    }
  });

  this.render();
}
