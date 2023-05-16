export const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const json = await response.json();
  return json.token;
};

export const getQuestion = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
};
