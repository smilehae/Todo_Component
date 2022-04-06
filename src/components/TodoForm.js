import { isNewCalled } from "../util.js";
export default function TodoForm({ $target, onSubmit }) {
  if (!isNewCalled(new.target, "TodoForm")) return;

  const $form = document.createElement("form");
  $form.classList.add("add-form");
  $target.appendChild($form);

  let isInit = false;

  this.render = () => {
    $form.innerHTML = `
    <input type="text" placeholder="할 일을 입력하세요."/>
    `;
    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault();
        const $input = $form.querySelector("input");
        if (onSubmit && $input.value.trim()) {
          onSubmit($input.value);
        }
        $input.value = "";
      });
    }
  };

  this.render();
}
