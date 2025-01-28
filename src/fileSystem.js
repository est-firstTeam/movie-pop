const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data", "movieData.json");
const movieTitles = ["batman", "interstella"];

const readFile = (cb) => {
  fs.readFile(filePath, "utf8", (err, fileContent) => {
    if (err) {
      console.log("ReadFile Error -> ", err);
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

const saveFile = (fetchedData) => {
  readFile((movies) => {
    movies.push(...fetchedData);
    fs.writeFile(filePath, JSON.stringify(movies), (err) => {
      if (err) console.log("WriteFile Error -> ", err);
    });
  });
};

const buildUrl = (titles) => {
  const moviesUrl = [];
  titles.map((title) => {
    moviesUrl.push(
      `https://www.omdbapi.com/?apikey=524002e8&t=${title}&plot=full`
    );
  });
  return moviesUrl;
};

const getDataFromApi = async (movieUrl) => {
  const response = await fetch(movieUrl);
  const jsonData = await response.json();
  return jsonData;
};

const buildMovieData = async () => {
  console.log("Start");

  const promises = buildUrl(movieTitles).map(async (movieUrl) => {
    const jsonData = await getDataFromApi(movieUrl);
    return jsonData;
  });

  const movieData = await Promise.all(promises);

  saveFile(movieData);
  console.log("End");
};
