import React from 'react';

const Post = props => {
  const { card } = props;

  return (
    <a href="" className={`c-modules-overview__post c-modules-item`}>
      {/* href={card.values.url} */}
      <div className="c-modules-item__image-container u-image u-image--square">
        {/* <img
          src={card.values.image.url}
          alt=""
          class="c-modules-item__image u-image__background"
          loading="lazy"
        /> */}
      </div>
      <div className="c-modules-item__content-container u-flex u-flex-center u-flex-v-center">
        <h2 className="c-modules-item__title">{card.grave_id}</h2>
        <h2 className="c-modules-item__title">{card.voornamen}</h2>
        {card.roepnaam && card.roepnaam !== card.voornamen && (
          <h2 className="c-modules-item__description">({card.roepnaam})</h2>
        )}
        <div className="c-modules-item__description">{card.geboorteplaats}</div>
        <div className="c-modules-item__button c-button c-button--tertiary-white">
          Bekijk meer
          <svg className="c-icon c-modules-item__icon c-button__icon c-button__icon--move-right">
            <use href="#chevron-right" xlinkHref="#chevron-right"/>
          </svg>
        </div>
      </div>
    </a>
  );
};

export default Post;
