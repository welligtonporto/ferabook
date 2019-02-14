const baseUrl = 'https://www.googleapis.com/books/v1';
const userId = '108201212081373300286';
const idBookShelves = '1001';
// const googleKey = 'AIzaSyCCLQf-Zw7f7kGzBXZfLAvg38zpd7GyUvk';

const getMainProducts = () => {
  const url = `${baseUrl}/users/${userId}/bookshelves/${idBookShelves}/volumes?fields=items(id,volumeInfo/title,volumeInfo/imageLinks/thumbnail,saleInfo/listPrice/amount)&country=us&maxResults=12`;
  return fetch(url)
    .then(response => response.json());
};

export { getMainProducts };