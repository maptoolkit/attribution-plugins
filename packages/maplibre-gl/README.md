# @maptoolkit/maplibre-gl-logo

Maptoolkit logo control for [MapLibre GL JS](https://maplibre.org/).

## Install

```bash
npm install @maptoolkit/maplibre-gl-logo
```

## Usage

```ts
import maplibregl from 'maplibre-gl';
import { MaptoolkitLogoControl } from '@maptoolkit/maplibre-gl-logo';

const map = new maplibregl.Map({ /* ... */ });

map.addControl(new MaptoolkitLogoControl());
// or
map.addControl(new MaptoolkitLogoControl({ position: 'top-right' }));
```

The control attaches the logo directly to the map container as an absolutely-positioned overlay, so passing a position as the second argument to `addControl` has no effect — use the `position` option instead.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'top-center' \| 'bottom-center'` | `'bottom-left'` | Where to place the logo inside the map container. |

The link target (`https://www.maptoolkit.org/`) and logo height (24px) are intentionally not configurable.

## License

MIT
