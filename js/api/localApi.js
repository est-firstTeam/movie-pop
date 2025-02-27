class LocalApi {
  setItem = (key, value) => {
    localStorage.setItem(key, value);
  };
  getItems = async (key) => {
    return localStorage.getItem(key);
  };
  removeItem = (key) => {
    localStorage.removeItem(key);
  };
  removeAll = () => {
    localStorage.clear();
  };
}

export default new LocalApi();
