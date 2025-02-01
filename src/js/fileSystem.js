const fs = require("fs");
const path = require("path");
const JSON_FILE_PATH = path.join(__dirname, "data", "movieData.json");
const TXT_FILE_PATH = path.join(__dirname, "data", "movieTitleFile.txt");

//movieData.json파일을 읽어오는 함수.
const readJsonFile = (cb) => {
  fs.readFile(JSON_FILE_PATH, "utf8", (err, fileContent) => {
    if (err) {
      console.log("ReadFile Error -> ", err);
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

//movieData.json파일로 저장해주는 함수
const saveJsonFile = (fetchedData) => {
  readJsonFile((movies) => {
    movies.push(...fetchedData);
    fs.writeFile(JSON_FILE_PATH, JSON.stringify(movies), (err) => {
      if (err) console.log("WriteFile Error -> ", err);
    });
  });
};

//title이 담긴 Array가 들어오면 fetch주소를 만들어주는 핫무
const buildUrl = (titleArr) => {
  const moviesUrl = [];
  titleArr.map((title) => {
    moviesUrl.push(
      `https://www.omdbapi.com/?apikey=524002e8&t=${title}&plot=full`
    );
  });
  return moviesUrl;
};

//API에 Title이 포함된 URL 주소를 던져주면 Json으로 가져오는 함수.
const getDataFromApi = async (movieUrl) => {
  const response = await fetch(movieUrl);
  const jsonData = await response.json();
  return jsonData;
};

//movieData.json 을 만들어주는 함수.
const buildMovieData = async (titleArr) => {
  console.log("Start");

  const promises = buildUrl(titleArr).map(async (movieUrl) => {
    const jsonData = await getDataFromApi(movieUrl);
    return jsonData;
  });

  const movieData = await Promise.all(promises);

  saveJsonFile(movieData);
  console.log("End");
};

//TXT 파일에 담긴 영화 제목들을 Array로 변환시켜주는 함수.
const titleConverter = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(TXT_FILE_PATH, "utf8", (err, fileContent) => {
      let movieTitles;
      if (err) {
        console.log("ReadFile Error -> ", err);
        reject(err);
      }
      //한줄씩 Read 후 빈 문자열 제거
      movieTitles = fileContent.toString().split("\r\n");
      movieTitles = movieTitles.filter((title) => title !== "");
      resolve(movieTitles);
    });
  });
};

//TXT 파일에 담긴 영화 제목들을 Array로 바꾸고 초기 movieData.json 파일을 만들어주는 함수.
const init = () => {
  titleConverter().then((titleArr) => {
    buildMovieData(titleArr);
    // console.log(titleArr);
  });
};

// init();
