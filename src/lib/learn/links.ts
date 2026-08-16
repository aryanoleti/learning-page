/* Where this site lives, and where the app it teaches lives.

   The course is deployed on its own so it can be read without an account.
   The tools it refers to (quant workbench, compare desk, portfolio simulator)
   are part of StockSense proper, which is a separate deployment — so those
   links have to be absolute.

   One consequence worth knowing: progress is stored in this site's own
   localStorage, and browsers scope that per origin. The course therefore
   cannot lock or unlock anything inside StockSense; it links out, and the
   app decides its own access. */

export const APP_ORIGIN = "https://aryanoleti.github.io/Stocksense-V2";

export function appUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${APP_ORIGIN}${clean}`;
}

/* Internal routes of this site, in one place so the structure can change
   without hunting through components. */
export const ROUTES = {
  home: "/",
  placement: "/placement/",
  glossary: "/glossary/",
  lesson: (slug: string) => `/lesson/${slug}/`,
};
