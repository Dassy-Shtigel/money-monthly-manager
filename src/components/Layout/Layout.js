import React, { useContext } from 'react';
import classes from './Layout.module.css';
import chart from '../../UI/Images/chart.png'
import { NavLink } from 'react-router-dom';
import logout from '../../UI/Images/logout.png';

const Layout = (props) => {


    return (
        <>
            <header className={classes.header}>
                <img src={chart} alt="MyImage" className={classes.image} />
                <h1 className={classes.title}>Monthly Money Menegment</h1>
                <div className={classes.tab} >
                    <NavLink to={"/MonthManager" && "/"} exact activeClassName={classes.active}>Month Manager</NavLink>
                </div>
                <div className={classes.tab}>
                    <NavLink to="/MonthlyGraph" activeClassName={classes.active}>Monthly Graph</NavLink>
                </div>
                <div className={classes.tab}>
                    <NavLink to="/MonthReport" activeClassName={classes.active}>Month Report</NavLink>
                </div>
                <div className={[classes.tab, classes.logoutText].join(' ')} >
                    <p to="/logout" exact activeClassName={classes.active}>Logout</p>
                    <img src={logout} alt="MyImage" className={classes.logout} />

                </div>
            </header>
            <main className={classes.content}>
                {props.children}
            </main>
        </>
    )

};

export default Layout;