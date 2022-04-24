import { isContructor } from "../utils/validation.js";

export default function Header({ $target, text = "" }) {
  if (!isContructor(new.target, "Header")) return;

  const $element = document.createElement("h1");
  $target.appendChild($element);

  this.render = () => {
    $element.textContent = text;
  };

  this.render();
}
