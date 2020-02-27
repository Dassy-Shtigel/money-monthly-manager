import React from 'react';
import classes from './Layout.module.css';
import chart from '../../UI/Images/chart.png'
import { NavLink } from 'react-router-dom';

const layout = (props) => (
    <>
        <header className={classes.Header}>
            <img src={chart} alt="MyImage" className={classes.Image} />
            <h1 className={classes.Title}>Monthly Money Menegment</h1>
            <div className={classes.Tab} >
                <NavLink to="/MonthManager"  activeClassName={classes.active}>Month Manager</NavLink>
            </div>
            <div className={classes.Tab}>
                <NavLink to="/MonthlyGraph" activeClassName={classes.active}>Monthly Graph</NavLink>
            </div>
            <div className={classes.Tab}>
                <NavLink to="/MonthReport" activeClassName={classes.active}>Month Report</NavLink>
            </div>
            <div className={classes.Tab} >
                <NavLink to="/" exact activeClassName={classes.active}>Login</NavLink>
            </div>
        </header>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
);

export default layout;