<script lang="ts">
  import { gradientDirection, gradients } from '~/stores/form-data'

  $: gradientDirectionValue = $gradients?.[$gradientDirection]
</script>

<div style:background={gradientDirectionValue} class="gradient" />

<style>
  .gradient {
    inline-size: 100%;
    block-size: 200px;
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
  }
</style>
