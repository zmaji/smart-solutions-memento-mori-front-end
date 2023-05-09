import React, { Component } from 'react';

class Dropdown extends Component {
  render() {
    return (
      <div className={`c-modules-filter__dropdown`}>
        <div
          className={`c-modules-filter__dropdown-title ${this.props.active ? 'active' : ''}`}
          data-target={this.props.target}
          onClick={this.props.handleClick}
        >
          {this.props.title}
          <svg className="c-icon c-modules-filter__chevron">
            <use href="#chevron-down" xlinkHref="#chevron-down" />
          </svg>
        </div>
        <div className={`c-modules-filter__container ${this.props.active ? 'active' : ''}`}>
        <div className="c-modules-filter__reset-title">
          Clear filters
          </div>
            {this.props.items
              .map(item => {
                return (
                  <div className="c-modules-filter__checkbox">
                    <input
                      type="checkbox"
                      name={item}
                      value="1"
                      checked={this.props.currentElements.includes(item)}
                      id={item}
                      className="c-modules-filter__input"
                      onChange={this.props.handleChange}
                      data-target={this.props.target}
                      disabled={this.props.isLoading}
                    />
                    <label className="c-modules-filter__label" for={item}>
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

export default Dropdown;