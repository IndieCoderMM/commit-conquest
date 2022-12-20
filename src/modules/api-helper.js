const GAME_ID = 'X0Ss0oTQ6B2uykE5xaoi';

export const createGame = async () => {
  const respond = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    {
      method: 'POST',
      body: JSON.stringify({
        name: 'Commit Conquest',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
  const data = await respond.json();
  return data.result ? true : false;
};

export const addNewScore = async (user, score) => {
  const respond = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores/`,
    {
      method: 'POST',
      body: JSON.stringify({
        user: user,
        score: score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
  const data = await respond.json();
  return data.result ? true : false;
};

export const getLeaderboard = async () => {
  const respond = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores`
  );
  const data = await respond.json();
  return data.result;
};
