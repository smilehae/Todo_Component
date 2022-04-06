import { isNewCalled } from "../util.js";

export default function Header({ $target, text = "" }) {
  const $element = document.createElement("h1");
  $target.appendChild($element);

  if (!isNewCalled(new.target)) return;

  this.render = () => {
    $element.textContent = text;
  };

  this.render();
}
