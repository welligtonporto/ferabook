const baseUrl = 'https://www.googleapis.com/books/v1';
const userId = '108201212081373300286';

const getMainProducts = () => {
  const url = `${baseUrl}/users/${userId}/bookshelves/1001/volumes?fields=items(id,volumeInfo/title,volumeInfo/imageLinks/thumbnail,saleInfo/listPrice/amount)&country=us&maxResults=12`;
  return fetch(url)
    .then(response => response.json());
};

export { getMainProducts };