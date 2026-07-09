# Decisions Log — Team Member Cards

## Fitting the existing design system
I treated `.peacock-card` / `.item` / `.block` as a component contract, not a
one-off template, and built `four-column-styles.css` as a sibling to
`three-column-styles.css` rather than a from-scratch stylesheet: same tokens
(`--brand-accent-tan`, `--brand-primary-blue`), same fonts (Bebas Neue /
Roboto Slab), same `scroll-reveal` entrance behavior, same border-left
column-divider pattern, same mobile stacking rule (single column,
`border-bottom` instead of `border-left`). The four-column variant only adds
what it needs to: a `--four-column` modifier class and a few team-specific
sub-classes (`.name`, `.role`, `.dept`, `.contact-list`).

One deliberate addition: an intermediate 2-column tablet breakpoint
(768–991px) that three-column doesn't have. Four cards across needs more
horizontal room than three does, so going straight from 4 columns to a full
stack left an awkward gap on tablet widths. The final mobile behavior is
unchanged from the existing pattern.

## Missing data (Sofía / Daniel / Grace)
Three of eight records are missing phone, email, or both. I hide the
contact row entirely when a field is absent, rather than rendering an em
dash. The dash in the source export reads to me as a *data-authoring*
convention (marking a field as checked-and-empty in the spreadsheet), not
something that should surface in the UI — showing "—" next to a phone icon
looks like a broken link to a site visitor. Grace Abara's card (no phone,
no email) simply ends after the department line, which still reads as a
complete, valid card rather than a broken one.

**This is a judgment call I'd want product/content sign-off on** — the
alternative (always show the row, with a "contact department" fallback
link) is equally defensible and worth asking about directly.

## The "College / Department" field isn't always academic
James Okafor's row has "Wesley Residence Hall" in that column, not an
academic department. Rather than hard-code a label like "Department:" I
render the raw value with no prefix, so the field works for faculty, staff,
and RAs alike without a label that's wrong two-thirds of the time it counts.
**Question I'd ask:** should this field carry a visually distinct treatment
for non-academic org units, or is "just show the value" the right call?

## Long name / long title (Bartholomew Throckmorton-Whitfield III)
No truncation or line-clamp on name or title — for a person-directory card,
the exact job title is the content, not decorative filler, so clipping it
felt wrong. I let it wrap naturally and rely on flexbox to keep card heights
in a row roughly aligned. With more time I'd add a max-height + fade for the
rare truly extreme case, but didn't want to solve for a problem this data
set doesn't actually have.

## Photo choice: initials avatar, not a random headshot service
All eight records say "photo: yes," but the export has no actual image
asset, so I needed a placeholder strategy either way. I used a generated
initials avatar (ui-avatars.com) in brand navy/tan instead of a random
stock-face service (e.g. pravatar), for three reasons: it's deterministic
per name (no re-rolled faces on refresh), it's clearly a placeholder rather
than a photo of a real stranger standing in for a named ORU staff member,
and it's on-brand by default. The `<img>` markup is a drop-in slot — swapping
in real CMS-managed headshots later is a one-line change in `team-cards.js`.

## Data-driven render instead of hardcoded markup
The eight cards are rendered from a JS data array (`js/team-cards.js`)
rather than eight copy-pasted HTML blocks. This mirrors how the component
will likely actually get its data (a CMS feed or API response) and keeps
all the missing-field logic in one place instead of scattered across
markup. It also made the edge cases easier to reason about and test.

## Scroll-reveal reimplementation
The three-column starter markup ships with the `scroll-reveal is-visible`
classes already present, which implies a shared site script toggles
visibility on intersection elsewhere in the real codebase. That script
wasn't part of the starter files, so `team-cards.js` includes a minimal
`IntersectionObserver` implementation so the standalone page behaves
correctly on its own. This would be deleted in favor of the real site
script during actual integration.

## What I'd do with more time
- Real focus-state and keyboard-navigation testing pass beyond the basics.
- A documented data contract (e.g. JSON Schema) for the eight fields, since
  that's the actual integration point once this leaves standalone HTML.
- A short automated test for the render function covering all four missing-
  field permutations (both present, phone only, email only, neither).

## What I intentionally left out
- Any icon system for phone/email — the starter files don't define one, and
  inventing icons not in the existing design system felt like scope creep
  rather than a good judgment call.
- CMS integration itself — out of scope per the brief.
