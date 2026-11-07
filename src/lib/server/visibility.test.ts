import { describe, expect, it } from 'vitest';
import { isVisible } from './visibility.ts';

describe('isVisible', () => {
	it('hides drafts on the live site', () => {
		expect(isVisible({ draft: true }, false)).toBe(false);
		expect(isVisible({ draft: false }, false)).toBe(true);
		expect(isVisible({}, false)).toBe(true);
	});

	it('shows drafts while developing', () => {
		expect(isVisible({ draft: true }, true)).toBe(true);
	});
});
