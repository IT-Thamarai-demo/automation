const localMessages = [
  'Keep going. Small steps every day create big results.',
  'Believe in your work and stay consistent.',
  'Today is a good day to make progress.',
  'Focus on one useful thing and finish it well.',
  'Be patient with yourself. Growth takes time.',
  'You are capable of doing hard things.',
  'Start where you are and use what you have.',
  'A calm mind makes better decisions.',
  'Consistency beats intensity when the goal is long term.',
  'Do something today that your future self will thank you for.',
];

function getRandomLocalMessage() {
  const index = Math.floor(Math.random() * localMessages.length);
  return localMessages[index];
}

async function getQuoteFromApi() {
  const response = await fetch('https://api.quotable.io/random', {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Quote API returned ${response.status}`);
  }

  const data = await response.json();

  if (!data.content) {
    throw new Error('Quote API response did not include quote content.');
  }

  return data.author ? `${data.content}\n\n- ${data.author}` : data.content;
}

async function getDailyMessage(useQuotesApi = false) {
  if (!useQuotesApi) {
    return getRandomLocalMessage();
  }

  try {
    return await getQuoteFromApi();
  } catch (error) {
    console.error(`Quote API failed. Using local message instead: ${error.message}`);
    return getRandomLocalMessage();
  }
}

module.exports = {
  getDailyMessage,
  getRandomLocalMessage,
};
