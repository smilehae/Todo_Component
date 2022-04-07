/*
    state상태 : todoList의 값을 받아 isCompleted 수를 계산 + 표시합니다.
    [{id:1,text:해야할 일1, isCompleted:false}]  모든 todoList가 들어있습니다.
*/
import { isNewCalled, getValidArr } from "../util.js";

export default function TodoCount({ $target, initialState }) {
  if (!isNewCalled(new.target, "TodoCount")) return;

  const $counter = document.createElement("div");
  $counter.classList.add("todo-counter");
  $target.appendChild($counter);

  this.state = getValidArr(initialState, []);

  this.setState = (nextState) => {
    this.state = getValidArr(nextState, this.state);
    this.render();
  };

  const calculateGoal = () => {
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
    const { completedCount, completedRate, allCount } = calculateGoal();
    $counter.innerHTML = `
        <span class="complete-count"> ${completedCount}개 완료 / 전체 ${allCount}개</span>
        <span class="complete-rate">달성률 ${completedRate}%</span>
    `;
  };
  this.render();
}
