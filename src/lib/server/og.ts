import { readFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

// Build-time only (ADR 0005): every page gets its own 1200×630 card, nothing runs in the browser or the Worker.
const WIDTH = 1200;
const HEIGHT = 630;

const font = (pkg: string, file: string) => readFileSync(`node_modules/@fontsource/${pkg}/files/${file}`);

// The Code Bridge pixel glyphs (8×8 grid), white on the trail-blue field.
const glyphs = {
	heart: 'M1 0h2v1H1zM5 0h2v1H5zM0 1h8v3H0zM1 4h6v1H1zM2 5h4v1H2zM3 6h2v1H3z',
	arrow: 'M3 0h1v1H3zM3 1h2v1H3zM0 2h6v1H0zM0 3h7v1H0zM0 4h6v1H0zM3 5h2v1H3zM3 6h1v1H3z',
	plus: 'M3 0h2v2H3zM0 2h8v2H0zM3 4h2v2H3z',
	star: 'M3 0h1v2H3zM1 2h1v1H1zM3 2h1v1H3zM5 2h1v1H5zM2 3h3v1H2zM0 4h7v1H0zM2 5h3v1H2zM1 6h1v1H1zM3 6h1v1H3zM5 6h1v1H5zM3 7h1v1H3z'
};
const decor: [keyof typeof glyphs, number, number, number][] = [
	['heart', 1010, 40, 40],
	['arrow', 900, 300, 40],
	['plus', 1120, 210, 30],
	['star', 1030, 330, 40],
	['heart', 1120, 470, 30]
];
const svgUri = (path: string) =>
	`data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" shape-rendering="crispEdges"><path fill="#fff" d="${path}"/></svg>`).toString('base64')}`;

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({ type, props: { style, children } });

export async function renderOgImage(card: { kicker: string; title: string; byline: string }): Promise<Uint8Array> {
	const tree = h('div', { display: 'flex', width: WIDTH, height: HEIGHT, position: 'relative', background: '#0A78B4' }, [
		...decor.map(([g, x, y, size]) => ({
			type: 'img',
			props: { src: svgUri(glyphs[g]), width: size, height: size, style: { position: 'absolute', left: x, top: y } }
		})),
		h('div', { position: 'absolute', left: 64, right: 220, bottom: 64, display: 'flex', flexDirection: 'column', gap: 22 }, [
			h('div', { fontFamily: 'IBM Plex Mono', fontSize: 16, letterSpacing: 3, color: '#EAF6FC', textTransform: 'uppercase' }, card.kicker),
			h(
				'div',
				{ fontFamily: 'Silkscreen', fontSize: card.title.length > 28 ? 48 : 64, lineHeight: 1.1, color: '#FFFFFF', textTransform: 'uppercase' },
				card.title
			),
			h('div', { fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: 22, color: '#07090B' }, card.byline)
		])
	]);

	const svg = await satori(tree as Parameters<typeof satori>[0], {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{ name: 'Silkscreen', data: font('silkscreen', 'silkscreen-latin-400-normal.woff'), weight: 400, style: 'normal' },
			{ name: 'IBM Plex Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
			{ name: 'Instrument Sans', data: font('instrument-sans', 'instrument-sans-latin-600-normal.woff'), weight: 600, style: 'normal' }
		]
	});
	return new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
}
