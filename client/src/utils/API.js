import axios from 'axios';
//update api call
const search = async (query) => {
  const options = {
    headers: { "X-Api-Key": "" },
  };
  await axios.get(
    `${query}`,
    options
  );
}
export default search;
