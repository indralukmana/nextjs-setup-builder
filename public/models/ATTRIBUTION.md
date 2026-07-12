# 3D demo assets

Demo meshes under `public/models/ikea/` are **not** official Monis product scans. They are illustrative stand-ins for the composed setup scene.

## IKEA-style / gaming GLBs

Per-SKU mapping lives in [`src/lib/scene-slots.ts`](../../src/lib/scene-slots.ts) (`PRODUCT_SCENE_MODELS`).

| Catalog id                 | File                                                   | Notes                            |
| -------------------------- | ------------------------------------------------------ | -------------------------------- |
| `desk-bollsidan`           | `bollsidan-desk-sitstand-electric-white.glb`           | Electric sit/stand desk          |
| `desk-mittzon`             | `mittzon-desk-walnut-black.glb`                        | Walnut desk                      |
| `desk-utespelare`          | `utespelare-gaming-desk-black.glb`                     | Gaming desk                      |
| `chair-alefjall`           | `alefjall-office-chair-glose-black.glb`                | Leather office chair             |
| `chair-gronfjall`          | `gronfjall-office-chair-armrests-gray-green-white.glb` | Office chair                     |
| `chair-gronfjall-headrest` | `gronfjall-office-chair-armheadrest-gray-black.glb`    | Office chair + headrest          |
| `monitor-gaming`           | `gaming-monitor.glb`                                   | Repeated 1–3× via `monitorCount` |
| `lamp-nymane`              | `nymane-work-lamp-white.glb`                           | Work lamp                        |
| `lamp-svallet`             | `svallet-work-lamp-dark-gray-white.glb`                | Compact lamp                     |
| `stand-lanespelare`        | `lanespelare-accessories-stand.glb`                    | Gaming accessories stand         |
| `drawer-alex`              | `alex-drawer-unit-black-brown.glb`                     | Floor drawer unit                |

Use only for local demos. Do not redistribute commercially without checking each asset’s license terms.
