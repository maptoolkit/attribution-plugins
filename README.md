# Maptoolkit Attribution Plugins

Logo/attribution controls for map libraries. Drop-in plugins that render the Maptoolkit logo on a map.

## Packages

| Package | Status |
| --- | --- |
| [`@maptoolkit/maplibre-gl-logo`](packages/maplibre-gl) | Available |
| `@maptoolkit/leaflet-logo` | Planned |

## Usage (MapLibre GL JS)

```bash
npm install @maptoolkit/maplibre-gl-logo
```

```ts
import { MaptoolkitLogoControl } from '@maptoolkit/maplibre-gl-logo';

map.addControl(new MaptoolkitLogoControl());
// or: new MaptoolkitLogoControl({ position: 'top-right' })
```

## Development

```bash
npm install
npm run build
```

`build:logo` regenerates the embedded logo for all packages from `assets/logo.svg`.

## License

MIT
