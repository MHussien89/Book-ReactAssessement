import { BooksShelfs } from '../../common/interfaces/BooksShelfs.interface';
import BooksShelf from '../../common/components/book-shelf/BooksShelf';
import Spinner from '../../common/components/spinner/Spinner';
import { Link } from "react-router-dom";
import styled from "styled-components";

const BooksTitle = styled.div`
  padding: 10px 0;
  background: #2e7c31;
  text-align: center;
& h1 {
  font-weight: 400;
  margin: 0;
  color: white;
}
`;
const OverviewLink = styled(Link)`
  color: white;
`;
const SearchLink = styled(Link)`
  margin-left: 25px;
  color: white;
`;
const BooksContent = styled.div`
padding: 0 0 80px;
flex: 1;
`;

const DashBoard = (props: {
  booksPerCategory: BooksShelfs,
}) => {
    const {booksPerCategory} = props;
    return (
      <>
        <BooksTitle>
          <h1>MyReads</h1>
          <OverviewLink to="/">Overview Page</OverviewLink>
          <SearchLink to="/search">Search Page</SearchLink>
        </BooksTitle>
        {
          props.booksPerCategory ?
            <BooksContent>
              <BooksShelf categoryName="Currently Reading" books={booksPerCategory['currentlyReading']} />
              <BooksShelf categoryName="Want To Read" books={booksPerCategory['wantToRead']} />
              <BooksShelf categoryName="Read" books={booksPerCategory['read']} />
            </BooksContent> : <Spinner />
        }

      </>
    );
  };

export default DashBoard;
