import React, { useState, useEffect, useCallback, useRef } from 'react';
import MonthPicker from '../components/MonthManager/MonthPicker/MonthPicker';
import MonthPickerPopup from '../components/MonthReport/MonthPickerPopup/MonthPickerPopup';
import Modal from '../UI/Modal/Modal';
import ReportTable from '../components/MonthReport/ReportTable/ReportTable';
import classes from '../components/MonthReport/Search/Search.module.css';
import research from '../UI/Images/research.png';


const MonthReport = (props) => {

    const monthsList = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const current = monthsList[new Date().getMonth()];

    const [incomeInputs, setIncomeInputs] = useState([]);
    const [expensesInputs, setExpensesInputs] = useState([]);
    const [showMonthModalState, setShowMonthModalState] = useState({ showMonthModal: false });
    const [currentMonth, setCurrentMonth] = useState(current);
    const [totalIncome, setTotalIncome] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState([]);
    const [enteredSearch, setEnteredSearch] = useState('');
    const inputRef = useRef();


    useEffect(() => {
        if (enteredSearch === inputRef.current.value) {
            const searchResults = incomeInputs.filter(incomes =>
                incomes.from.toLowerCase().includes(enteredSearch)
            );
            setIncomeInputs(searchResults)
        }
        if (enteredSearch.length === 0) {
            fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/Incomes.json`)
                .then(response => response.json())
                .then(responseData => {
                    const loadedIncomes = [];
                    for (const key in responseData) {
                        loadedIncomes.push({
                            id: key,
                            from: responseData[key].from,
                            sum: responseData[key].sum
                        });
                    }
                    setIncomeInputs(loadedIncomes);
                });
        };
        if (enteredSearch === inputRef.current.value) {
            const searchResults = expensesInputs.filter(expenses =>
                expenses.from.toLowerCase().includes(enteredSearch)
            );
            setExpensesInputs(searchResults)
        }
        if (enteredSearch.length === 0) {
            fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/Expenses.json`)
                .then(response => response.json())
                .then(responseData => {
                    const loadedExpenses = [];
                    for (const key in responseData) {
                        loadedExpenses.push({
                            id: key,
                            from: responseData[key].from,
                            sum: responseData[key].sum

                        });
                    }
                    setExpensesInputs(loadedExpenses);
                });
        }
    }, [enteredSearch, currentMonth])

    useEffect(() => {
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/TotalIncomes.json`)
            .then(response => response.json())
            .then(responseData => {
                setTotalIncome(responseData.incomeTotalSum);
            });
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/TotalExpenses.json`)
            .then(response => response.json())
            .then(responseData => {
                setTotalExpenses(responseData.expensesTotalSum);
            });
    }, [currentMonth])

    // const filteredIncomesHandler = useCallback(filteredItems => {
    //     setIncomeInputs(filteredItems);
    // }, [setIncomeInputs]);

    // const filteredExpensesHandler = useCallback(filteredItems => {
    //     setExpensesInputs(filteredItems);
    // }, [])

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

    const csvData = arr.concat(incomeInputs.map(({ from, sum }) => ({ from, sum })))
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
            <div className={classes.search}>
                <img src={research} alt="MyImage" className={classes.searchIcon} />
                <input
                    className={classes.searchInput}
                    type="text"
                    placeholder="Search"
                    ref={inputRef}
                    value={enteredSearch}
                    onChange={event => setEnteredSearch(event.target.value)}
                />
            </div>
            <ReportTable
                incomes={incomeInputs}
                expenses={expensesInputs}
                TotalIncomes={totalIncome}
                TotalExpenses={totalExpenses}
                csvData={csvData}
                month={currentMonth}
            />
        </div>
    );
}

export default MonthReport;


