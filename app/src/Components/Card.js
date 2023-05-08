import React from 'react';
import ChevronRight from '../icons/chevron-right.svg'

const Post = props => {
  const { card } = props;

  return (
    <div className={`c-modules-overview__post c-modules-item`}>
      <div className="c-modules-item__content-container">
        <h2 className="c-modules-item__title">{card.grave_id}</h2>
        <h2 className="c-modules-item__title">{card.voornamen}</h2>
        {card.roepnaam && card.roepnaam !== card.voornamen && (
          <h2 className="c-modules-item__description">({card.roepnaam})</h2>
        )}
        <div className="c-modules-item__description">{card.geboorteplaats}</div>
        <div className="c-modules-item__button c-button c-button--tertiary-white">
          Bekijk meer
          <svg className="c-icon c-modules-item__icon c-button__icon">
            <use href={ChevronRight + '#chevron-right'}/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Post;
