<script lang="ts">
  import Button from '~/components/button.svelte'
  import { loading, code } from '~/stores/code'

  let copyCode = async (): Promise<void> => {
    await navigator.clipboard.writeText($code)
  }
</script>

<Button variant="secondary" onClick={copyCode} loading={$loading}>
  Скопировать код
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
    >
      <path
        d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"
      />
      <path
        d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"
      />
    </g>
  </svg>
</Button>

<style>
  .icon {
    inline-size: 16px;
    block-size: 16px;
  }
</style>
