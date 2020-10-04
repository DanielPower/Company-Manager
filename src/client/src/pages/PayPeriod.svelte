<script>
  import axios from "axios";
  import {
    Content,
    Button,
    Form,
    Select,
    SelectItem,
    TextArea,
    TextInput,
    SkeletonText,
  } from "carbon-components-svelte";
  import dayjs from "dayjs";

  let user = {};
  let jobs = [];
  let payPeriod = {};
  let shifts = [];

  const getUser = async () => {
    const userResponse = await axios.get("/api/employees/current");
    user = userResponse.data;
  };
  const getJobs = async () => {
    const jobsResponse = await axios.get("/api/jobs");
    jobs = jobsResponse.data;
  };

  const getShifts = async () => {
    const payPeriodResponse = await axios.get("/api/payperiod");
    payPeriod = payPeriodResponse.data;
    const shiftsResponse = await axios.get("/api/shifts", {
      params: {
        payPeriodId: payPeriod.id,
      },
    });
    console.log(shiftsResponse);
    shifts = shiftsResponse.data;
  };

  const userPromise = getUser();
  const jobsPromise = getJobs();
  const shiftsPromise = getShifts();

  const dataReadyPromise = Promise.all([
    userPromise,
    jobsPromise,
    shiftsPromise,
  ]);
</script>

<style>
  row {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  rowItem {
    width: 100%;
  }

  rowItem:not(:last-child) {
    margin-right: 1rem;
  }

  rowItem:not(:first-child) {
    margin-left: 1rem;
  }

  payPeriodForm {
    margin-bottom: 2rem;
    display: block;
  }
</style>

<Content>
  <Form>
    {#await dataReadyPromise}
      <SkeletonText />
      <SkeletonText />
    {:then}
      <h2>Week Ending {dayjs(payPeriod.date).day(6).format('YYYY-MM-DD')}</h2>
      <h3>{user.name}</h3>
      {#each shifts as shift}
        <payPeriodForm>
          <Select name="Job" labelText={'Job'} bind:selected={shift.job}>
            {#each jobs as job}
              <SelectItem value={job.id} text={job.name} />
            {/each}
          </Select>
          <TextArea bind:value={shift.description} labelText={'Description'} />
          <row>
            <rowItem>
              <TextInput bind:value={shift.hoursWorked} labelText={'Worked'} />
            </rowItem>
            <rowItem>
              <TextInput bind:value={shift.hoursBanked} labelText={'Banked'} />
            </rowItem>
          </row>
        </payPeriodForm>
      {/each}
    {/await}
  </Form>
  <Button>Add Job</Button>
</Content>
