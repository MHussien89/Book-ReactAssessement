import { BooksShelfs } from '../../common/interfaces/BooksShelfs.interface';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { bookActions, State } from '../../redux/BookSlice';
import { fetchBooks } from '../../redux/BookActions';
import DashBoard from './DashBoard';
import React from 'react';
const DashBoardContainer = () => {

  const dispatch = useDispatch();

  const allBooks: BooksShelfs = useSelector((state: any) => state.books.allBooks);

  useEffect(() => {
    dispatch(bookActions.searchForBooks({
      booksForQuery: null,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!allBooks) {
      dispatch(fetchBooks() as any);
    }
  }, [dispatch, allBooks]);

  return (
      <DashBoard booksPerCategory={allBooks} />
  );
};

export default DashBoardContainer;
