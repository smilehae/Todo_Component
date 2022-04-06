export default function Header({ $target, text }) {
  const $element = document.createElement("h1");
  $target.appendChild($element);

  this.render = () => {
    $element.textContent = text;
  };

  this.render();
}
