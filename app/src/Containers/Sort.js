import React from 'react';
import ChevronDown from '../icons/chevron-down.svg';
import ChevronUp from '../icons/chevron-up.svg';

const Sort = ({
  title,
  active,
  target,
  handleClick,
  items,
  currentElements,
  handleChange,
  isLoading,
}) => {
  return (
    <div className="c-graveyard-sort__dropdown">
      <div className="c-graveyard-sort__dropdown-title" data-target={target} onClick={handleClick}>
        {title}
        <svg className="c-icon c-graveyard-sort__chevron">
          <use href={active ? `${ChevronUp}#chevron-up` : `${ChevronDown}#chevron-down`} />
        </svg>
      </div>
      <div className={`c-graveyard-sort__container ${active ? 'active' : ''}`}>
        {items.map((item) => (
          <div className="c-graveyard-sort__checkbox" key={item}>
            <input
              type="checkbox"
              name={item}
              value="1"
              checked={currentElements.includes(item)}
              id={item}
              className="c-graveyard-sort__input"
              onChange={handleChange}
              data-target={target}
              disabled={isLoading}
            />
            <label className="c-graveyard-sort__label" htmlFor={item}>
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sort;
