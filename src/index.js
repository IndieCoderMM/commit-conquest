import './index.css';
import refreshTable from './modules/table-manager.js';
import { addNewScore } from './modules/api-helper.js';

const refresh = document.querySelector('#refresh-btn');
const form = document.querySelector('#score-form');
const noti = document.querySelector('#noti');
const userInput = form.querySelector('#user-in');
const scoreInput = form.querySelector('#score-in');

const popUpNoti = (message) => {
  noti.innerText = message;
  noti.classList.toggle('hide');
  setTimeout(() => {
    noti.classList.toggle('hide');
  }, 3000);
};

refreshTable();
refresh.addEventListener('click', refreshTable);
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const user = userInput.value.trim();
  const score = scoreInput.value;
  if (!user.length) {
    userInput.value = '';
    popUpNoti('Please enter your username!');
    return;
  }
  const success = await addNewScore(user, score);
  if (success) {
    form.reset();
    refreshTable();
    popUpNoti('New score added successfully!');
  }
});
