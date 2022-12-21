import { getLeaderboard } from './api-helper.js';

const makeRowItem = (data, index) => {
  const li = document.createElement('li');
  const username = document.createElement('p');
  const score = document.createElement('p');
  username.classList.add('username');
  username.innerText = index < 9 ? `0${index + 1}. ` : `${index + 1}. `;
  username.innerText += index === 0 ? `${data.user}  👑` : data.user;
  score.classList.add('score');
  score.innerText = data.score;
  li.classList.add('score-item');
  li.appendChild(username);
  li.appendChild(score);
  return li;
};

const cleanData = (leaderboard) => {
  // If duplicate users, keep the one with highest score
  const copyData = leaderboard.slice();
  copyData.forEach((item) => {
    const duplicates = leaderboard.filter(
      (a) => a.user.toLowerCase() === item.user.toLowerCase(),
    );
    duplicates.sort((a, b) => b.score - a.score);
    duplicates.forEach((data, index) => {
      if (index > 0) {
        leaderboard.splice(leaderboard.indexOf(data), 1);
      }
    });
  });
  leaderboard.sort((a, b) => b.score - a.score);
};

const refreshTable = async () => {
  const scoreList = document.querySelector('#score-list');
  const totalPlayers = document.querySelector('#p-count');
  const leaderboard = await getLeaderboard();
  cleanData(leaderboard);
  totalPlayers.textContent = leaderboard.length;
  scoreList.textContent = '';
  leaderboard.forEach((data, index) => {
    const row = makeRowItem(data, index);
    scoreList.appendChild(row);
  });
};

export default refreshTable;
