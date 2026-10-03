/**
 * Shared, reference-counted page scroll lock.
 *
 * The mobile menu and the quote sheet can hand off to each other in a single
 * click (menu → "Get an instant quote" → sheet). If each saved and restored
 * `overflow` on its own, whichever cleanup ran last could unlock the page
 * while the other overlay is still open. A counter makes the order irrelevant:
 * the page stays locked until every holder has released.
 */
let holders = 0;

export function lockScroll(): () => void {
  holders += 1;
  document.documentElement.style.overflow = "hidden";
  let released = false;
  return () => {
    if (released) return;
    released = true;
    holders = Math.max(0, holders - 1);
    if (holders === 0) document.documentElement.style.overflow = "";
  };
}
