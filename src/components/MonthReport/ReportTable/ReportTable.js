import React from 'react';
import classes from './ReportTable.module.css';
import { CSVLink } from 'react-csv';

const ReportTable = (props) => {


    return (
        <div className={classes.Report}>
            <section className={classes.ReportList1}>
                <p className={classes.ListTitle}><strong>My Incomes:</strong> </p>
                <div className={classes.Total}>
                    <label><strong>Total:</strong></label>
                    <p className={classes.TotalNum}>{props.TotalIncomes}</p>
                </div>
                <ul className={classes.List}>
                    {props.incomes.map(ig =>
                        (<li className={classes.ListItems} key={ig.id} >
                            <span className={classes.Span}><strong>{ig.from}:  </strong></span>
                            <span className={classes.Span}> {ig.sum}  </span>
                        </li>
                        ))}
                </ul>
            </section>
            <section className={classes.ReportList2}>
                <p className={classes.ListTitle}><strong>My Expenses:</strong> </p>
                <div className={classes.Total}>
                    <label><strong>Total:</strong></label>
                    <p className={classes.TotalNum}>{props.TotalExpenses}</p>
                </div>
                <ul className={classes.List}>
                    {props.expenses.map(ig => (
                        <li className={classes.ListItems} key={ig.id} >
                            <span className={classes.Span}><strong>{ig.from}</strong></span>
                            <span className={classes.Span}> {ig.sum} </span>
                        </li>
                    ))}
                </ul>
            </section>
            <div className={classes.DownLoad}>
                <CSVLink
                    className={classes.DownLoadLink}
                    data={props.csvData}
                    enclosingCharacter={`'`}
                    filename={"MonthReport.csv"}>Export</CSVLink>
            </div>
        </div >
    )
}

export default ReportTable;

