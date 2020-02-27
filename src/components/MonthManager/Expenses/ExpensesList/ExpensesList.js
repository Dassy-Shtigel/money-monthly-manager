import React from 'react';
import classes from '../../Income/Income.module.css';
import AddForm from '../../Income/AddInputs/AddForm';

const Expenseslist = (props) => {


    return (
        <div className={classes.IncomeSection}>
            <h1><strong>Expenses</strong></h1>
            <AddForm onAddInput={props.onAddInput} />
            <section className={classes.IncomeList}>
                {/* <p className={classes.ListTitle}><strong>My Expenses</strong> </p> */}
                <ul className={classes.AllList}>
                    {props.expenses().map(ig => (
                        <li className={classes.List} key={ig.id} >
                            <span><strong>{ig.from}:</strong></span>
                            <span> {ig.sum} </span>
                        </li>
                    ))}
                </ul>
                <button className={classes.MoreButton} onClick={props.clicked}>{props.isOpen ? "Show Less" : "Show More"}</button>
            </section>
            <div className={classes.Total}>
                <h3><strong>Total: </strong></h3>
                <p className={classes.TotalSum}>{props.expensesSum}</p>
            </div>
        </div>
    )
}

export default Expenseslist;