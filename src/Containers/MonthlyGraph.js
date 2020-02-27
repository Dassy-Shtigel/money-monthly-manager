import React, { useState, useEffect } from 'react';
import Graph from '../components/MonthGraph/Graph';
import MonthPicker from '../components/MonthManager/MonthPicker/MonthPicker';
import MonthPickerPopup from '../components/MonthReport/MonthPickerPopup/MonthPickerPopup';
import Modal from '../UI/Modal/Modal';

const MonthlyGraph = (props) => {

    const monthsList = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const current = monthsList[new Date().getMonth()];

    const [currentMonth, setCurrentMonth] = useState(current);
    const [totalIncome, setTotalIncome] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState([]);
    const [showMonthModalState, setShowMonthModalState] = useState({ showMonthModal: false });

    useEffect(() => {
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/TotalIncomes.json`)
            .then(response => response.json())
            .then(responseData => {
                setTotalIncome(responseData.incomeTotalSum);
            });
    }, [currentMonth])

    useEffect(() => {
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/TotalExpenses.json`)
            .then(response => response.json())
            .then(responseData => {
                setTotalExpenses(responseData.expensesTotalSum);
            });
    }, [currentMonth])


    const MonthPickerClicked = () => {
        setShowMonthModalState({ showMonthModal: true });
    }

    const RemoveMonthPopupHandler = () => {
        setShowMonthModalState({ showMonthModal: false });
    }

    const MonthClickedHandler = (event) => {
        setCurrentMonth(event.target.innerText);
        setShowMonthModalState({ showMonthModal: false });
    }

    return (
        <div>
            <Modal show={showMonthModalState.showMonthModal} modalClosed={RemoveMonthPopupHandler}>
                <MonthPickerPopup
                    clicked={MonthClickedHandler}
                />
            </Modal>
            <MonthPicker clicked={MonthPickerClicked} >{currentMonth}</MonthPicker>
            <Graph
                totalExpenses={totalExpenses}
                totalIncome={totalIncome} />
        </div>
    );
}

export default MonthlyGraph;
