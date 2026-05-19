# @maptoolkit/leaflet-logo

Maptoolkit logo control for [Leaflet](https://leafletjs.com/).

## Install

```bash
npm install @maptoolkit/leaflet-logo
```

## Usage

```ts
import L from 'leaflet';
import { MaptoolkitLogoControl } from '@maptoolkit/leaflet-logo';

const map = L.map('map').setView([0, 0], 2);

new MaptoolkitLogoControl().addTo(map);
// or
new MaptoolkitLogoControl({ position: 'top-right' }).addTo(map);
```

The control attaches the logo directly to the map container as an absolutely-positioned overlay; Leaflet's built-in `position` option is bypassed. Use the `position` option below.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'top-center' \| 'bottom-center'` | `'bottom-left'` | Where to place the logo inside the map container. |

The link target (`https://www.maptoolkit.org/`) and logo height (24px) are intentionally not configurable.

## License

MIT
