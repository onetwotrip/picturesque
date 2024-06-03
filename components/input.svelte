<script lang="ts">
  export let value: string = ''
  export let onChange: (_value: string) => void = () => {}

  let timer: ReturnType<typeof setTimeout>

  let debounce = (newValue: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      onChange(newValue)
    }, 750)
  }
</script>

<input
  on:keyup={event => {
    debounce(event.currentTarget.value)
  }}
  class="input"
  type="text"
  {value}
/>

<style>
  .input {
    inline-size: 180px;
    padding: var(--space-2xs) var(--space-xs);
    color: var(--color-content-primary);
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
</style>
