import React from 'react';
import FavoursListItem from './FavoursListItem';

const FavoursList = ({ favours }) => (
    <div className = "list-wrapper">
        {favours.map(favour => <FavoursListItem favour={favour} />)}
    </div>
);