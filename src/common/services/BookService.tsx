import { Book, Shelf } from "../interfaces/Book.interface";
import { BooksShelfs } from "../interfaces/BooksShelfs.interface";
import { APIS } from "../constants/API_Config";
import { v4 as uuid } from 'uuid';

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": localStorage.token || (localStorage.token = uuid()),
};

export const getAllBooks: () => Promise<BooksShelfs> = async () => {
  const response = await fetch(`${APIS.GET_ALL_BOOKS}`, { headers });
  const data = await response.json();
  const books: Book[] = data.books;
  const booksPerCategory: BooksShelfs = {
    currentlyReading: books.filter(b => b.shelf == Shelf.CURRENTLY_READING),
    wantToRead: books.filter(b => b.shelf == Shelf.WANT_TO_READ),
    read: books.filter(b => b.shelf == Shelf.READ),
    none: books.filter(b => b.shelf == Shelf.NONE)
  };
  return booksPerCategory;
};

export const searchForBooks: (query: string, maxResults: number) => Promise<Book[]> = async (query: string, maxResults: number) => {
  const response = await fetch(`${APIS.SEARCH_FOR_BOOKS}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, maxResults }),
  });
  const data = await response.json();
  const books: Book[] = data.books;

  fetch(`${APIS.SEARCH_FOR_BOOKS}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, maxResults }),
  })

  return books;
}
export const updateShelf = async (bookId: string, shelf: string) => {
  await fetch(`${APIS.UPDATE_BOOK.replace('{bookId}', bookId)}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ shelf }),
  });
}