import {
	siBootstrap,
	siCss,
	siDocker,
	siExpress,
	siGo,
	siHtml5,
	siJavascript,
	siLaravel,
	siMysql,
	siNextdotjs,
	siNodedotjs,
	siPhp,
	siPostgresql,
	siPython,
	siReact,
	siSvelte,
	siTailwindcss,
	siTensorflow,
	siTypescript,
	siUltralytics,
	siVuedotjs,
	type SimpleIcon
} from 'simple-icons';
import type { Tech } from '#lib/content/types.ts';

/** `viewBox` crops a wide wordmark to its ink so it can sit at cap height. */
const registry: Record<string, { label: string; icon?: SimpleIcon; viewBox?: string }> = {
	typescript: { label: 'TypeScript', icon: siTypescript },
	javascript: { label: 'JavaScript', icon: siJavascript },
	nextjs: { label: 'Next.js', icon: siNextdotjs },
	react: { label: 'React', icon: siReact },
	vue: { label: 'Vue', icon: siVuedotjs },
	svelte: { label: 'Svelte', icon: siSvelte },
	sveltekit: { label: 'SvelteKit', icon: siSvelte },
	nodejs: { label: 'Node.js', icon: siNodedotjs },
	express: { label: 'Express', icon: siExpress },
	go: { label: 'Go', icon: siGo, viewBox: '0 7.5 24 9' },
	php: { label: 'PHP', icon: siPhp },
	laravel: { label: 'Laravel', icon: siLaravel },
	postgresql: { label: 'PostgreSQL', icon: siPostgresql },
	mysql: { label: 'MySQL', icon: siMysql },
	tailwindcss: { label: 'Tailwind CSS', icon: siTailwindcss },
	bootstrap: { label: 'Bootstrap', icon: siBootstrap },
	html: { label: 'HTML', icon: siHtml5 },
	css: { label: 'CSS', icon: siCss },
	docker: { label: 'Docker', icon: siDocker },
	python: { label: 'Python', icon: siPython },
	tensorflowjs: { label: 'TensorFlow.js', icon: siTensorflow },
	ultralytics: { label: 'Ultralytics', icon: siUltralytics }
};

/** Looks up a tech by key (e.g. "nextjs"); unknown names render as plain text chips. */
export function getTech(key: string): Tech {
	const id = key.toLowerCase().replace(/[\s.]/g, '');
	const entry = registry[id];
	if (!entry) return { key, label: key };
	return { key: id, label: entry.label, path: entry.icon?.path, viewBox: entry.viewBox };
}

export const getTechs = (keys: string[] = []) => keys.map(getTech);
