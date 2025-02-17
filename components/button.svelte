<script lang="ts">
  import Loader from '~/components/loader.svelte'

  export let variant: 'secondary' | 'primary' = 'primary'
  export let type: 'button' | 'submit' = 'button'
  export let onClick: () => void = () => {}
  export let disabled: boolean = false
  export let loading: boolean = false
</script>

<button
  class:secondary={variant === 'secondary'}
  class:primary={variant === 'primary'}
  on:click={onClick}
  class="button"
  {disabled}
  {type}
>
  {#if loading}
    <Loader size="m" />
  {:else}
    <slot />
  {/if}
</button>

<style>
  .button {
    display: inline-flex;
    gap: var(--space-xs);
    align-items: center;
    justify-content: center;
    min-inline-size: 200px;
    block-size: 36px;
    padding: var(--space-2xs) var(--space-xs);
    color: var(--color-content-inverse);
    cursor: pointer;
    outline: none;
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    transition: all 200ms;

    &:active {
      transform: scale(0.95);
    }

    &:hover {
      border-color: var(--color-border-secondary);
    }

    &:focus-visible {
      border-color: var(--color-border-brand);
    }

    &:disabled {
      color: var(--color-content-secondary);
      cursor: not-allowed;
      background: var(--color-background-secondary);
      border-color: var(--color-border-tertiary);
    }
  }

  .primary {
    background: var(--color-background-brand);

    &:hover,
    &:focus-visible {
      background: var(--color-background-brand-hover);
    }
  }

  .secondary {
    background: var(--color-background-inverse);

    &:hover,
    &:focus-visible {
      background: var(--color-background-inverse-hover);
    }
  }
</style>
