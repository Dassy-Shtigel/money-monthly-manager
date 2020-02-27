import React, { useState, useEffect } from 'react';
import MonthPicker from '../../src/components/MonthManager/MonthPicker/MonthPicker';
import Income from '../components/MonthManager/Income/Income';
import ExpensesList from '../components/MonthManager/Expenses/ExpensesList/ExpensesList';
import classes from '../components/MonthManager/Income/Income.module.css';
import MonthPickerPopup from '../components/MonthReport/MonthPickerPopup/MonthPickerPopup';
import Modal from '../UI/Modal/Modal';


const MonthManagerBuilder = () => {

    const monthsList = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const current = monthsList[new Date().getMonth()];

    const [incomeInputs, setIncomeInputs] = useState([]);
    const [expensesInputs, setExpensesInputs] = useState([]);
    const [ToralIncome, setToralIncome] = useState(0);
    const [ToralExpenses, setToralExpenses] = useState(0);
    const [Balance, setBalance] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(current);
    const [balancecolor, setBalanceColor] = useState(false);
    const [showMonthModalState, setShowMonthModalState] = useState({ showMonthModal: false });
    const [isIncomeListOpen, setIsIncomeListOpen] = useState(false);
    const [isExpensesListOpen, setIsExpensesListOpen] = useState(false);
    const [errorState, setErrorState] = useState(false);


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
                setIncomeInputs(loadedIncomes.reverse());
            }).catch(error => {
                setErrorState({ error: true });
            });
    }, [currentMonth]);

    useEffect(() => {
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/Expenses.json`)
            .then(response => response.json())
            .then(responseData => {
                const loadedExpenses = [];
                for (const key in responseData) {
                    loadedExpenses.push({
                        id: key,
                        from: responseData[key].expenses.from,
                        sum: responseData[key].expenses.sum
                    });
                }
                setExpensesInputs(loadedExpenses.reverse());
            }).catch(error => {
                setErrorState({ error: true });
            });
    }, [currentMonth]);

    useEffect(() => {
        let incomeTotalSum = 0;
        incomeTotalSum = incomeInputs.reduce((initialValue, currentValue) => {
            initialValue += parseInt(currentValue.sum)
            return initialValue
        }, 0)
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/TotalIncomes.json`, {
            method: 'PUT',
            body: JSON.stringify({ incomeTotalSum }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setToralIncome(incomeTotalSum)
        }).catch(error => {
            setErrorState({ error: true });
        });
    }, [incomeInputs, currentMonth])


    useEffect(() => {
        let expensesTotalSum = 0;
        expensesTotalSum = expensesInputs.reduce((initialValue, currentValue) => {
            initialValue += parseInt(currentValue.sum)
            return initialValue
        }, 0)
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/TotalExpenses.json`, {
            method: 'PUT',
            body: JSON.stringify({ expensesTotalSum }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setToralExpenses(expensesTotalSum)
        }).catch(error => {
            setErrorState({ error: true });
        });
    }, [expensesInputs, currentMonth])

    useEffect(() => {
        let currentBalance = 0;
        currentBalance = ToralIncome - ToralExpenses
        setBalance(currentBalance);
    }, [ToralIncome, ToralExpenses])


    const addIncomeInputsHandler = income => {
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/Incomes.json`, {
            method: 'POST',
            body: JSON.stringify({ income }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setIncomeInputs(prevIncomes => [
                { id: responseData.name, ...income },
                ...prevIncomes
            ]);
        })
    }

    const addExpensesInputHandler = (expenses) => {
        fetch(`https://my-cool-project-1d8d4.firebaseio.com/${currentMonth}/Expenses.json`, {
            method: 'POST',
            body: JSON.stringify({ expenses }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setExpensesInputs(prevExpenses => [
                { id: responseData.name, ...expenses },
                ...prevExpenses
            ]);
        })
    }

    useEffect(() => {
        if (Balance > 0) {
            setBalanceColor(true)
        } else if (Balance < -1) {
            setBalanceColor(false)
        }

    }, [Balance])

    const RemoveMonthPopupHandler = () => {
        setShowMonthModalState({ showMonthModal: false });
    }

    const MonthClickedHandler = (event) => {
        setCurrentMonth(event.target.innerText);
        setShowMonthModalState({ showMonthModal: false });
        setIsExpensesListOpen(false);
        setIsIncomeListOpen(false);
    }

    const MonthPickerClicked = () => {
        setShowMonthModalState({ showMonthModal: true });
    }


    const clickIncomeMoreLess = () => {
        setIsIncomeListOpen(!isIncomeListOpen)
    }

    const getRenderedIncomes = () => {
        if (isIncomeListOpen) {
            return incomeInputs;
        } else {
            return incomeInputs.slice(0, 2);
        }
    }

    const clickExpensesMoreLess = () => {
        setIsExpensesListOpen(!isExpensesListOpen)
    }

    const getRenderedExpenses = () => {
        if (isExpensesListOpen) {
            return expensesInputs;
        } else {
            return expensesInputs.slice(0, 2);
        }
    }

    let error = errorState ? <p className={classes.Error}>No Connection:(</p> : null;


    return (
        <div>
            <Modal show={showMonthModalState.showMonthModal} modalClosed={RemoveMonthPopupHandler}>
                <MonthPickerPopup
                    clicked={MonthClickedHandler} />
            </Modal>
            <MonthPicker clicked={MonthPickerClicked}>{currentMonth}</MonthPicker>
            <div className={classes.Balance}>
                <p className={classes.BalanceText} >Current Balance: </p>
                <p
                    className={classes.BalanceText}
                    style={{
                        //color: balancecolor ? 'rgb(82, 170, 60, 0.5)' : 'rgb(239, 105, 82)'
                        color: balancecolor ? '#ff9100' : '#ff9100'
                    }}> {Balance}</p>
            </div>
            <section className={classes.Section}>
                <Income
                    onAddInput={addIncomeInputsHandler}
                    incomes={getRenderedIncomes}
                    incomeSum={ToralIncome}
                    isOpen={isIncomeListOpen}
                    clicked={clickIncomeMoreLess} />
                <ExpensesList
                    onAddInput={addExpensesInputHandler}
                    expenses={getRenderedExpenses}
                    expensesSum={ToralExpenses}
                    isOpen={isExpensesListOpen}
                    clicked={clickExpensesMoreLess} />
            </section>
            {error}
        </div >
    );
}

export default MonthManagerBuilder;


