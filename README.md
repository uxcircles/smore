# S'MORE — website redesign

A redesign concept for [S'MORE Taste of Asia](https://www.smoreasia.com/), a Taiwanese restaurant at 18 Royal Crest Avenue in the Royal Docks, London. Built as plain HTML, CSS and JavaScript.

**Pages:** Home · Menu · Our story · Contact · Book a table

## Run locally

```bash
python3 .claude/serve.py
```

Then open http://localhost:5178. (Any static file server works; this one just disables caching.)

## What this fixes on the current site

Reviewed on smoreasia.com in October 2026 (a Wix site):

- **Navigation can't be read on desktop.** Dark green menu links sit on the red header.
- **Phone layout hides the basics.** On a phone (Wix's separate mobile layout), the red banner covers the S'MORE logo and there's no Book or Order button on the first screen. The newsletter button and footer text are dark red on red.
- **No menu to browse.** The only menu is inside the Wix ordering widget. There's no page to read before visiting.
- **Template leftovers.** The footer says "© 2035 by Sai Mai". On desktop, the Facebook, Instagram and X icons link to Wix's own accounts, not @smoreasia.
- **Broken pages.** `/gift-card` and `/terms-condition` show up in search results but return 404.
- **Hours and contact details only appear in the footer.** Nothing shows whether the restaurant is open right now.

The redesign keeps the brand's red and the restaurant's own photography, and adds:

- a readable header with Book a table and Order online always in reach, plus a fixed bottom bar with both on phones
- a live "Open now until 9pm" status, worked out on London time
- a full menu page with Chinese names, prices and photos
- a booking form whose time slots follow the opening hours
- an events and catering enquiry form
- the real Instagram link

## Structure

```
index.html, menu.html, our-story.html, reservations.html, contact.html
assets/css/style.css     all styles
assets/js/main.js        mobile nav, open-now status, menu rendering, booking form
assets/js/menu-data.js   menu items and prices (from smoreasia.com/order-online)
assets/img/              photos and logo
```

## Notes

- This is a design concept, not the restaurant's official site. The booking and contact forms have no backend, and say so when they're submitted.
- Pages carry `noindex` so they stay out of search results.
- Order online links go to the restaurant's existing Wix ordering page.
- Photos and logo belong to S'MORE Taste of Asia (from smoreasia.com).
- Fonts: Archivo, Instrument Sans and Noto Serif TC, all under the SIL Open Font License.
