const API_URL = 'https://omdbapi.com/?apikey=524002e8';

export const fetchMoviesById = async(imdbId) => {
  const res = await fetch(`${API_URL}&i=${imdbId}&plot=full`);
  const json = await res.json();
  if (json.Response === 'True') {
    return json;
  }
  return json.Error;
}
