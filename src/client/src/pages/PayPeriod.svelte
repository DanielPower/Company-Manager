<script>
  import axios from "axios";
  import {
    Content,
    Button,
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
    shifts = shiftsResponse.data;
  };

  const saveShifts = async () =>
    await axios.put("/api/shifts", {
      payPeriodId: payPeriod.id,
      shifts,
    });

  const submitShifts = async () => {
    await saveShifts();
    await axios.post("/api/payperiods", {
      isSubmitted: true,
    });
  };

  const addShift = () => {
    shifts = [
      ...shifts,
      {
        date: dayjs(),
        description: "",
        hoursBanked: 0,
        hoursWorked: 0,
        jobId: 0,
        nightShift: false,
      },
    ];
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

  rowItem:not(:last-child) {
    margin-right: 0.5rem;
  }

  rowItem:not(:first-child) {
    margin-left: 0.5rem;
  }

  payPeriodForm {
    margin-bottom: 2rem;
    display: block;
  }

  .fillWidth {
    width: 100%;
  }

  .marginBelow {
    margin-bottom: 1rem;
  }
</style>

<Content>
  {#await dataReadyPromise}
    <SkeletonText />
    <SkeletonText />
  {:then}
    <h2>Week Ending {dayjs(payPeriod.date).day(6).format('YYYY-MM-DD')}</h2>
    <h3>{user.name}</h3>
    {#each shifts as shift}
      <payPeriodForm>
        <Select name="Job" labelText={'Job'} bind:selected={shift.jobId}>
          {#each jobs as job}
            <SelectItem value={job.id} text={job.name} />
          {/each}
        </Select>
        <TextArea bind:value={shift.description} labelText={'Description'} />
        <row>
          <rowItem class="fillWidth">
            <TextInput bind:value={shift.hoursWorked} labelText={'Worked'} />
          </rowItem>
          <rowItem class="fillWidth">
            <TextInput bind:value={shift.hoursBanked} labelText={'Banked'} />
          </rowItem>
        </row>
      </payPeriodForm>
    {/each}
  {/await}
  <row class="marginBelow">
    <rowItem>
      <Button size="field" kind="secondary" on:click={addShift}>Add Job</Button>
    </rowItem>
    <rowItem>
      <Button size="field" kind="secondary" on:click={saveShifts}>Save</Button>
    </rowItem>
  </row>
  <Button size="field" on:click={submitShifts}>Submit</Button>
</Content>
