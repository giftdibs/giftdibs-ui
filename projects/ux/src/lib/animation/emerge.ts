// #region imports
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

// #endregion

const TRANSITION_SPEED = '200ms ease-in-out';

export const gdAnimationEmerge = trigger('gdAnimationEmerge', [
  state(
    'open',
    style({
      opacity: 1,
      transform: 'initial',
    }),
  ),
  state(
    'closed',
    style({
      opacity: 0,
      transform: 'scale(0.0)',
    }),
  ),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'scale(0.0)',
    }),
    animate(TRANSITION_SPEED),
  ]),
  transition(`* <=> *`, animate(TRANSITION_SPEED)),
]);
