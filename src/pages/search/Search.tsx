import { FC } from 'react';
import { Book as BookInterface } from '../../common/interfaces/Book.interface';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../common/components/spinner/Spinner';
import React from 'react';
import BooksList from '../../common/components/books-list/BooksList';

import SearchBar from './SearchBar';
import styled from "styled-components";

const SearchResult = styled.div`
  padding: 80px 10px 20px;
`

const Search: FC<{
  isLoading: boolean,
  changeFilterValue: React.ChangeEventHandler<HTMLInputElement>;
  books: BookInterface[] | null
}> = (props: {
  isLoading: boolean,
  changeFilterValue: React.ChangeEventHandler<HTMLInputElement>;
  books: BookInterface[] | null
}) => {

    const navigate = useNavigate();

    const goToOverview = () => navigate('/');

    return (
      <>
        <div >
          <SearchBar>
            <a
              onClick={goToOverview}
              href="/#"
            >
              Close
            </a>
            <div>
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={props.changeFilterValue}
              />
            </div>
          </SearchBar>

          <div id="search-testing-area" >
            {
              props.isLoading ?
                <SearchResult>
                  {
                    props.books && props.books.length > 0 && <BooksList books={props.books}></BooksList>
                  }
                </SearchResult> : <Spinner />
            }
          </div>
        </div>
      </>
    );
  };

export default Search;
