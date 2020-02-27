import React, { useState, useEffect } from 'react';
import MonthPicker from '../components/MonthManager/MonthPicker/MonthPicker';
import MonthPickerPopup from '../components/MonthReport/MonthPickerPopup/MonthPickerPopup';
import Modal from '../UI/Modal/Modal';
import ReportTable from '../components/MonthReport/ReportTable/ReportTable';


const MonthReport = (props) => {

    const monthsList = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const current = monthsList[new Date().getMonth()];

    const [incomeInputs, setIncomeInputs] = useState([]);
    const [expensesInputs, setExpensesInputs] = useState([]);
    const [showMonthModalState, setShowMonthModalState] = useState({ showMonthModal: false });
    const [currentMonth, setCurrentMonth] = useState(current);
    const [totalIncome, setTotalIncome] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState([]);


    useEffect(() => {
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/Incomes.json`)
            .then(response => response.json())
            .then(responseData => {
                const loadedIncomes = [];
                for (const key in responseData) {
                    loadedIncomes.push({
                        id: key,
                        from: responseData[key].income.from,
                        sum: responseData[key].income.sum

                    });
                }
                setIncomeInputs(loadedIncomes);
            });
    }, [currentMonth]);

    const loadedIncomes = [];

    useEffect(() => {
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/Expenses.json`)
            .then(response => response.json())
            .then(responseData => {
                const loadedIncomes = [];
                for (const key in responseData) {
                    loadedIncomes.push({
                        id: key,
                        from: responseData[key].expenses.from,
                        sum: responseData[key].expenses.sum

                    });
                }
                setExpensesInputs(loadedIncomes);
            });
    }, [currentMonth]);

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

    const arr = [{ from: '', sum: '' }, { from: 'Incomes:', sum: '' }];

    const data = arr.concat(incomeInputs.map(({ from, sum }) => ({ from, sum })))
        .concat({ from: '', sum: '' }, { from: 'Expenses:', sum: '' })
        .concat(expensesInputs.map(({ from, sum }) => ({ from, sum })));


    return (
        <div>
            <Modal show={showMonthModalState.showMonthModal} modalClosed={RemoveMonthPopupHandler}>
                <MonthPickerPopup
                    clicked={MonthClickedHandler}
                />
            </Modal>
            <MonthPicker clicked={MonthPickerClicked} >{currentMonth}</MonthPicker>
            <ReportTable
                incomes={incomeInputs}
                expenses={expensesInputs}
                TotalIncomes={totalIncome}
                TotalExpenses={totalExpenses}
                csvData={data}
            />
        </div>
    );
}

export default MonthReport;


