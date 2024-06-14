<script lang="ts">
  export let htmlFor: string
</script>

<label class="label" for={htmlFor}>
  <slot />:
</label>

<style>
  .label {
    min-inline-size: 140px;
    white-space: nowrap;

    @container (inline-size >= 600px) {
      min-inline-size: 130px;
    }
  }
</style>
