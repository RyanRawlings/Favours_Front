import React from 'react';
import ReactDOM from 'react-dom';
import FavoursListItem from './FavoursListItem';
import "./favours.css";

const favourList = [
    {id:"1", favourType: "Coffee", debtorFirstName: "Jane", debtorLastName: "Doe", creditorFirstName: "John", creditorLastName: "Doe"},
    {id:"2", favourType: "Chocolate", debtorFirstName: "Mark", debtorLastName: "Boswell", creditorFirstName: "Michelle", creditorLastName: "May"},
    {id:"3", favourType: "Cupcake", debtorFirstName: "Leo", debtorLastName: "Romeo", creditorFirstName: "John", creditorLastName: "Tarantino"}
];


function App({ favours }) {
    return (
        <div>
                <div>
                    <ul>
                    {favours.map(favour => (
                        <li key={FavoursListItem.toString()}>    
                            <h2>{favour.name}</h2>
                            <p>Owed by : {favour.debtorFirstName}</p>
                            <p>Covered by: {favour.creditorFirstName}</p>
                        </li>
                            ))}
                    </ul>
                </div>
        </div>
    );
}

ReactDOM.render(
    <App favours={favourList} />,
    document.getElementById("root")
);