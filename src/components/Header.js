import { isNewCalled } from "../utils/validation.js";

export default function Header({ $target, text = "" }) {
  if (!isNewCalled(new.target, "Header")) return;

  const $element = document.createElement("h1");
  $target.appendChild($element);

  this.render = () => {
    $element.textContent = text;
  };

  this.render();
}
