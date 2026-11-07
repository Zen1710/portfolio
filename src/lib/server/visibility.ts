/** Drafts are visible while developing locally, never on the live site. */
export function isVisible(item: { draft?: boolean }, includeDrafts: boolean) {
	return includeDrafts || !item.draft;
}
