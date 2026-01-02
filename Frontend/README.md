# ReForge // Frontend _

**The Operator's Interface.**

This is not just a UI; it is a cockpit for manual code reconstruction. Designed with a "hacker-premium" aesthetic, the Frontend minimizes distraction and maximizes focus.

## Visual Identity

- **Typography**: Inter (Google Fonts) – Clean, rigorous, legible.
- **Palette**: `Void Black` (#0A0A0A), `Terminal Green` (#00FF00), `Alert Red` (#FF0000).
- **Interaction**: High-friction inputs. Every keystroke has weight.

## Core Modules

### 1. The IDE (`/src/components/ide`)
A custom-built, read-only-reference editor.
- **Monaco Editor** stripped of intelligent features.
- **Real-time Output Console** streaming raw stdout.
- **Anti-Cheat Layer** blocking paste events and focus loss.

### 2. The Dashboard (`/src/components/dashboard`)
Data visualization for your rehabilitation.
- **Muscle Memory Graph**: Typing velocity tracking.
- **Logic Flow Map**: Submission success rates over time.
- **Streak Monitor**: 24-hour rollback countdown.

## Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

---

**CODE IS THOUGHT. TYPE IT OUT.**
