import L from 'leaflet';
import { LOGO_DATA_URI } from './logo.generated';

export type LogoPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

export interface MaptoolkitLogoOptions {
  position?: LogoPosition;
}

const HREF = 'https://www.maptoolkit.org/';
const HEIGHT = 24;
const MARGIN = 8;

const STOP_EVENTS = ['mousedown', 'click', 'touchstart', 'dblclick', 'wheel'] as const;

function positionStyle(position: LogoPosition): Partial<CSSStyleDeclaration> {
  const m = `${MARGIN}px`;
  switch (position) {
    case 'top-left':
      return { top: m, left: m };
    case 'top-right':
      return { top: m, right: m };
    case 'bottom-left':
      return { bottom: m, left: m };
    case 'bottom-right':
      return { bottom: m, right: m };
    case 'top-center':
      return { top: m, left: '50%', transform: 'translateX(-50%)' };
    case 'bottom-center':
      return { bottom: m, left: '50%', transform: 'translateX(-50%)' };
  }
}

export class MaptoolkitLogoControl extends L.Control {
  private readonly _logoPosition: LogoPosition;
  private _overlay: HTMLDivElement | null = null;
  private readonly _stop = (e: Event) => e.stopPropagation();

  constructor(options: MaptoolkitLogoOptions = {}) {
    super({ position: 'bottomleft' });
    this._logoPosition = options.position ?? 'bottom-left';
  }

  onAdd(map: L.Map): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = `maptoolkit-logo-control maptoolkit-logo-${this._logoPosition}`;
    overlay.style.position = 'absolute';
    overlay.style.zIndex = '1000';
    overlay.style.pointerEvents = 'auto';
    Object.assign(overlay.style, positionStyle(this._logoPosition));

    const anchor = document.createElement('a');
    anchor.href = HREF;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = LOGO_DATA_URI;
    img.alt = 'Maptoolkit';
    img.height = HEIGHT;
    img.style.display = 'block';
    anchor.appendChild(img);
    overlay.appendChild(anchor);

    for (const evt of STOP_EVENTS) {
      overlay.addEventListener(evt, this._stop);
    }

    map.getContainer().appendChild(overlay);
    this._overlay = overlay;

    const dummy = document.createElement('div');
    dummy.style.display = 'none';
    return dummy;
  }

  onRemove(_map: L.Map): void {
    if (this._overlay) {
      for (const evt of STOP_EVENTS) {
        this._overlay.removeEventListener(evt, this._stop);
      }
      this._overlay.remove();
      this._overlay = null;
    }
  }
}
