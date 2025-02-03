import config from "../config/config.js";
const API_URL = `https://omdbapi.com/?apikey=${config.OMDB_API_KEY}`;
const JSON_URL = "/src/data/movieData.json";

export const fetchMoviesById = async (imdbId) => {
  const res = await fetch(`${API_URL}&i=${imdbId}&plot=full`);
  const json = await res.json();
  if (json.Response === "True") {
    return json;
  }
  return json.Error;
};

//API에 Title이 포함된 URL 주소를 던져주면 Json으로 가져오는 함수.
export const getDataFromApi = async (movieUrl) => {
  const res = await fetch(movieUrl);
  const json = await response.json();
  if (json.Response === "True") {
    return json;
  }
  return json.Error;
};
