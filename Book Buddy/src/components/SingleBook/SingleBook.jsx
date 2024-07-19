import { useParams } from "react-router-dom";
import {
  useGetSingleBookQuery,
  useUpdateAvailabilityMutation,
} from "./SingleBookSlice";
import { useEffect, useState } from "react";

export default function SingleBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState([]);
  const { data, isSuccess } = useGetSingleBookQuery(bookId);
  const [updateAvailability] = useUpdateAvailabilityMutation();
  useEffect(() => {
    if (isSuccess && data) {
      const temp = JSON.parse(data);
      setBook(temp.book);
    }
  }, [data, isSuccess]);
  async function checkout() {
    try {
      const { data: updatedBook } = await updateAvailability({
        bookId,
        available: false,
      });
      if (updatedBook) {
        setBook(updatedBook);
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isSuccess && (
        <div key={book.id} className="single">
          <div className="text">
            <h1>Title: {book.title}</h1>
            <h2>Author: {book.author}</h2>
            <h4>Description: {book.description}</h4>
            <p>Availability: {book.available ? "Available" : "Unavailable"}</p>
            {book.available && <button onClick={checkout}>Checkout</button>}
          </div>
          <img src={book.coverimage} alt={book.title} className="bookimg" />
        </div>
      )}
    </>
  );
}