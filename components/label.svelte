<script lang="ts">
  export let htmlFor: string
</script>

<label class="label" for={htmlFor}>
  <slot />:
</label>

<style>
  .label {
    white-space: nowrap;
  }
</style>
