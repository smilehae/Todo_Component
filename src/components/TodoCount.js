import { isContructor, isValidArray } from "../utils/validation.js";

export default function TodoCount({ $target, initialState }) {
  if (!isContructor(new.target, "TodoCount")) return;

  const $counter = document.createElement("div");
  $counter.classList.add("todo-counter");
  $target.appendChild($counter);

  if (isValidArray(initialState)) {
    this.state = initialState;
  } else {
    this.state = [];
  }

  this.setState = (nextState) => {
    if (!isValidArray(nextState)) return;
    this.state = nextState;
    this.render();
  };

  const calculatedGoal = () => {
    const allCount = this.state.length;
    if (allCount === 0) {
      return {
        allCount: 0,
        completedCount: 0,
        completedRate: 0,
      };
    }
    const completedCount = this.state.filter(
      (todo) => todo.isCompleted === true
    ).length;
    const completedRate = Math.round((completedCount / allCount) * 100);
    return {
      allCount,
      completedCount,
      completedRate,
    };
  };

  this.render = () => {
    const { completedCount, completedRate, allCount } = calculatedGoal();
    $counter.innerHTML = `
        <span class="complete-count"> ${completedCount}개 완료 / 전체 ${allCount}개</span>
        <span class="complete-rate">달성률 ${completedRate}%</span>
    `;
  };
  this.render();
}
