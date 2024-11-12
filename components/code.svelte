<script lang="ts">
  import { ShikiMagicMove } from 'shiki-magic-move/svelte'
  import 'shiki-magic-move/dist/style.css'

  import { firstLoad, loading, code } from '~/stores/code'
  import Loader from '~/components/loader.svelte'
  import { shiki } from '~/stores/shiki'

  $: ({ highlighter, theme } = $shiki)
</script>

<div class:loading={$loading && !$firstLoad} class="wrapper">
  {#if !$firstLoad && highlighter}
    <ShikiMagicMove
      options={{
        animateContainer: false,
        duration: 500,
        stagger: 3,
      }}
      {highlighter}
      code={$code}
      lang="scss"
      {theme}
    />
  {:else}
    <div class="loader-container">
      <Loader size="l" />
    </div>
  {/if}
</div>

<style>
  .wrapper {
    transition: opacity 300ms;
  }

  .loading {
    opacity: 50%;
  }

  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    block-size: 400px;
    background: var(--color-background-code);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
  }
</style>
