import React from 'react';
import MonthManagerBuilder from './Containers/MonthManagerBuilder';
import Layout from './components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import MonthReport from './Containers/MonthReport';
import Login from './Containers/Login';
import MonthlyGraph from './Containers/MonthlyGraph';


const App = props => {

  return (
    <div >
      <Layout>
        <Switch>
          <Route path="/MonthManager"  component={MonthManagerBuilder} />
          <Route path="/MonthlyGraph" component={MonthlyGraph} />
          <Route path="/MonthReport" component={MonthReport} />
          <Route path="/" exact component={Login} />
        </Switch>
      </Layout>
    </div>
  );

}

export default App;
