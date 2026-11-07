import { readFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import sharp from 'sharp';

// Build-time only (ADR 0005): every page gets its own 1200×630 card, nothing runs in the browser or the Worker.
const WIDTH = 1200;
const HEIGHT = 630;

const font = (weight: 400 | 600) =>
	readFileSync(`node_modules/@fontsource/archivo/files/archivo-latin-${weight}-normal.woff`);

let background: Promise<string> | undefined;

/** The hero photograph, flattened to the trail-blue duotone, as a data URI. Made once per build. */
function exposure() {
	background ??= sharp('src/lib/assets/exposure-2000.webp')
		.resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
		// tint() keeps the photo's light and swaps its colour for the trail blue.
		.tint('#0A78B4')
		.jpeg({ quality: 80 })
		.toBuffer()
		.then((buffer) => `data:image/jpeg;base64,${buffer.toString('base64')}`);
	return background;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
	type,
	props: { style, children }
});

export async function renderOgImage(card: { kicker: string; title: string; byline: string }): Promise<Uint8Array> {
	const tree = h('div', { display: 'flex', width: WIDTH, height: HEIGHT, position: 'relative', background: '#07090B' }, [
		{ type: 'img', props: { src: await exposure(), width: WIDTH, height: HEIGHT, style: { position: 'absolute', inset: 0 } } },
		h('div', {
			position: 'absolute',
			inset: 0,
			backgroundImage: 'linear-gradient(180deg, rgba(7,9,11,0.2) 0%, rgba(7,9,11,0.95) 70%)'
		}),
		h(
			'div',
			{ position: 'absolute', left: 64, right: 64, bottom: 64, display: 'flex', flexDirection: 'column', gap: 20 },
			[
				h('div', { fontSize: 16, letterSpacing: 3, color: '#9FB0BB', textTransform: 'uppercase' }, card.kicker),
				h(
					'div',
					{ fontSize: card.title.length > 32 ? 64 : 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: -1.5, color: '#E9EEF2' },
					card.title
				),
				h('div', { fontSize: 22, color: '#1FB5E9' }, card.byline)
			]
		)
	]);

	const svg = await satori(tree as Parameters<typeof satori>[0], {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{ name: 'Archivo', data: font(400), weight: 400, style: 'normal' },
			{ name: 'Archivo', data: font(600), weight: 600, style: 'normal' }
		]
	});
	return new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
}
