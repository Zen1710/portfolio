<script lang="ts">
	import { page } from '$app/state';

	let { title, description, image, siteUrl }: { title: string; description: string; image: string; siteUrl: string } =
		$props();

	const url = $derived(new URL(page.url.pathname, siteUrl).href);
	const imageUrl = $derived(new URL(image, siteUrl).href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
