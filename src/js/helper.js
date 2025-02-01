export const $ = (selector) => {
  return document.querySelector(selector);
}

// 로딩 애니메이션 로드
export const setLoading = bodymovin.loadAnimation({
  container: $('.loading'), // 필수, 애니메이션 들어가는 곳 
  path: '/src/assets/loading.json', // 필수(url 또는 json파일 다운로드 경로)
  renderer: 'svg', // 필수
  loop: true, // 반복재생
  autoplay: false // 자동재생
});