import React, { Component } from 'react';
import ChevronDown from '../icons/chevron-down.svg'
import ChevronUp from '../icons/chevron-up.svg'

class Sort extends Component {
  
  render() {
    return (
      <div className={`c-graveyard-sort__dropdown`}>
        <div
          className={`c-graveyard-sort__dropdown-title`}
          data-target={this.props.target}
          onClick={this.props.handleClick}
        >
          {this.props.title}
          <svg className="c-icon c-graveyard-sort__chevron">
            <use href={this.props.active ? ChevronUp + '#chevron-up' : ChevronDown + '#chevron-down'}/>
          </svg>
        </div>
        <div className={`c-graveyard-sort__container ${this.props.active ? 'active' : ''}`}>
            {this.props.items
              .map(item => {
                return (
                  <div className="c-graveyard-sort__checkbox">
                    <input
                      type="checkbox"
                      name={item}
                      value="1"
                      checked={this.props.currentElements.includes(item)}
                      id={item}
                      className="c-graveyard-sort__input"
                      onChange={this.props.handleChange}
                      data-target={this.props.target}
                      disabled={this.props.isLoading}
                    />
                    <label className="c-graveyard-sort__label" for={item}>
                      {item}
                    </label>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}

export default Sort;