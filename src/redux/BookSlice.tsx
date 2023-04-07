import { createSlice } from '@reduxjs/toolkit';
import { Book, Shelf } from '../common/interfaces/Book.interface';
import { BooksShelfs } from '../common/interfaces/BooksShelfs.interface';

export interface State {
  allBooks: BooksShelfs | null,
  booksForQuery: Book[] | null
}

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    allBooks: null,
    booksForQuery: null
  },
  reducers: {
    setBooks(state: State, action) {

      state.allBooks = action.payload.allBooks;
    },
    searchForBooks(state: State, action) {

      if (Array.isArray(action.payload.booksForQuery) && action.payload.booksForQuery.length) {

        const booksIdsPerIndex: {
          [bookId: string]: number
        } = action.payload.booksForQuery.reduce((a: { [bookId: string]: number }, book: Book, currentIndex: number) =>
          ({ ...a, [book.id]: currentIndex }), {});

        if (state.allBooks) {

          for (const shelf in state.allBooks) {

            const booksInShelf: Book[] = state.allBooks[shelf as Shelf];

            for (const book of booksInShelf) {

              if (typeof booksIdsPerIndex[(book as Book).id] !== 'undefined') {

                action.payload.booksForQuery[booksIdsPerIndex[(book as Book).id]].shelf = book.shelf;
              }
            }
          }
        }
      }

      state.booksForQuery = action.payload.booksForQuery;
    },
    updateShelf(state: State, action: any) {

      const currentShelf: Shelf = action.payload.currentShelf;
      const newShelf: Shelf = action.payload.newShelf;

      if (state.allBooks) {

        if (currentShelf !== 'none' && state.allBooks[currentShelf]) {

          const currentShelfBooks = state.allBooks[currentShelf];
          state.allBooks[currentShelf] = currentShelfBooks.filter((book: Book) => book.id != action.payload.bookId);

          const modifiedBook: Book = currentShelfBooks
            .filter((book: Book) => book.id === action.payload.bookId)
            .map(book => {
              return {
                ...book,
                shelf: newShelf
              }
            })[0];

          if (newShelf !== 'none') {
            state.allBooks[newShelf].push(modifiedBook);
          }
        }
      }

      if (Array.isArray(state.booksForQuery)) {
        state.booksForQuery = state.booksForQuery
          .map(book => {
            if (book.id === action.payload.bookId) {
              if (state.allBooks){
                state.allBooks[currentShelf] = state.allBooks[currentShelf].filter((book: Book) => book.id != action.payload.bookId);
              }
              return {
                ...book,
                shelf: newShelf
              }
            }
            else return book;
          });
      }
    }
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice;

