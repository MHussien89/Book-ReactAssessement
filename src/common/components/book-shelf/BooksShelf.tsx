import styled from "styled-components";
import { Book as BookInterface } from '../../interfaces/Book.interface';
import BooksList from '../books-list/BooksList';

const BookShelf = styled.div`
 padding: 0 10px 20px;
 & h2{
  border-bottom: 1px solid #dedede;
 }
`;

const BooksShelf = (props: {
  categoryName: string,
  books: BookInterface[]
}) => {

  return (
    <BookShelf>
      <h2>{props.categoryName}</h2>
      <BooksList books={props.books}></BooksList>
    </BookShelf>
  );
};

export default BooksShelf;
