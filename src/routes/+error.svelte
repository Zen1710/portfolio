<script lang="ts">
	import { page } from '$app/state';
	import PixelDecor from '#lib/components/PixelDecor.svelte';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} · Naufal Rizky Ananda</title>
</svelte:head>

<main class="relative isolate grid min-h-svh content-end overflow-hidden bg-trail px-4 pb-16 text-white sm:px-8 lg:px-16 lg:pb-24">
	<div class="absolute inset-y-0 right-0 -z-10 w-full max-w-[40rem]"><PixelDecor /></div>
	<p class="font-mono text-sm tracking-[0.2em] text-[#eaf6fc] uppercase">Error {page.status}</p>
	<h1 class="pixel mt-5 max-w-[22ch] text-[2.25rem] leading-[1.15] lg:text-[3.5rem]">
		{page.status === 404 ? 'Nothing was built at this address.' : 'Something broke while building this page.'}
	</h1>
	<a class="mt-6 font-mono text-base text-white underline underline-offset-4" href="/">← Back to the home page</a>
</main>
