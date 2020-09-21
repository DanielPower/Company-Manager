<script>
  import axios from "axios";
  import {
    Button,
    Content,
    Form,
    TextInput,
    DatePicker,
    DatePickerInput,
  } from "carbon-components-svelte";

  let employeeNumber;
  let employeeName;
  let startDate;

  const submitUser = () => {
    axios.post("/users", { employeeNumber, employeeName, startDate });
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
    <Form on:submit={submitUser}>
      <TextInput bind:value={employeeNumber} labelText="Employee Number" />
      <TextInput bind:value={employeeName} labelText="Employee Name" />
      <DatePicker
        id="date-picker"
        bind:value={startDate}
        datePickerType={'single'}>
        <DatePickerInput
          id="date-picker-input"
          placeholder="mm/dd/yyyy"
          labelText={'Date'} />
      </DatePicker>
      <div class="submitButton">
        <Button type="submit">Create User</Button>
          {startDate}
      </div>
    </Form>
  </div>
</Content>
