<script>
  import { Router, Route } from "svelte-routing";
  import {
    Header,
    HeaderUtilities,
    HeaderActionSearch,
    HeaderNavMenu,
    HeaderNavItem,
    HeaderNav,
    SideNav,
    SideNavLink,
    SideNavItems, SideNavMenu
  } from "carbon-components-svelte";
  import { Login, PayPeriod, CreateUser } from "./pages";
import Manage from "./pages/Manage.svelte";

  let isSideNavOpen = false;
</script>

<style>

</style>

<svelte:head />

<Router url={window.location.pathname}>
  <Header
    company="Company Name"
    href="/"
    platformName="Employee Management"
    bind:isSideNavOpen/>
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
