<script lang="ts">
  export let tag: string = 'div'
</script>

<!-- eslint-disable perfectionist/sort-svelte-attributes -->
<svelte:element
  this={tag}
  class={$$restProps.class ?? ''}
  class:container={true}
  {...$$restProps}
>
  <slot />
</svelte:element>

<style>
  .container {
    inline-size: min(1200px, 100vi);
    padding: var(--space-m);
    margin-inline: auto;
    container-type: inline-size;
  }
</style>
