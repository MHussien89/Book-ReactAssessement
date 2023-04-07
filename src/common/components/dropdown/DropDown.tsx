import React from 'react';
import styled from "styled-components";
import IconSrc from '../../../assets/icons/arrow-drop-down.svg';
import { Shelf } from '../../interfaces/Book.interface';

const DropDownContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: -10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #60ac5d;
  background-image: url(${IconSrc});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  & select {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

const DropDown = (props: {
  currentShelf?: Shelf,
  bookId: string,
  handleCategoryChange?: React.ChangeEventHandler<HTMLSelectElement>
}) => {

  const categories = [{
    text: 'Currently Reading',
    value: 'currentlyReading'
  },
  {
    text: 'Want to Read',
    value: 'wantToRead'
  },
  {
    text: 'Read',
    value: 'read'
  }];

  return (
    <DropDownContainer>
      <select data-testid="category-dropdown" value={props.currentShelf} onChange={props.handleCategoryChange} >
        <option value="none" disabled>
          Move to
        </option>
        {
          categories.map((category) =>
            <option key={category.value} value={category.value}>
              {category.text}
            </option>
          )
        }
      </select>
    </DropDownContainer>
  );
};

export default DropDown;
