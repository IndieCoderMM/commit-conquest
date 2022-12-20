import { getLeaderboard } from './api-helper.js';

const makeRowItem = (data) => {
  const li = document.createElement('li');
  li.classList.add('score-item');
  const username = document.createElement('p');
  username.classList.add('username');
  username.innerText = data.user;
  const score = document.createElement('p');
  score.classList.add('score');
  score.innerText = data.score;
  li.appendChild(username);
  li.appendChild(score);
  return li;
};

export const refreshTable = async () => {
  const scoreContainer = document.querySelector('#score-container');
  const leaderboard = await getLeaderboard();

  scoreContainer.textContent = '';
  leaderboard.forEach((data) => {
    const row = makeRowItem(data);
    scoreContainer.appendChild(row);
  });
};
