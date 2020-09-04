<script>
  import { Router, Route, Link } from "svelte-routing";
  import { Header, HeaderUtilities, HeaderActionSearch, HeaderAction, HeaderPanelLinks, HeaderPanelDivider, HeaderActionLink, Content } from "carbon-components-svelte";
  import { Login } from "./pages";
  let url="login";
</script>

<style>
  .login {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/carbon-components/css/carbon-components.min.css"
  />
</svelte:head>

<Router url={url}>
  <Header company="Company Name" href="/" platformName="Employee Management">
    <HeaderUtilities>
      <HeaderActionSearch />
    </HeaderUtilities>
  </Header>
    <Route path="login">
      <Login/>
    </Route>
    <Route path="manage">
    </Route>
</Router>
