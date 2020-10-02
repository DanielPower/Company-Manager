<script lang="ts">
  import axios from "axios";
  import {
    Button,
    Content,
    Form,
    TextInput,
    DatePicker,
    DatePickerInput,
    Checkbox,
    DataTable,
    Dropdown,
  } from "carbon-components-svelte";
  import { JobHourTypes } from "../enums";

  let employees = [];
  let employeeNumber = "";
  let employeeName = "";
  let employeeIsAdmin = false;
  let employeeStartDate = "";

  const employeeTableHeaders = [
    { key: "id", value: "Employee Number" },
    { key: "name", value: "Name" },
    { key: "is_admin", value: "Admin" },
  ];

  let jobs = [];
  let jobNumber = "";
  let jobName = "";
  let jobHourIndex = JobHourTypes.standard;

  const jobHourTypes = [
    {
      id: "standard",
      text: "Standard",
      value: JobHourTypes.standard,
    },
    {
      id: "short",
      text: "< 200km",
      value: JobHourTypes.short,
    },
    {
      id: "long",
      text: "> 200km",
      value: JobHourTypes.long,
    },
  ];

  const jobTableHeaders = [
    { key: "id", value: "Job Number" },
    { key: "name", value: "Job" },
    { key: "hour_type", value: "Hour type" },
  ];

  const getEmployees = () =>
    axios({
      method: "get",
      url: "/employees",
      withCredentials: true,
    }).then(({ data }) => {
      employees = data;
    });

  const submitEmployee = () =>
    axios
      .post("/employees", {
        id: parseInt(employeeNumber),
        name: employeeName,
        isAdmin: employeeIsAdmin,
        startDate: employeeStartDate,
      })
      .then(getEmployees);

  const getJobs = () =>
    axios.get("/jobs").then(({ data }) => {
      jobs = data;
      console.log(jobs);
    });

  const submitJob = () =>
    axios
      .post("/jobs", {
        jobNumber: parseInt(jobNumber),
        name: jobName,
        hourType: jobHourTypes[jobHourIndex].value,
      })
      .then(getJobs);

  getEmployees();
  getJobs();
</script>

<Content>
  <h1>Employees</h1>
  <DataTable headers={employeeTableHeaders} rows={employees} sortable />
  <h1>Add employee</h1>
  <Form on:submit={submitEmployee}>
    <TextInput bind:value={employeeNumber} labelText="Employee Number" />
    <TextInput bind:value={employeeName} labelText="Name" />
    <Checkbox bind:checked={employeeIsAdmin} labelText="Is Admin" />
    <DatePicker
      id="date-picker"
      bind:value={employeeStartDate}
      datePickerType={'single'}>
      <DatePickerInput
        id="date-picker-input"
        placeholder="mm/dd/yyyy"
        labelText={'Date'} />
    </DatePicker>
    <Button type="submit">Add Employee</Button>
  </Form>
  <h1>Jobs</h1>
  <DataTable headers={jobTableHeaders} rows={jobs} sortable />
  <h1>Add job</h1>
  <Form on:submit={submitJob}>
    <TextInput bind:value={jobNumber} labelText="Job Number" />
    <TextInput bind:value={jobName} labelText="Job Name" />
    <Dropdown
      bind:selectedIndex={jobHourIndex}
      items={jobHourTypes}
      titleText="Job Hour Type" />
    <Button type="submit">Add Job</Button>
  </Form>
</Content>
