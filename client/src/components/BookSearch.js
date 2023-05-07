import { useState } from "react";
import axios from "axios";


export default function BookSearch({ onQuery }) {
  const [book, setBook] = useState("");
  console.log(book)
  const handleFormSubmit = async (book) => {
    setBook(book);
    const options = {
      headers: { "X-Api-Key": "AIzaSyCS6tdjuxQyushdOyM3QaU36HOHVybL_PI" },
    };

    try {
      const response =   await axios.get(
        `GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${options}`,
        options
      );
      const { data } = await response;

   
    } catch (error) {
      console.error(error);
    }

  };
  return (
    <>
      <p id="muscle-section-title">my 100</p>
      <div className="dropDownBtns">
        <button onClick={() => handleFormSubmit("abdominals")}
          value="abdominals">Books</button>


        <button onClick={() => handleFormSubmit("abductors")}
          value="abductors">Memories</button>


        <button onClick={() => handleFormSubmit("adductors")}>Songs</button>


        <button onClick={() => handleFormSubmit("biceps")}>Shows</button>


        <button onClick={() => handleFormSubmit("calves")}>Movies</button>


        <button onClick={() => handleFormSubmit("chest")}>???</button>

      </div>
    </>
  );
}

