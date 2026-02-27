# Assignment-12 — Pirate Blackjack
**Theme:** Pirate / Treasure
**File:** `index.html` (single-file, self-contained)

---

## Overview
A casino-style Blackjack game wrapped in a pirate/treasure aesthetic. All HTML, CSS, and JavaScript live in one `index.html` file — no external assets, no frameworks.

---

## Visual Design

### Background
- Deep treasure-cave atmosphere: dark brown-black radial gradients simulating torchlight
- 24 floating treasure items (💎 diamonds, ♦ rubies/emeralds/sapphires, 🪙💰 gold coins, ▬ gold bars, 💍 rings, ⚜️ emblems) scattered around the screen edges
- Each item fades in/out and bobs with randomized rotation, duration, and delay via CSS custom properties
- Colored `drop-shadow` glows match each gem type (red for rubies, green for emeralds, blue for sapphires, gold for coins)

### Table
- Oval shape (`border-radius: 50% / 30%`)
- Wood-plank texture built from layered `repeating-linear-gradient` (vertical grain striations + horizontal plank seams) over a warm brown base
- Thick dark-mahogany border with a gold accent ring via `box-shadow`
- Center table text (☠ · "Blackjack Pays 3 to 2" · dealer rules · insurance) rendered at low opacity

### Cards
- **Face-up:** Parchment-tinted white (`#fffef4`), rank + suit in corners, large suit pip centered; red suits in `#c0392b`
- **Face-down:** Dark red diagonal stripe pattern with a centered ☠ skull, gold inner border
- **Deal animation:** Cards fly in from the top-right corner (`translateX/Y` + `rotate` + `scale`) over 0.38s

### Control Dock
- Fixed wood-grain bar at bottom
- **Bankroll display:** "💰 Treasure Chest" label with green balance figure
- **Coin selector:** Four CSS-styled gold coins — silver (1), bronze (5), gold (25), royal doubloon (100) — with inset shine, border, and colored glow on selection
- **Action buttons:** Pirate-labeled — "Set Sail ⛵", "Hit 🃏", "Hold Fast ⚓", "Double ⚔️", "Split 💰", "↩ Return"

---

## Game Rules
| Rule | Detail |
|------|--------|
| Shoe | 6 decks (312 cards); reshuffles when < 25% remains |
| Aces | Dynamic: 11 or 1 |
| Face cards | Worth 10 |
| Dealer | Draws on ≤ 16; stands on all 17s (including soft 17) |
| Blackjack payout | 3 : 2 |
| Standard win | 1 : 1 |
| Push | Bet returned |
| Insurance | Offered when dealer shows Ace; costs half the wager; pays 2 : 1 |
| Double Down | First two cards only; doubles bet, one card dealt, turn ends |
| Split | Available when both cards share the same numeric value |

---

## Player Actions
- **Set Sail (Deal)** — starts a new round (requires a wager)
- **Hit** — draw one card
- **Hold Fast (Stand)** — end turn, trigger dealer play
- **Double** — double the bet, receive one card, stand
- **Split** — split a matching pair into two hands
- **↩ Return (Clear Bet)** — return chips to treasure chest before dealing

---

## Outcome Messages (Pirate-Flavored)
| Outcome | Message |
|---------|---------|
| Blackjack | "Arrr! Blackjack!" — paid 3:2 |
| Win | "Ye Win, Matey! ⚓" |
| Push | "Dead Man's Draw" |
| Dealer wins | "Davy Jones Wins! ☠" |
| Bust | "💥 CANNON FIRE! 💥" + cannon sound |
| Broke | "Marooned!" — chest refills to $1,000 |

---

## Sound
- **Cannon boom on bust** — synthesized entirely via the Web Audio API (no audio files)
  - Sawtooth oscillator: 110 Hz → 22 Hz exponential ramp over 0.9s
  - White-noise burst with an amplitude envelope for the initial crack
  - Gracefully silenced if the browser blocks audio context creation

---

## Technical Architecture
- **Single file:** `index.html` with internal `<style>` and `<script>` blocks
- **GameState object** tracks: `shoe`, `playerHand`, `dealerHand`, `bankroll`, `currentBet`, `selectedChip`, `phase`, `insuranceBet`, `splitHands`
- **`render()`** is the single source of truth — clears and redraws all card zones, updates bet/balance, and manages button disabled states on every state change
- **Phases:** `betting` → `player` → `dealer` → `over` → (auto-reset after 2.7s) → `betting`
- **Treasure scatter** runs once at page load as an IIFE, appending fixed-position elements to `<body>` with randomized CSS custom properties
