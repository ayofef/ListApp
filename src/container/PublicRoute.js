import { Switch, Route, Redirect } from 'react-router-dom';
import AuthComponent from '../components/Auth';

function PublicRoute() {
  return (
    <Switch>
      <Route path="/auth" exact component={AuthComponent} />

      <Redirect to="/auth" />
    </Switch>
  );
}

export default PublicRoute;
