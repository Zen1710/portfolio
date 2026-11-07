<script lang="ts">
	import photo from '#lib/assets/photo.webp';

	let { name, href = '/' }: { name: string; href?: string } = $props();
</script>

<a {href} class="group flex items-center gap-3.5">
	<span class="relative size-12 shrink-0">
		<img src={photo} alt="" width="48" height="48" class="size-12 rounded-full object-cover grayscale" />
		<span class="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-[2.5px] border-night bg-live" aria-hidden="true"></span>
	</span>
	<span class="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink sm:text-[1.1875rem]">{name}</span>
</a>
