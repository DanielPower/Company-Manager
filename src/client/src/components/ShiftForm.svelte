<script>
  import { Select, SelectItem, TextArea, TextInput } from "carbon-components-svelte";
  export let shift;
  export let jobs;
</script>

<Select
  name="Job"
  labelText={'Job'}
  selected={shift.jobId}
  on:change={({ detail }) => (shift.jobId = parseInt(detail))}>
  {#each jobs as job}
    <SelectItem value={job.id} text={job.name} />
  {/each}
</Select>
<TextArea bind:value={shift.description} labelText={'Description'} />
<row>
  <rowItem class="fillWidth">
    <TextInput
      type="number"
      bind:value={shift.hoursWorked}
      labelText={'Worked'} />
  </rowItem>
  <rowItem class="fillWidth">
    <TextInput
      type="number"
      bind:value={shift.hoursBanked}
      labelText={'Banked'} />
  </rowItem>
</row>
