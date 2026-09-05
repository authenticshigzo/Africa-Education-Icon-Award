# NESA-Africa Education Icon Award

A React and TypeScript interface for the NESA-Africa Education Icon Award. The project includes a responsive landing page, responsive navigation, dropdown menus, and a local membership sign-up/sign-in demonstration.

## Running the Project

```bash
npm install
npm run dev
```

The production build can be checked with:

```bash
npm run build
```

## Component Structure

The application is composed from a small set of focused components:

- `src/App.tsx` is the application shell. It defines the routes and selects the navigation component from the current viewport width:
  - below `768px`: `NavbarSmallScreen`
  - `768px` to below `1024px`: `NavbarMediumScreen`
  - `1024px` and above: `Navbar`
- `src/components/Body.tsx` renders the landing-page hero, background image, announcement badge, headline, supporting copy, and calls to action.
- `src/components/Navbar.tsx` contains the desktop navigation.
- `src/components/NavbarSmallScreen.tsx` and `src/components/NavbarMediumScreen.tsx` contain the responsive header and side-menu drawer.
- `src/components/Navbar*DropDown.tsx` contains the menu options for About, Icon, Recognition, Nominees, Education Impact, and Participate. The parent navbar controls which menu is open through the `isOpen` prop.
- `src/MembershipPage.tsx` renders the membership sign-up/sign-in demonstration.

## Nomination UI Flow

The nomination flow is a frontend-only demonstration using synthetic data. It does not connect to Supabase, production authentication, production credentials, or live nomination data.

Routes:

- `/nominate` displays the four recognition-tier options.
- `/nominate/tier1` opens Lifetime Achievement Recognition.
- `/nominate/tier2` opens Influencer Education Impact Recognition.
- `/nominate/tier3` opens Platinum Certificates of Recognition.
- `/nominate/tier4` opens Gold-Blue Garnet Recognition.

The tier routes share the nomination form implementation in `src/NominateTier1.tsx`. Categories are defined as local mock data, while submitted demo nominations are stored in `localStorage` under `nominations`.

The flow includes these UI states:

- **Loading:** Sign-in and nomination submission show a loading dialog and disable the active action to prevent duplicate submissions.
- **Empty:** A tier with no configured mock categories displays an explicit empty message and disables submission.
- **Error:** Missing required fields show validation feedback, and invalid demo membership details show a declined sign-in state.
- **Success:** Successful demo sign-in and nomination submission show confirmation feedback. Submitted form fields are cleared after a successful nomination.

## State and Data Flow

`App` stores the current `window.innerWidth` in state and updates it through a resize listener. That state determines which navbar is rendered. The route content remains separate from the navigation.

Each navbar owns its own UI state:

- `activeMenu` identifies the open dropdown.
- `isAnnouncementVisible` controls the announcement bar.
- `isSideMenuOpen` controls the responsive drawer.
- `messageIndex` rotates the announcement message every five seconds.

`MembershipPage` owns the form state for the user name, email, password, selected membership, authentication mode, validation error, and status. Submission follows this flow:

```text
idle -> validate -> loading -> success or declined
```

For this offline demonstration, a sign-up account is serialized to `localStorage` under `demoAccount`. Sign-in reads that record and compares the entered email and password. A `setTimeout` is used only to make the loading state visible during the demonstration.

## Accessibility Decisions

- Images have meaningful `alt` text, such as `NESA Logo`, `Search`, `Menu`, and `Close`.
- Navigation links use real React Router links, and unavailable demonstration links prevent navigation with an explanatory message.
- Form controls use semantic HTML elements: `form`, `label`, `input`, `select`, and `button`.
- Submit controls are disabled while processing to prevent repeated submissions.
- The side menu has a dedicated close control and scrolls independently when its content exceeds the viewport.
- Text and controls use contrast between the dark background, white text, and gold accent color.

For a production accessibility pass, each label should also be connected explicitly to its control with matching `htmlFor` and `id` attributes, and the menu images should be replaced or wrapped with keyboard-operable buttons with `aria-label` values.

## Mobile and Medium-Screen Decisions

The responsive layouts are designed for touch-sized controls and limited horizontal space:

- The announcement bar and header remain visible at the top.
- The menu icon opens a full-height, right-side drawer.
- The drawer has its own scroll area so long navigation does not push the page layout wider than the viewport.
- Primary actions stack vertically on narrow screens and use full available width.
- Dropdown options render in normal document flow on small and medium screens, so opening one section pushes the sections below it instead of covering them.
- The hero content uses responsive widths, left insets, text sizes, and stacked buttons for readability.
- The desktop navbar and desktop dropdown positioning are preserved for larger screens.

## Production Authentication and Backend Note

The current membership flow is an offline UI demonstration only. It must not be used for real accounts because `localStorage` stores the demo password in the browser and can be read or changed by the user.

In production, the following responsibilities would move to a secure backend and Supabase:

- Supabase Auth would create accounts, sign users in, manage sessions, handle password hashing, and support password reset or OAuth providers such as Google.
- The client would submit credentials through the Supabase Auth SDK and would never store or compare raw passwords itself.
- Membership profile data would be stored in a database table such as `profiles`, linked to `auth.users.id`.
- Membership selections, payment status, and subscription records would be stored in protected tables. Payment confirmation should come from a trusted server or payment-provider webhook, not from a client-side success message.
- Row Level Security (RLS) would be enabled on every user-owned table. Policies would restrict users to rows where `user_id = auth.uid()`; public read access would be limited to explicitly public data.
- The Supabase service-role key would remain on the server and would never be exposed in the Vite client. The browser would use only the public anon key with RLS enforcing access.
- Server-side validation would repeat all important client-side validation, including membership eligibility and payment state checks.

The localStorage implementation is therefore useful for demonstrating loading, success, declined, and session states offline, while Supabase Auth, RLS, and server-side payment verification would provide the real security boundary in a deployed application.
