import { useGetBooksQuery } from "./BooksSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, getBooks] = useState([]);
  const { data, isSuccess } = useGetBooksQuery();
  useEffect(() => {
    if (isSuccess && data) {
      const temp = JSON.parse(data);
      getBooks(temp.books);
      setFilteredBooks(temp.books);
    }
  }, [data, isSuccess]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  function handleInputChange(e) {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    const filteredItems = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filteredItems);
  }
  return (
    <>
      <input
        type="text"
        className="search"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search"
      />
        {filteredBooks.map((book) => {
          return (
            <Link key={book.id} to={`/books/${book.id}`}>
                <p>Title: {book.title} </p>
                <p>Author: {book.author}</p>
            </Link>
          );
        })}
    </>
  );
}