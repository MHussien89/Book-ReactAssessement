import styled from "styled-components";
import Book from '../book/Book';
import { Book as BookInterface } from '../../interfaces/Book.interface';

const BooksResult = styled.ol`
    list-style-type: none;
    padding: 0;
    margin: 0;
  
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    & li {
      padding: 10px 15px;
      text-align: left;
    }
`;

const BooksList = (props: {
  books: BookInterface[]
}) => {

  return (
    <BooksResult>
        {
          (Array.isArray(props.books) && props.books.length) ? (props.books.map((book: BookInterface) => {
            return <Book key={book.id} book={book} />
          })) : (<h1 style={{ color: '#2e7c31' }}> Empty Shelf</h1>)
        }
    </BooksResult>
  );
};

export default BooksList;
