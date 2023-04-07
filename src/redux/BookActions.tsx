import { bookActions } from './BookSlice';
import { getAllBooks, searchForBooks, updateShelf } from '../common/services/BookService';

export const fetchBooks = () => {
  return async (dispatch: any) => {
    const booksPerCategory = await getAllBooks();
    dispatch(
      bookActions.setBooks({
        allBooks: booksPerCategory || [],
      }));
  };
};

export const searchBooks = (query: string) => {

  return async (dispatch: any) => {
    const booksForQuery = await searchForBooks(query, 10);
    dispatch(
      bookActions.searchForBooks({
        booksForQuery: booksForQuery || [],
      }));
  };
};

export const updateBook = (bookId: string, newShelf: string, currentShelf: string) => {
  return async (dispatch: any) => {
    await updateShelf(bookId, newShelf);
    dispatch(
      bookActions.updateShelf({
        bookId: bookId,
        newShelf: newShelf,
        currentShelf: currentShelf
      } as any)
    );
  };
};