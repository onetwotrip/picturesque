<script lang="ts">
  import { loading, code } from '~/stores/code'
  import { sizes } from '~/stores/form-data'

  // eslint-disable-next-line typescript/no-unused-expressions
  $code

  let convertBytes = (bytes: number): string => {
    let kilobytes = bytes / 1000
    return kilobytes.toFixed(2)
  }

  let calculatePercent = (original: number, current: number): number =>
    Number.parseFloat((100 - (current * 100) / original).toFixed(2))

  $: originalSize = $sizes?.original ?? Number.NaN
  $: desktopSize = $sizes?.desktop ?? Number.NaN
  $: mobileSize = $sizes?.mobile ?? Number.NaN
</script>

{#if $sizes && !$loading}
  <p
    class:success={originalSize > desktopSize}
    class:error={originalSize < desktopSize}
    class="status"
  >
    <b>Десктоп:</b>
    {convertBytes(originalSize)}
    kB → {convertBytes(desktopSize)} kB ({originalSize < desktopSize
      ? '+'
      : ''}{calculatePercent(originalSize, desktopSize) * -1}%)
  </p>
  <p
    class:success={originalSize > mobileSize}
    class:error={originalSize < mobileSize}
    class="status"
  >
    <b>Мобила:</b>
    {convertBytes(originalSize)}
    kB → {convertBytes(mobileSize)} kB ({originalSize < mobileSize
      ? '+'
      : ''}{calculatePercent(originalSize, mobileSize) * -1}%)
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
