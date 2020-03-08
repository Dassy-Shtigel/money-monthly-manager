import React from 'react';
import classes from './ReportTable.module.css';
import { CSVLink } from 'react-csv';

const ReportTable = (props) => {


    return (
        <div className={classes.report}>
            <section className={classes.reportList1}>
                <p className={classes.listTitle}><strong>My Incomes:</strong> </p>
                <div className={classes.total}>
                    <label><strong>Total:</strong></label>
                    <p className={classes.totalNum}>{props.TotalIncomes}</p>
                </div>
                <ul className={classes.list}>
                    {props.incomes.map(ig =>
                        (<li className={classes.listItems} key={ig.id} >
                            <span className={classes.span}><strong>{ig.from}:  </strong></span>
                            <span className={classes.span}> {ig.sum}  </span>
                        </li>
                        ))}
                </ul>
            </section>
            <section className={classes.reportList2}>
                <p className={classes.listTitle}><strong>My Expenses:</strong> </p>
                <div className={classes.total}>
                    <label><strong>Total:</strong></label>
                    <p className={classes.totalNum}>{props.TotalExpenses}</p>
                </div>
                <ul className={classes.list}>
                    {props.expenses.map(ig => (
                        <li className={classes.listItems} key={ig.id} >
                            <span className={classes.span}><strong>{ig.from}</strong></span>
                            <span className={classes.span}> {ig.sum} </span>
                        </li>
                    ))}
                </ul>
            </section>
            <div className={classes.downLoad}>
                <CSVLink
                    className={classes.downLoadLink}
                    data={props.csvData}
                    enclosingCharacter={`'`}
                    filename={props.month + "Report.csv"}>Export</CSVLink>
            </div>
        </div >
    )
}

export default ReportTable;

