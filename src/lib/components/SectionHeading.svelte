<script lang="ts">
	let { id, index, title }: { id: string; index?: number; title: string } = $props();
</script>

<h2 id="{id}-title" class="label flex items-center gap-3.5 text-ink">
	{#if index}<span class="text-action">{String(index).padStart(2, '0')}</span>{/if}{title}
</h2>
