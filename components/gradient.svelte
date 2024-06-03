<script lang="ts">
  import { gradient } from '~/stores/form-data'
</script>

<div style="background: {$gradient}" class="gradient"></div>

<style>
  .gradient {
    inline-size: 100%;
    block-size: 200px;
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
  }
</style>
