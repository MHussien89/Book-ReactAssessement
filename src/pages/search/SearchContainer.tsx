import { useState, useEffect, useMemo } from 'react';
import { fetchBooks, searchBooks } from '../../redux/BookActions';
import { useSelector, useDispatch } from 'react-redux';
import { bookActions } from '../../redux/BookSlice';
import { BooksShelfs } from '../../common/interfaces/BooksShelfs.interface';
import Search from './Search';
import debounce from 'lodash.debounce';

const SearchContainer = () => {

    const [searching, setSearchingFlag] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    const booksForQuery = useSelector((state: any) => state.books.booksForQuery);
    const allBooks: BooksShelfs = useSelector((state: any) => state.books.allBooks)
    const dispatch = useDispatch();


    const changeFilterValue = (event: any) => {

        setSearchingFlag(true);

        const userInput = event.target.value ? event.target.value.trim().toLowerCase() : '';

        if (searchValue !== userInput) {

            setSearchValue(userInput);

            if (userInput) {

                dispatch(searchBooks(userInput) as any);
            } else {

                dispatch(bookActions.searchForBooks({
                    booksForQuery: null,
                }));
            }
        } else {
            setSearchingFlag(false);
        }
    };

    const debouncedResults = useMemo(() => {
        return debounce(changeFilterValue, 500);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    useEffect(() => {
        if (!allBooks) {
            dispatch(fetchBooks() as any);
        }
    }, [dispatch, allBooks]);

    useEffect(() => {
        setSearchingFlag(false);
    }, [booksForQuery]);

    return <Search isLoading={!allBooks || !searching} changeFilterValue={debouncedResults}
        books={booksForQuery} />
};

export default SearchContainer;
