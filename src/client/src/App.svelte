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
  import { Login, PayPeriod } from "./pages";

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
    bind:isSideNavOpen>
    <SideNav isOpen={isSideNavOpen}>
      <SideNavItems>
        <SideNavMenu text="Menu 1">
          <SideNavLink text="Log out" />
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  </Header>
  <Route path="login">
    <Login />
  </Route>
  <Route path="payperiod">
    <PayPeriod />
  </Route>
</Router>
