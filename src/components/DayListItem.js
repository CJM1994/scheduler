import React from "react";
import classNames from "classnames";
import './DayListItem.scss';

export default function DayListItem(props) {

  const { setDay, name, spots, selected } = props;

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots';
    } else if (spots === 1) {
      return '1 spot';
    } else {
      return `${spots} spots`
    };
  };

  return (
    <li data-testid='day' className={dayClass} onClick={() => { setDay(name) }}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{formatSpots(spots)} remaining</h3>
    </li>
  );

};