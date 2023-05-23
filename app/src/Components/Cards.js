import React from 'react';
import Card from './Card';
import Loader from './Loader';
import ChevronDown from '../icons/chevron-down.svg'
import CheckDarkBlue from '../icons/check-darkblue.svg'

const Cards = props => {
  const [visibleCards, setVisibleCards] = React.useState(Math.min(6, props.people.length));
  const activeClass = visibleCards >= props.people.length ? 'active' : '';

  React.useEffect(() => {
    setVisibleCards(Math.min(6, props.people.length));
  }, [props.people]);

  const handleShowMore = () => {
    const nextVisibleCards = Math.min(visibleCards + 6, props.people.length);
    setVisibleCards(nextVisibleCards);
    props.handleShowMore(nextVisibleCards); // Pass the updated count to the parent component
  };

  return (
    <div className="c-graveyard-overview__posts">
      {props.people.slice(0, visibleCards).map(person => {
        return <Card key={person.person_id} card={person} />;
      })}

      {props.loading ? <Loader /> : null}

      {props.people.length > visibleCards || activeClass === 'active' ? (
        <div className="c-graveyard-overview__toggle-button-container">
          <div className="c-graveyard-overview__progress-bar">
            <div className="c-graveyard-overview__progress" style={{ width: `${(visibleCards / props.people.length) * 100}%` }} />
          </div>

          <div className="c-graveyard-overview__posts-count">
            {visibleCards} van de {props.people.length} personen
          </div>

          <div className={`c-graveyard-overview__toggle-button u-flex ${activeClass}`} onClick={handleShowMore}>
            <div className="c-graveyard-overview__show-more">Laad meer</div>
            <div className="c-graveyard-overview__show-less">Alles geladen</div>
            <svg className={activeClass === 'active' ? 'c-graveyard-item__icon--check c-icon c-graveyard-item__icon c-button__icon' : 'c-icon c-graveyard-item__icon c-button__icon'}>
              <use href={activeClass === 'active' ? CheckDarkBlue + '#check-darkblue' : ChevronDown + '#chevron-down'} />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cards;
