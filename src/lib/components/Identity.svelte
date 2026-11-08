<script lang="ts">
	import photo from '#lib/assets/photo.webp';

	let { name, onColor = false }: { name: string; onColor?: boolean } = $props();
</script>

<a href="/" class="flex items-center gap-3.5 {onColor ? 'text-white' : 'text-ink'}">
	<span class="relative size-12 shrink-0">
		<img src={photo} alt="" width="48" height="48" class="size-12 rounded-full object-cover grayscale" />
		<span
			class="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-[2.5px] bg-live {onColor ? 'border-trail' : 'border-night'}"
			aria-hidden="true"
		></span>
	</span>
	<span class="pixel text-base">{name}</span>
</a>
