import axios from 'axios';
//update api call
const search = async (query) => {
  const options = {
    headers: { "X-Api-Key": "AIzaSyCS6tdjuxQyushdOyM3QaU36HOHVybL_PI" },
  };
  await axios.get(
    `GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${query}`,
    options
  );
}
export default search;
