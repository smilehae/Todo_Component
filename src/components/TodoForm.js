import { isNewCalled } from "../util.js";
export default function TodoForm({ $target, onSubmit }) {
  if (!isNewCalled(new.target, "TodoForm")) return;

  const $form = document.createElement("form");
  $target.appendChild($form);

  let isInit = false;

  this.render = () => {
    $form.innerHTML = `
    <input type="text"/>
    <button>+</button>
    `;
    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault();
        const $input = $form.querySelector("input");
        if (onSubmit) {
          onSubmit($input.value);
        }
        $input.value = "";
      });
    }
  };

  this.render();
}
