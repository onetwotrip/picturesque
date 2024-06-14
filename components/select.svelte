<script lang="ts">
  export let options: { value: string; name: string }[] = []
  export let onChange: (_value: string) => void = () => {}
  export let value: string = ''
</script>

<div class="wrapper">
  <select
    onchange={event => {
      onChange(event.currentTarget.value)
    }}
    class="select"
  >
    {#each options as { value: optionValue, name }}
      <option selected={optionValue === value} value={optionValue}>
        {name}
      </option>
    {/each}
  </select>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="currentColor"
      stroke-width="2"
      d="m6 9l6 6l6-6"
      fill="none"
    />
  </svg>
</div>

<style>
  .wrapper {
    position: relative;
    inline-size: 100%;
  }

  .select {
    inline-size: 100%;
    padding: var(--space-2xs) var(--space-xs);
    color: var(--color-content-secondary);
    appearance: none;
    background: var(--color-background-tertiary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    outline: none;
    transition: border-color 200ms;

    &:hover {
      border-color: var(--color-border-secondary);
    }

    &:focus-visible {
      border-color: var(--color-border-brand);
    }
  }

  .icon {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-end: var(--space-2xs);
    inline-size: 16px;
    block-size: 16px;
    pointer-events: none;
    transform: translateY(-50%);
  }
</style>
