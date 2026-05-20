# Maptoolkit Attribution Plugins

Logo/attribution controls for map libraries. Drop-in plugins that render the Maptoolkit logo on a map.

## Packages

| Package | Status |
| --- | --- |
| [`@maptoolkit/maplibre-gl-logo`](packages/maplibre-gl) | Available |
| [`@maptoolkit/leaflet-logo`](packages/leaflet) | Available |

## Usage

### MapLibre GL JS

```bash
npm install @maptoolkit/maplibre-gl-logo
```

```ts
import { MaptoolkitLogoControl } from '@maptoolkit/maplibre-gl-logo';

map.addControl(new MaptoolkitLogoControl());
// or: new MaptoolkitLogoControl({ position: 'top-right' })
```

### Leaflet

```bash
npm install @maptoolkit/leaflet-logo
```

```ts
import { MaptoolkitLogoControl } from '@maptoolkit/leaflet-logo';

new MaptoolkitLogoControl().addTo(map);
// or: new MaptoolkitLogoControl({ position: 'top-right' }).addTo(map)
```

## Development

```bash
npm install
npm run build
```

`build:logo` regenerates the embedded logo for all packages from `assets/logo.png`.

## Release

```bash
# 1. Bump version in the package you're releasing
cd packages/<name>
npm version patch   # or minor / major

# 2. Build, commit, push
cd ../..
npm run build
git add -A && git commit -m "Release <name>@<new-version>"
git push

# 3. Publish (requires `npm login` + maptoolkit npm-org membership)
npm publish -w @maptoolkit/<name>

# 4. Tag the release commit
git tag '@maptoolkit/<name>@<new-version>'
git push --tags
```

## License

MIT
