import { ElementRef } from '@angular/core';

import { AffixConfig } from '../affix/affix-config';

export interface PopoverConfig {
  trigger: ElementRef;
  affix?: AffixConfig;
}
