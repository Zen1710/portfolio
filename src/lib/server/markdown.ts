import { Marked } from 'marked';

const marked = new Marked({ gfm: true, async: false });

/** Content is written by Naufal in this repo, so its HTML is trusted; nothing user-submitted reaches here. */
export function renderMarkdown(body: string): string {
	return marked.parse(body) as string;
}
