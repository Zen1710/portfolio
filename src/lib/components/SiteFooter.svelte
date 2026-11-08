<script lang="ts">
	let { sourceRepo }: { sourceRepo: string } = $props();
</script>

<footer class="border-t border-line pt-6 font-mono text-[0.6875rem] tracking-[0.06em] text-subtle uppercase">
	Built with SvelteKit · Served by Cloudflare{#if sourceRepo}{' '}·{' '}<a class="hover:text-ink" href={sourceRepo}>Source on GitHub</a>{/if}
</footer>
