<script lang="ts">
  import { toggleColorTheme, colorTheme } from '~/stores/color-theme'
</script>

<button on:click={toggleColorTheme} class="theme-toggle" type="button">
  {#if $colorTheme === 'dark'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
      <path
        d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="currentColor"
        stroke-width="1.5"
        fill="none"
      />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
      <path
        d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="currentColor"
        stroke-width="1.5"
        fill="none"
      />
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    border-radius: var(--border-radius);
    outline: none;

    &:focus-visible {
      box-shadow: 0 0 0 2px var(--color-content-brand);
    }
  }

  .icon {
    inline-size: 32px;
    block-size: 32px;
    color: var(--color-content-primary);
  }
</style>
