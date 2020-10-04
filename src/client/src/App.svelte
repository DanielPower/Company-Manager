<script>
  import { Router, Route } from "svelte-routing";
  import { Header } from "carbon-components-svelte";
  import axios from "axios";
  import { Login, PayPeriod, CreateUser } from "./pages";
  import Manage from "./pages/Manage.svelte";
  import { user } from "./stores";

  user.subscribe((userValue) => {
    console.log(userValue);
    if (!userValue) {
      axios
        .get("/api/employees/current")
        .then((userResponse) => {
          console.log(userResponse);
          user.set(userResponse.data);
        })
        .catch(() => {
          if (window.location.pathname !== "/login") {
            window.location.pathname = "/login";
          }
        });
    } else {
      if (["/", "/login"].includes(window.location.pathname)) {
        if (userValue.isAdmin) {
          if (window.location.pathname !== "/manage") {
            window.location.pathname = "/manage";
          }
        } else {
          if (window.location.pathname !== "/payperiod") {
            window.location.pathname = "/payperiod";
          }
        }
      }
    }
  });

  document.documentElement.setAttribute("theme", "g10");
</script>

<Router url={window.location.pathname}>
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
