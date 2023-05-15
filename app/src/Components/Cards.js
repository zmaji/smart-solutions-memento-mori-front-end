import React from 'react';
import Card from './Card';
import Loader from './Loader';

const Cards = props => {
  const [visibleCards, setVisibleCards] = React.useState(6);
  const activeClass = visibleCards >= props.people.length ? 'active' : '';
  
  const handleShowMore = () => {
    setVisibleCards(visibleCards + 6);
  };

  return (
    <div className="c-modules-overview__posts">
      {props.people.slice(0, visibleCards).map(person => {
        return <Card key={person.person_id} card={person} />;
      })}

      {props.loading ? <Loader /> : null}

      {props.people.length > visibleCards ? (
        <div className="c-modules-overview__toggle-button-container">
          <div className="c-modules-overview__progress-bar">
            <div className="c-modules-overview__progress" style={{ width: `${(visibleCards / props.people.length) * 100}%` }} />
          </div>

          <div className="c-modules-overview__posts-count">
            {visibleCards} van de {props.people.length} personen
          </div>

          <div className={`c-modules-overview__toggle-button u-flex ${activeClass}`} onClick={handleShowMore}>
            <div className="c-modules-overview__show-more">Laad meer</div>
            <div className="c-modules-overview__show-less">Alles geladen</div>
            <svg className="c-icon c-modules-overview__icon">
              <use href="#arrow-down" xlinkHref="#arrow-down" />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cards;