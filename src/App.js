import React, { useContext } from 'react';
import MonthManagerBuilder from './Containers/MonthManagerBuilder';
import Layout from './components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import MonthReport from './Containers/MonthReport';
import Login from './Containers/Login';
import MonthlyGraph from './Containers/MonthlyGraph';
import { AuthContext } from './contex/auth-contex';


const App = props => {

  const authContext = useContext(AuthContext);

  let content = <Login />;
  if (authContext.isAuth) {
    content = <div >
      <Layout>
        <Switch>
          <Route path={"/MonthManager" && "/"} exact component={MonthManagerBuilder} />
          <Route path="/MonthlyGraph" component={MonthlyGraph} />
          <Route path="/MonthReport" component={MonthReport} />
          {/* <Route path="/" exact component={Login} /> */}
        </Switch>
      </Layout>
    </div>;
  }
  return content;
}

export default App;
