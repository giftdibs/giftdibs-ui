import { StaticProvider } from '@angular/core';

export interface OverlayConfig {
  destroyOnOverlayClick?: boolean;
  keepAfterNavigationChange?: boolean;
  providers?: StaticProvider[];
  preventBodyScroll?: boolean;
  showBackdrop?: boolean;
}
