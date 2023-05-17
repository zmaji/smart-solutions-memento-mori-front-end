import React from 'react';

const SearchFilter = props => {
  function handleSearch(e) {
    props.onSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <div className={`c-graveyard-search-filter`} onClick={props.handleClickOutside}>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder='Zoeken'
          value={props.searchText}
          onChange={handleSearch}
          className="c-graveyard-search-filter__search-field"
        />
        <input
          type="submit"
          value=""
          disabled={props.postsLoading ? true : false}
          className="c-graveyard-search-filter__submit"
        />
      </form>
    </div>
  );
};

export default SearchFilter;