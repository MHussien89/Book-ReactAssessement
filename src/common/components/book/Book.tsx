import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { updateBook } from '../../../redux/BookActions';
import { Book as BookInterface, Shelf } from '../../interfaces/Book.interface';
import DropDown from '../dropdown/DropDown';

const BookContainer = styled.div`
width: 140px;
& div:nth-child(1) {
  position: relative;
  height: 200px;
  display: flex;
  align-items: flex-end;
  & div{
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}
& div:nth-child(2) {
  margin-top: 10px;
  font-size: 0.8em;
}
& div:nth-child(3) {
  color: #999;
  font-size: 0.8em;
}

`
const Book = (props: {
  book: BookInterface
}) => {
  const dispatch = useDispatch();

  const handleCategoryChange = (event: any) => {
    const newShelf: Shelf = event.target.value;
    const currentShelf: Shelf = props.book.shelf;
    dispatch(updateBook(props.book.id, newShelf, currentShelf) as any);
  };
  return (
    <li>
      <BookContainer>
        <div>
          <div style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url(${props.book['imageLinks']['thumbnail']})`,
          }}></div>
          <DropDown bookId={props.book.id} currentShelf={props.book.shelf} handleCategoryChange={handleCategoryChange} />
        </div>
        <div>{props.book['title']}</div>
        <div>{props.book['authors']?.join(',')}</div>
      </BookContainer>
    </li>
  );
};

export default Book;
