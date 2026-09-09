# Rename TradeLingo to Lumo

## Goal
Replace the visible TradeLingo identity with Lumo throughout the existing educational trading app, without changing features, workflows, or the required disclaimer.

## Changes
- Replace every user-facing `TradeLingo` reference with `Lumo`, including page titles, descriptions, social metadata, coach copy, and the shared disclaimer.
- Add the uploaded Lumo artwork as the real brand image on the landing page, sign-in/sign-up page, onboarding flow, and shared signed-in header/navigation area.
- Keep brand placement compact on working screens so it does not displace lesson, practice, coach, or profile content.
- Create a properly sized favicon from the uploaded artwork, point the app identity to it, and remove the old template favicon.
- Preserve “Learn trading. One decision at a time.” and the exact updated disclaimer: “Lumo is an educational platform and does not provide financial or investment advice.”

## Technical details
- Store the uploaded full-size logo through the project’s asset delivery system and import its pointer where displayed.
- Generate a small square raster favicon from the same uploaded image for browser/app identity.
- Update metadata independently on every existing content route so each title and social label uses Lumo.
- Do not modify authentication, onboarding behavior, curriculum, progress, XP, streaks, paper trading, journal, coach safeguards, database logic, or navigation destinations.

## Validation
- Search the project for any remaining visible TradeLingo references.
- Verify the landing and authentication screens plus a signed-in screen at mobile and desktop widths.
- Confirm the Lumo image loads, the favicon is referenced, metadata reports Lumo, and no existing interactions regress.
