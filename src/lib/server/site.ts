import { profile } from '#content/profile.ts';

// Present only when static/cv.pdf exists; the CV button hides itself otherwise.
const cvFile = import.meta.glob('/static/cv.pdf');

/** What every page's header and close need. */
export const site = { profile, hasCv: Object.keys(cvFile).length > 0 };
