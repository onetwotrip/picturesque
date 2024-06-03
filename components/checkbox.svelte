<script lang="ts">
  export let value: boolean = false
  export let onChange: (_value: boolean) => void = () => {}

  let id = crypto.randomUUID()
</script>

<input
  onchange={() => {
    onChange(!value)
  }}
  checked={value}
  type="checkbox"
  class="input"
  {id}
/>
<label class="label" for={id}>
  {#if value}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="currentColor"
        d="m5 12l5 5L20 7"
        stroke-width="2"
        fill="none"
      />
    </svg>
  {/if}
</label>

<style>
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 36px;
    block-size: 36px;
    padding: var(--space-2xs);
    color: var(--color-content-secondary);
    cursor: pointer;
    background: var(--color-background-tertiary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    transition: border-color 200ms;

    &:hover {
      border-color: var(--color-border-secondary);
    }

    &:focus-visible {
      border-color: var(--color-border-brand);
    }
  }

  .input {
    position: absolute;
    inset-inline-start: -100vi;
    transform: translateX(-100%);

    &:focus-visible + .label {
      border-color: var(--color-border-brand);
    }
  }

  .icon {
    inline-size: 16px;
    block-size: 16px;
  }
</style>
