import { ModalClosedEventReason } from './modal-closed-event-reason';

export interface ModalClosedEventArgs {
  reason: ModalClosedEventReason;
  data?: any;
}
