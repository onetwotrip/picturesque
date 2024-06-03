<script lang="ts">
  export let size: 'm' | 'l' = 'm'
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class:size-m={size === 'm'}
  class:size-l={size === 'l'}
  viewBox="0 0 24 24"
  class="loader"
>
  <path
    stroke-linejoin="round"
    d="M12 3a9 9 0 1 0 9 9"
    stroke-linecap="round"
    stroke="currentColor"
    stroke-width="2"
    fill="none"
  />
</svg>

<style>
  .loader {
    color: var(--color-content-secondary);
    animation: spin 1s linear infinite;
  }

  .size-m {
    inline-size: 16px;
    block-size: 16px;
  }

  .size-l {
    inline-size: 48px;
    block-size: 48px;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
