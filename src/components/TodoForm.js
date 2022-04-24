import { isContructor, hasBadWord } from "../utils/validation.js";
export default function TodoForm({ $target, onSubmit }) {
  if (!isContructor(new.target, "TodoForm")) return;

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
        const inputVal = $input.value;

        if (onSubmit && inputVal.trim()) {
          console.log(inputVal, hasBadWord(inputVal));
          if (hasBadWord(inputVal)) {
            alert("비속어는 사용 금지입니다.");
            $input.value = "";
            return;
          }
          if (inputVal.length > 50) {
            alert("이렇게 큰 목표는 세부 목표로 쪼개서 넣는 건 어떨까요?");
            return;
          }
          onSubmit(inputVal);
          $input.value = "";
        }
      });
    }
  };

  this.render();
}
