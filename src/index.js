import './index.css';
import { refreshTable } from './modules/table-manager.js';
import { addNewScore } from './modules/api-helper.js';

const refresh = document.querySelector('#refresh-btn');
const form = document.querySelector('#score-form');
const noti = document.querySelector('#noti');

refreshTable();
refresh.addEventListener('click', refreshTable);
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const user = form.querySelector('#user-in').value;
  const score = form.querySelector('#score-in').value;
  const success = await addNewScore(user, score);
  if (success) {
    noti.textContent = 'New score added successfully!';
    form.reset();
    refreshTable();
    setTimeout(() => {
      noti.textContent = '';
    }, 3000);
  } else {
    noti.textContent = 'Error adding new score!';
    refreshTable();
    setTimeout(() => {
      noti.textContent = '';
    }, 3000);
  }
});
