# Fake News Detection — Design Direction

## Three initial approaches

### Theme Name: Signal Desk
Very Brief Intro: A calm editorial workspace inspired by classroom annotation, evidence cards, and the quiet confidence of a research desk. It makes uncertainty legible without making the interface feel clinical.
Probability: 0.07

### Theme Name: Broadcast Intercept
Very Brief Intro: A darker, high-contrast monitoring console with restrained amber signal accents and visual markers borrowed from newsroom control rooms. It treats each analysis as a live event.
Probability: 0.03

### Theme Name: Margin Notes
Very Brief Intro: A paper-led academic interface with generous margins, annotated labels, and tactile document cues. It feels like a professor’s carefully marked-up reading packet.
Probability: 0.08

## Chosen approach: Signal Desk

### Design Movement
Contemporary editorial modernism with the material language of an annotated research desk: ink-black type, warm paper surfaces, graphite rules, cobalt evidence marks, and a single coral warning signal.

### Core Principles
1. **Prediction is not proof.** The layout gives the model result prominence but keeps evidence and limitations visibly adjacent.
2. **Evidence has a physical form.** Thin rules, index labels, highlighted phrases, and clipped cards make the analysis feel inspectable rather than magical.
3. **Calm before alarm.** The default state is warm and clear; the coral accent is reserved for uncertainty, warnings, and the Fake label.
4. **Classroom-ready density.** The interface supports a teacher explaining the system aloud: one clear action, one legible result, and optional depth.

### Color Philosophy
The base is a pale parchment (#F3F0E8) rather than sterile white, giving the product the atmosphere of a printed research sheet. Ink (#192127) carries long-form reading and primary hierarchy. Cobalt (#3158D4) is the ownable evidence color: analytical, focused, and used for the action state and model signals. Coral (#E05B48) is reserved for the Fake prediction and caution so it carries semantic weight. Sage (#B8C3AE) softens the Not Fake state without implying proof.

### Layout Paradigm
A split editorial desk: a narrow left rail establishes the product thesis and workflow, while the main canvas is an offset working surface. The result is not a centered landing page; it reads like an open case file with a persistent “what this means” margin.

### Signature Elements
- A vertical **evidence rail** with small rotated labels and a cobalt line that visually connects input, signal, and result.
- A tactile **case-file card** with a clipped top edge, paper shadow, and index metadata.
- A recurring **signal mark**: a small outlined ring with a single offset dot used for “model signal,” “not verified,” and status markers.

### Interaction Philosophy
Interactions should feel like handling a research artifact: tabs switch with a short sliding underline, the evidence rail fills as the user moves through the workflow, and result panels reveal in a restrained upward motion. Buttons use direct language—“Analyze this item,” “Try another item,” and “Show how it works.” No interaction should imply certainty that the model does not possess.

### Animation
Use 180–240ms ease-out transitions for tab changes, buttons, and result reveals. On analysis submit, animate the evidence rail marker from input to reading to signal, with reduced motion disabling the travel and retaining only state changes. Use opacity and translateY only. Respect `prefers-reduced-motion` and never animate the warning label itself.

### Typography System
- **Display:** Fraunces, 600–700, used for the main thesis and result labels. Its editorial character makes the page feel authored without becoming nostalgic.
- **Body:** DM Sans, 400–600, used for readable instructional text and form controls.
- **Utility:** IBM Plex Mono, 500, used for case IDs, input type labels, confidence numerals, and metadata.

Hierarchy: display headline 56/0.95 desktop and 40/1 mobile; section title 24/1.1; body 16/1.5; utility 11/1.2 with 0.12em tracking. Avoid all-caps paragraphs; reserve uppercase for tiny metadata labels.

### Brand Essence
A transparent fake-news detection teaching tool for educators who want learners to inspect the model, not worship the verdict.

Personality adjectives: **observant, grounded, candid**.

### Brand Voice
Headlines are concise and thesis-like. CTAs describe the action and never oversell certainty. Microcopy names limitations plainly, without apology or alarmism.

Example lines:
- “A prediction is a starting point for checking, not the check itself.”
- “Show me the signals behind this call.”

### Wordmark & Logo
The mark is a bold, text-free symbol formed from two offset quotation brackets enclosing a small evidence dot. The brackets suggest competing claims; the dot represents the model’s signal between them. It should be drawn as a compact cobalt-and-ink geometric mark and used at a clearly visible size in the header and favicon.

### Signature Brand Color
**Signal Cobalt — #3158D4.** It is used for the primary action, the evidence rail, focused states, and model-signal markers. Coral is semantic warning, not the brand color.

## Style Decisions

- Use warm parchment as the main surface and ink as the main text color.
- Use cobalt for action and evidence, coral only for Fake and caution, and sage for Not Fake without equating it with verified truth.
- Use an offset editorial layout with a left rail and a broad working canvas.
- Use Fraunces, DM Sans, and IBM Plex Mono; do not use Inter.
- Keep the product’s educational disclaimer visible near the result and treat it as core interface content.
- Use generated visuals only for the small brand mark and subtle atmosphere; the main product interaction must remain legible and functional.

## Style Decisions

- The evidence rail must read as a continuous visual spine linking the thesis, input desk, model signals, and teaching note.
- The main working surface should feel like a tactile case file through clipped corners, index metadata, and offset paper layers.
- Large cobalt fields should carry evidence rings and marginal annotations so the color remains specific to Signal Desk rather than reading as a generic SaaS banner.
