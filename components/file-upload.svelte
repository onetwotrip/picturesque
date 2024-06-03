<script lang="ts">
  export let value: File | null = null
  export let onChange: (_value: File) => void = () => {}

  let id = crypto.randomUUID()
</script>

<input
  onchange={event => {
    let file = event.currentTarget.files?.[0]
    if (file) {
      onChange(file)
    }
  }}
  accept="image/png, image/jpeg"
  class="input"
  type="file"
  {value}
  {id}
/>
<label class="label" for={id}>
  <slot />
</label>

<style>
  .input {
    position: absolute;
    inset-inline-start: -100vi;
    transform: translateX(-100%);
  }

  .label {
    display: inline-flex;
    gap: var(--space-xs);
    align-items: center;
    align-self: start;
    padding: var(--space-2xs) var(--space-xs);
    color: var(--color-content-inverse);
    cursor: pointer;
    background: var(--color-background-inverse);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    outline: none;
    transition: all 200ms;

    &:hover,
    &:focus-visible {
      background: var(--color-background-inverse-hover);
    }

    &:hover {
      border-color: var(--color-border-secondary);
    }

    &:focus-visible {
      border-color: var(--color-border-brand);
    }
  }
</style>
