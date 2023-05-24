import React, { Component } from 'react';
import ChevronDown from '../icons/chevron-down.svg'
import ChevronUp from '../icons/chevron-up.svg'

class Dropdown extends Component {
  render() {
    const {
      title,
      active,
      target,
      handleClick,
      items,
      currentElements,
      handleChange,
      isLoading,
    } = this.props;

   return (
      <div className="c-graveyard-filter__dropdown">
        <div
          className="c-graveyard-filter__dropdown-title"
          data-target={target}
          onClick={handleClick}
        >
          {title}
          <svg className="c-icon c-graveyard-filter__chevron">
            <use href={active ? `${ChevronUp}#chevron-up` : `${ChevronDown}#chevron-down`} />
          </svg>
        </div>
        <div className={`c-graveyard-filter__container ${active ? 'active' : ''}`}>
          {items.map(item => (
            <div className="c-graveyard-filter__checkbox" key={item}>
              <input
                type="checkbox"
                name={item}
                value="1"
                checked={currentElements.includes(item)}
                id={item}
                className="c-graveyard-filter__input"
                onChange={handleChange}
                data-target={target}
                disabled={isLoading}
              />
              <label className="c-graveyard-filter__label" htmlFor={item}>
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dropdown;