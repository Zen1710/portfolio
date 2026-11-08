import { Marked, type Tokens } from 'marked';

export type Heading = { id: string; text: string };

const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/<[^>]+>/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

// Second-level headings get ids so the page's section index can link to them.
const marked = new Marked({
	gfm: true,
	async: false,
	renderer: {
		heading({ tokens, depth }: Tokens.Heading) {
			const text = this.parser.parseInline(tokens);
			return depth === 2 ? `<h2 id="${slugify(text)}">${text}</h2>\n` : `<h${depth}>${text}</h${depth}>\n`;
		}
	}
});

/** Content is written by Naufal in this repo, so its HTML is trusted; nothing user-submitted reaches here. */
export function renderMarkdown(body: string): string {
	return marked.parse(body) as string;
}

export function headingsOf(body: string): Heading[] {
	return marked
		.lexer(body)
		.filter((t): t is Tokens.Heading => t.type === 'heading' && t.depth === 2)
		.map((t) => ({ id: slugify(t.text), text: t.text }));
}
