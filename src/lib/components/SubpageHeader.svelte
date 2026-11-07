<script lang="ts">
	import type { Profile } from '#lib/content/types.ts';
	import QuickLine from './QuickLine.svelte';

	let { profile, hasCv }: { profile: Profile; hasCv: boolean } = $props();
</script>

<div class="px-4 pt-5 sm:px-8 lg:px-16 lg:pt-7">
	<QuickLine {profile} {hasCv} />
</div>
