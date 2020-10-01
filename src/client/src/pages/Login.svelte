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
  let usernameInvalid = false;

  let password: string;
  let passwordInvalid = false;

  const submitLogin = () => {
    axios.post("/login", { username, password }).then((response) => {
      if (response.status === 200) {
        window.location.href = '/';
      }
    });
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
