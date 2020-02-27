import React from 'react';
import classes from './Income.module.css';
import AddForm from '../Income/AddInputs/AddForm';

const income = (props) => {

    return (
        <div className={classes.IncomeSection}>
            <h2><strong>Incomes</strong></h2>
            <AddForm onAddInput={props.onAddInput} />
            <section className={classes.IncomeList}>
                {/* <p className={classes.ListTitle}><strong>My Incomes</strong> </p> */}
                <ul className={classes.AllList}>
                    {props.incomes().map(ig =>
                        (<li className={classes.List} key={ig.id} >
                            <span><strong>{ig.from}:  </strong></span>
                            <span> {ig.sum}</span>
                        </li>
                        ))}
                </ul>
                <button className={classes.MoreButton} onClick={props.clicked}>{props.isOpen ? "Show Less" : "Show More"}</button>
            </section>
            <div className={classes.Total}>
                <h3>Total:  </h3>
                <p className={classes.TotalSum}>{props.incomeSum}</p>
            </div>
        </div>
    )
};

export default income;