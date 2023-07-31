import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setContactFilter } from 'redux/store';


export const Filter = () => {
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch();
  const handleFilterChange = (event) => {
    dispatch(setContactFilter(event.target.value))
  }
  return (
    <div>
      <label htmlFor="filterInput" >
        Find filter by name
      </label>
      <input type="text" value={filter} id="filterInput" onChange={handleFilterChange} />
    </div>
  );
};
