<script>
  import axios from "axios";
  import {
    Button,
    Content,
    Form,
    DatePicker,
    DatePickerInput,
    Select,
    SelectItem,
    TextArea,
    TextInput,
  } from "carbon-components-svelte";

  let jobs = [];
  axios.get("/jobs").then(({ data }) => (jobs = data));

  let username;
  let usernameInvalid = false;

  let password;
  let passwordInvalid = false;

  let forms = [];

  const addForm = () => {
    forms = [
      ...forms,
      {
        date: "",
        name: "",
        description: "",
        workedHours: "",
        bankedHours: "",
      },
    ];
  };
</script>

<Content>
  <Form>
    <p>Week Ending **/**/**</p>
    <p>Cory Power</p>
    {#each forms as form}
      <payperiodForm>
        <div class="row">
          <DatePicker
            id="date-picker"
            bind:value={form.date}
            datePickerType={'single'}>
            <DatePickerInput
              id="date-picker-input"
              placeholder="mm/dd/yyyy"
              labelText={'Date'} />
          </DatePicker>
          <Select name="Job" labelText={'Job'}>
            {#each jobs as job}
              <SelectItem value={job.name} text={job.name} />
            {/each}
          </Select>
        </div>
        <TextArea bind:value={form.description} labelText={'Description'} />
        <TextInput bind:value={form.workedHours} labelText={'Worked'} />
        <TextInput bind:value={form.bankedHours} labelText={'Banked'} />
      </payperiodForm>
    {/each}
    <Button on:click={addForm}>Add shift</Button>
  </Form>
</Content>
