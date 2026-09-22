# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS (no framework, no build step). User confirmed; wants a modern, animated feel (element transitions, scroll-driven motion) comparable to apple.com.

## Users

Primary users are Latino/Hispanic (and Spanish-speaking) students at universities in Zurich (ETH/UZH and others), who are current or prospective members of LSVZ. Secondary audience: non-Spanish-speaking students in Zurich curious about joining or attending events (English is the primary site language; a Spanish toggle is provided).

## Product Purpose

LSVZ's website represents the association online: it tells visitors who the association is (history), shows what it does (upcoming and past events), introduces the people running it (staff), and converts interested students into members via a signup form. It replaces an existing site the user describes as outdated, generic, and overly simple.

## Positioning

A Latino/Hispanic student association site with a distinct Mediterranean/Latino visual identity (warm red + bone/off-white palette) rather than a generic, templated student-club look — the explicit reason for this redesign.

## Operating Context

- Site is a multi-page static site: Home, History, Upcoming Events, Past Events, Staff, Become a Member.
- Membership signups are already handled by an existing Google Form wired to a spreadsheet; the new site's "Become a Member" section must surface that existing form (not replace it) — the user is undecided whether to embed it inline or link out to it, we will embed it for continuity of look while it is safe to do so.
- Development workflow: Claude builds/edits files directly in this project directory; user reviews in VS Code / browser.

## Capabilities and Constraints

- No backend/build tooling — everything must run as static files openable in a browser / deployable to basic static hosting.
- Membership form: existing Google Form (connected to a spreadsheet) is the system of record. URL/embed code not yet provided by the user.
- Real assets confirmed to exist but not yet supplied to this session: current logo, past-event photos, social media / contact links. Until supplied, these are placeholders clearly marked for replacement.
- Bilingual requirement: English as default language, with a working toggle to Spanish (Castellano). Scope for this first pass: UI chrome and section copy get the toggle; deep content translation can expand later.

## Brand Commitments

- Name: LSVZ (Latino student association in Zurich).
- Palette direction is binding, given directly by the user: red and white/bone tones ("Mediterranean" feel), avoiding overly intense/saturated red — play across warm off-white and muted-to-vivid red shades.
- Desired feel: modern, not generic/templated; noticeably more animated/dynamic than the old site (comparable in polish to apple.com), with a Latino/Hispanic-Mediterranean warmth rather than a cold corporate look.

## Evidence on Hand

- No real copy, photos, logo files, or social links have been supplied to this session yet. Do not fabricate specific facts (founding year, member counts, testimonials, staff names) — use clearly-labeled placeholders until the user supplies real content for the "fill in the template" pass.

## Product Principles

1. Identity over genericness: every section should read as LSVZ, not as an interchangeable student-club template.
2. Warm Mediterranean/Latino restraint: red is a strong accent and mood, not a loud, oversaturated wall of color — balance with bone/off-white space.
3. Motion with purpose: animations (scroll reveals, smooth transitions) should feel premium and intentional, never gratuitous or janky.
4. Structure first, content second: ship a complete, consistent template/skeleton across all six sections now; real content and assets are swapped in once supplied.
5. Don't break what works: the existing Google Form/Excel membership pipeline stays the system of record; the new site integrates with it rather than replacing it.

## Accessibility & Inclusion

No specific standard mandated yet; default to solid baseline practices (color contrast, keyboard navigation, semantic HTML) since none was explicitly requested.
