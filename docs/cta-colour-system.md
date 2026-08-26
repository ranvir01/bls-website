# CTA colour system — verified contrast table

Accent scale `ember` (warm amber → burnt orange). Green (`leaf`) is retained
but demoted from ACTION to SEMANTIC use (checkmarks, trust ticks, nature motifs).

## Why the old system failed
| Pair | Ratio | Required | Result |
|---|---|---|---|
| white on leaf-600 `#257f52` | 4.96:1 | 4.5:1 | barely passes |
| leaf-600 fill vs brand-900 navy band | **2.91:1** | 3:1 (WCAG 1.4.11) | **FAILS — button shape invisible on navy** |
| onDark border white/30 vs navy | **2.50:1** | 3:1 | **FAILS — only cue, nothing to fall back on** |
| outline border ink-200 vs white | **1.23:1** | 3:1 | **FAILS** |

leaf-600 in OKLCH: L* 53.2, C 0.110, H 157°.
brand-600 in OKLCH: L* 50.4, C 0.233, H 262°.
Nearly identical lightness + half the chroma = the "muddy" reading.

## The system
| Surface | Role | Fill | Label | Fill vs page | Label vs fill |
|---|---|---|---|---|---|
| Light | primary | `#b8500a` | `#ffffff` | 5.01:1 | 5.01:1 |
| Light | hover | `#93400c` | `#ffffff` | 7.05:1 | 7.05:1 |
| Light | active | `#78350f` | `#ffffff` | 9.07:1 | 9.07:1 |
| Navy | primary | `#ffc53d` | `#002566` | 9.14:1 | 9.14:1 |
| Navy | hover | `#ffd177` | `#002566` | 10.05:1 | 10.05:1 |
| Navy | active | `#f0a01a` | `#002566` | 6.69:1 | 6.69:1 |

Secondary light: 1.5px `#64748b` border (4.76:1), label `#002566` (14.42:1), hover border `#0052e6` (6.27:1).
Secondary dark: fill `rgba(255,255,255,.12)`, 1.5px `rgba(255,255,255,.70)` border (7.69:1 vs navy, 5.49:1 vs own fill), white label (10.29:1).

Hero (unpredictable photo): gold `#ffc53d` fill + 3px `#001b4d` outer ring. Dual cue — ring carries light backdrops, fill carries dark ones. Worst case 4.79:1.

Focus ring: inner 2px `#ffffff` + outer 2px `#002566`. One of the two always clears 3:1 on every surface (white 14.42 / navy 14.42 / ember-700 5.01 / gold 9.14 / hero scrim 7.60).
