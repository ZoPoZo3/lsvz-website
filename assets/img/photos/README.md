# Photos

Real LSVZ photos live here, organized in one subfolder per page so it's
always obvious where a photo came from and which page uses it:

```
photos/
  home/              → index.html
  history/           → history.html
  events-upcoming/   → events-upcoming.html
  events-past/       → events-past.html
  staff/             → staff.html
  join/              → join.html
```

Drop a file in the matching folder and reference it from that page's HTML
with a relative path, e.g. `assets/img/photos/history/founding-1990.jpg`.
JPG/WEBP recommended for photos (smaller than PNG); keep filenames
lowercase with hyphens, no spaces (e.g. `welcome-fiesta-2025.jpg`).

## Already wired up

- `home/hero.jpg` — the home page's scroll-expand cover photo
  (`index.html`, `.scroll-expand__media`). Landscape, at least 1600px
  wide, since it fills the full viewport width when fully expanded.
- `history/bar-latino.avif` — 2006 timeline item, the Latin Club era
  (`history.html`, `.timeline-v__media`); a "Bar Latino" sign is visible.
- `history/lsvz-bar.avif` — 2007 timeline item, the re-founding as LSVZ;
  an LSVZ banner at a bar/club night.
- `history/vorstand.avif` — "Same era" timeline item; board members in
  matching LSVZ polos.
- `history/grupo1.avif` — the epilogue ("The reactivation"), the team
  that reactivated the association. Four files supplied as .avif and
  kept in that format (no conversion tooling available in this
  environment; every current browser decodes AVIF fine as an `<img src>`).

## Still placeholders

The 2010 and 2010–2011 timeline items (`history.tl3`/`history.tl4`) plus
staff portraits and the join page are still a decorative azulejo tile
standing in for a real image — search a page for `placeholder-photo` to
find each spot, drop the real file in the matching subfolder above, and
swap the placeholder markup for an `<img>` pointing to it.

## Past events (one subfolder per event)

Each past event gets its own subfolder under `events-past/`, named with
the same slug as its gallery page:

```
photos/events-past/<slug>/
  cover.jpg   → shown on the events-past.html card
  01.jpg      → gallery photos, in the order they should appear
  02.jpg
  ...
```

Drop files in with any names — they get renamed to this convention (and
the corresponding `<img>` tags added to `events-past/<slug>.html`) as part
of wiring each event up. 15-20 gallery photos per event is the target;
mixed orientations (portrait/landscape/square) is what makes the masonry
wall on the event page look varied rather than monotonous, so no need to
crop everything to match.

Events already set up (newest first):

- `lsvz-x-mapz-padel-tournament/` — LSVZ x MAPZ Padel Tournament, 25.04.2026
  (`events-past/lsvz-x-mapz-padel-tournament.html`) — done: 13 photos + cover,
  Drive link wired up. (2 of the 15 uploaded files were .CR2 RAW with an
  already-edited .jpg counterpart provided, used directly; 1 more had no
  edited counterpart and was converted here, same method as delirio-vol-1.)
- `ski-weekend-vol-3/` — Ski-Weekend [Vol.3], 27-29.03.2026
  (`events-past/ski-weekend-vol-3.html`) — done: 14 photos + cover, Drive link wired up.
- `delirio-vol-2/` — Delirio [Vol.2], 20.03.2026
  (`events-past/delirio-vol-2.html`) — done: 22 photos + cover, Drive link wired up.
- `futsal-tournier/` — Futsal Tournier, 15.03.2026
  (`events-past/futsal-tournier.html`) — done: 11 photos + cover, Drive link wired up.
- `a-kilometer-for-science/` — A Kilometer for Science, 16.10.2025
  (`events-past/a-kilometer-for-science.html`) — done: 17 photos + cover, Drive link wired up.
- `delirio-vol-1/` — Delirio [Vol.1], 10.10.2025
  (`events-past/delirio-vol-1.html`) — done: 15 photos + cover, Drive link
  wired up. (12 of the 15 were uploaded as .CR2 camera RAW files; converted
  to .jpg here since Lightroom/DPP weren't available.)
- `vibora-vol-1/` — Víbora [Vol.1], 12.04.2025
  (`events-past/vibora-vol-1.html`) — done: 19 photos (selected from 38 uploaded) + cover, Drive link wired up.
- `white-party/` — White Party, 04.04.2025
  (`events-past/white-party.html`) — done: 15 photos + cover, Drive link wired up.
- `ski-weekend-vol-2/` — Ski-Weekend [Vol.2], 16.03.2025
  (`events-past/ski-weekend-vol-2.html`) — done: 14 photos + cover, Drive link wired up.
- `papaya-vol-8/` — Papaya [Vol.8], 07.03.2025
  (`events-past/papaya-vol-8.html`) — done: 12 photos + cover, Drive link wired up.
- `christmas-dinner/` — Christmas Dinner, 13.12.2024
  (`events-past/christmas-dinner.html`) — done: 11 photos + cover, Drive link wired up.
- `papaya-vol-7/` — Papaya [Vol.7], 29.11.2024
  (`events-past/papaya-vol-7.html`) — done: 17 photos + cover, Drive link wired up.
- `padel-tournament-vol-2/` — Padel Tournament [Vol.2], 16.11.2024
  (`events-past/padel-tournament-vol-2.html`) — done: 19 photos + cover, Drive link wired up.
- `halloween-party/` — Halloween Party, 31.10.2024
  (`events-past/halloween-party.html`) — done: 14 photos + cover, Drive link wired up.
- `papaya-vol-6/` — Papaya [Vol.6], 11.10.2024
  (`events-past/papaya-vol-6.html`) — done: 13 photos + cover, Drive link wired up.
- `padel-tournament/` — Padel Tournament, 14.05.2024
  (`events-past/padel-tournament.html`) — done: 10 photos + cover, Drive link wired up.
- `papaya-vol-5/` — Papaya [Vol.5], 15.03.2024
  (`events-past/papaya-vol-5.html`) — done: 11 photos + cover, Drive link wired up.
- `papaya-vol-4/` — Papaya [Vol.4], 20.10.2023
  (`events-past/papaya-vol-4.html`) — done: 15 photos + cover, Drive link wired up.
- `menage-a-quatre/` — Ménage à Quatre, 11.05.2023
  (`events-past/menage-a-quatre.html`) — done: 16 photos + cover, Drive link wired up.
