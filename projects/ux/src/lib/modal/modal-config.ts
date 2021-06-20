import { StaticProvider } from '@angular/core';

import { ModalSize } from './modal-size';

export interface ModalConfig {
  providers?: StaticProvider[];
  size?: ModalSize;
  clickOverlayToClose?: boolean;
}
