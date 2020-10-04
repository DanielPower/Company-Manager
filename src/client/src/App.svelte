<script>
  import { Router, Route } from "svelte-routing";
  import { Header } from "carbon-components-svelte";
  import { Login, PayPeriod, CreateUser } from "./pages";
  import Manage from "./pages/Manage.svelte";
</script>

<Router>
  <Header company="Company Name" href="/" platformName="Employee Management" />
  <Route path="login">
    <Login />
  </Route>
  <Route path="manage">
    <Manage />
  </Route>
  <Route path="payperiod">
    <PayPeriod />
  </Route>
  <Route path="createuser">
    <CreateUser />
  </Route>
</Router>
