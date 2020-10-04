<script lang="ts">
  import axios from "axios";
  import {
    Button,
    Content,
    Form,
    TextInput,
    PasswordInput,
  } from "carbon-components-svelte";

  let username: string;
  let password: string;

  const submitLogin = () => {
    axios({
      method: "post",
      url: "/api/authorize", 
      withCredentials: true, 
      data: { username, password },
      responseType: "json",
    }).then((res) => console.log(res));
  };
</script>

<style>
  .login {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .submitButton {
    margin-left: auto;
    margin-right: 0px;
  }
</style>

<Content>
  <div class="login">
    <Form on:submit={submitLogin}>
      <TextInput bind:value={username} labelText="Username" />
      <PasswordInput bind:value={password} labelText="Password" />
      <div class="submitButton">
        <Button type="submit">Login</Button>
      </div>
    </Form>
  </div>
</Content>
