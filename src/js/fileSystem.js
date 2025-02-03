/*
    ****INFO****
    FileSystem.js 파일은 MovieTitleFile.txt  파일에 담긴 영화 제목들을 api를 사용해 movieData.json파일로 변환시켜주는 역할입니다.
    init() 함수를 실행하여 movieData.json 파일을 만들 수 있습니다. (movieData.json에 파일 내용이 있다면 init()함수를 호출하지 마세요.)
    buildMovieData 함수와 titleConverter가 핵심입니다. (나머지 함수들은 json작업과 file작업을 위해 모듈화된 함수.)
*/

import { getDataFromApi } from "../js/api";

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

//title이 담긴 Array가 들어오면 fetch주소를 만들어주는 함수
const buildUrl = (titleArr) => {
  const moviesUrl = [];
  titleArr.map((title) => {
    moviesUrl.push(
      `https://www.omdbapi.com/?apikey=524002e8&t=${title}&plot=full`
    );
  });
  return moviesUrl;
};

//movieData.json 을 만들어주는 함수.
const buildMovieData = async (titleArr) => {
  console.log("Start");

  //titleArr는 영화 제목이 담긴 배열.
  //buildUrl => 영화 제목을 fetch할 주소문자열로 만들어주는 함수.
  const promises = buildUrl(titleArr).map(async (movieUrl) => {
    const jsonData = await getDataFromApi(movieUrl);
    return jsonData;
    // 이 시점에서 promises는 promise 객체가 담긴 배열.
  });

  //promise.all을 해줌으로써 resolve()된 데이터가 담김. [{data}, {data}, {data}] 형식으로 최종완성.
  const movieData = await Promise.all(promises);

  //movieData.json 파일을 만들어주는 함수 실행.
  saveJsonFile(movieData);
  console.log("End");
};

//TXT 파일에 담긴 영화 제목들을 Array로 변환시켜주는 함수.
const titleConverter = () => {
  return new Promise((resolve, reject) => {
    //txt파일을 읽어옵니다.
    fs.readFile(TXT_FILE_PATH, "utf8", (err, fileContent) => {
      let movieTitles;
      if (err) {
        console.log("ReadFile Error -> ", err);
        //Error일때 promise reject 함수로 err객체를 넘김.
        reject(err);
      }
      //읽어온 파일을 배열에 넣어줍니다.
      movieTitles = fileContent.toString().split("\r\n");
      //배열의 공백을 제거해 순수한 영화 제목 배열만 남깁니다.
      movieTitles = movieTitles.filter((title) => title !== "");
      //resolve(성공)으로 영화제목 배열을 넘김.
      resolve(movieTitles);
    });
  });
};

//TXT 파일에 담긴 영화 제목들을 Array로 바꾸고 초기 movieData.json 파일을 만들어주는 함수.
const init = () => {
  titleConverter().then((titleArr) => {
    buildMovieData(titleArr);
  });
};

// init();
