/* Where this site lives, and where the app it teaches lives.

   The course is deployed on its own so it can be read without an account.
   The tools it refers to (Quant Engine, Deep Research, Compare, Portfolio)
   are part of InvestSense, which is a separate deployment — so those links
   have to be absolute.

   One consequence worth knowing: progress is stored in this site's own
   localStorage, and browsers scope that per origin. The course therefore
   cannot lock or unlock anything inside InvestSense; it links out, and the
   app decides its own access. */

export const APP_ORIGIN = "https://investsense.ai";

export function appUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${APP_ORIGIN}${clean}`;
}

/* InvestSense Notebook: a separate site where each tool course has a study
   notebook (chat, audio overview, slides, quiz, flashcards). It sits on the
   same origin, so it can read this course's saved progress. */
export const NOTEBOOK_ORIGIN = "https://aryanoleti.github.io/learning-notebook/";

export function notebookUrl(notebookId: string): string {
  return `${NOTEBOOK_ORIGIN}#/n/${notebookId}`;
}

/* Internal routes of this site, in one place so the structure can change
   without hunting through components. */
export const ROUTES = {
  home: "/",
  placement: "/placement/",
  glossary: "/glossary/",
  lesson: (slug: string) => `/lesson/${slug}/`,
  exam: (slug: string) => `/lesson/${slug}/exam/`,
};
