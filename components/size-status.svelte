<script lang="ts">
  import { loading, code } from '~/stores/code'
  import { sizes } from '~/stores/form-data'

  // eslint-disable-next-line no-unused-expressions
  $code

  let convertBytes = (bytes: number): string => {
    let kilobytes = bytes / 1000
    return kilobytes.toFixed(2)
  }

  let calculatePercent = (original: number, current: number): number =>
    parseFloat((100 - (current * 100) / original).toFixed(2))
</script>

{#if $sizes && !$loading}
  <p
    class:success={$sizes.original > $sizes.desktop}
    class:error={$sizes.original < $sizes.desktop}
    class="status"
  >
    <b>Десктоп:</b>
    {convertBytes($sizes.original)}
    kB → {convertBytes($sizes.desktop)} kB ({$sizes.original < $sizes.desktop
      ? '+'
      : ''}{calculatePercent($sizes.original, $sizes.desktop) * -1}%)
  </p>
  <p
    class:success={$sizes.original > $sizes.mobile}
    class:error={$sizes.original < $sizes.mobile}
    class="status"
  >
    <b>Мобила:</b>
    {convertBytes($sizes.original)}
    kB → {convertBytes($sizes.mobile)} kB ({$sizes.original < $sizes.mobile
      ? '+'
      : ''}{calculatePercent($sizes.original, $sizes.mobile) * -1}%)
  </p>
{/if}

<style>
  .status {
    display: flex;
    gap: var(--space-2xs);
    align-items: center;
    opacity: 0%;
    animation: fade-in 500ms forwards;
  }

  .success {
    color: var(--color-content-success);
  }

  .error {
    color: var(--color-content-error);
  }

  @keyframes fade-in {
    0% {
      opacity: 0%;
    }

    100% {
      opacity: 100%;
    }
  }
</style>
