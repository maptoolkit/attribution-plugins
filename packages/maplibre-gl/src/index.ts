import type { IControl, Map as MapLibreMap } from 'maplibre-gl';
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

export class MaptoolkitLogoControl implements IControl {
  private readonly position: LogoPosition;
  private container: HTMLDivElement | null = null;
  private dummy: HTMLDivElement | null = null;
  private readonly stop = (e: Event) => e.stopPropagation();

  constructor(options: MaptoolkitLogoOptions = {}) {
    this.position = options.position ?? 'bottom-left';
  }

  onAdd(map: MapLibreMap): HTMLElement {
    const container = document.createElement('div');
    container.className = `maptoolkit-logo-control maptoolkit-logo-${this.position}`;
    container.style.position = 'absolute';
    container.style.zIndex = '2';
    container.style.pointerEvents = 'auto';
    Object.assign(container.style, positionStyle(this.position));

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
    container.appendChild(anchor);

    for (const evt of STOP_EVENTS) {
      container.addEventListener(evt, this.stop);
    }

    map.getContainer().appendChild(container);
    this.container = container;

    const dummy = document.createElement('div');
    dummy.style.display = 'none';
    this.dummy = dummy;
    return dummy;
  }

  onRemove(): void {
    if (this.container) {
      for (const evt of STOP_EVENTS) {
        this.container.removeEventListener(evt, this.stop);
      }
      this.container.remove();
      this.container = null;
    }
    if (this.dummy) {
      this.dummy.remove();
      this.dummy = null;
    }
  }

  getDefaultPosition(): 'bottom-left' {
    return 'bottom-left';
  }
}
