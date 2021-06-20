import { Injectable, NgZone, OnDestroy } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { WindowRefService } from '../window/window-ref.service';

import { MediaQueryBreakpoint } from './media-query-breakpoint';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService implements OnDestroy {
  public get breakpointChange(): Observable<MediaQueryBreakpoint> {
    if (!this.mediaQueries.length) {
      this.addListeners();
    }

    return this._breakpointChange;
  }

  private mediaQueries: {
    mediaQueryList: MediaQueryList;
    listener: (event: MediaQueryListEvent) => void;
  }[] = [];

  private breakpoints: {
    mediaQueryString: string;
    name: MediaQueryBreakpoint;
  }[] = [
    {
      mediaQueryString: '(max-width: 499px)',
      name: MediaQueryBreakpoint.XXSmall,
    },
    {
      mediaQueryString: '(min-width: 500px) and (max-width: 767px)',
      name: MediaQueryBreakpoint.XSmall,
    },
    {
      mediaQueryString: '(min-width: 768px) and (max-width: 991px)',
      name: MediaQueryBreakpoint.Small,
    },
    {
      mediaQueryString: '(min-width: 992px) and (max-width: 1199px)',
      name: MediaQueryBreakpoint.Medium,
    },
    {
      mediaQueryString: '(min-width: 1200px)',
      name: MediaQueryBreakpoint.Large,
    },
  ];

  private _breakpointChange = new BehaviorSubject<MediaQueryBreakpoint>(
    MediaQueryBreakpoint.Medium,
  );

  constructor(private windowRef: WindowRefService, private zone: NgZone) {}

  public ngOnDestroy(): void {
    this.removeListeners();
    this._breakpointChange.complete();
  }

  private addListeners(): void {
    this.mediaQueries = this.breakpoints.map((breakpoint: any) => {
      const mq = this.windowRef.nativeWindow.matchMedia(
        breakpoint.mediaQueryString,
      );

      const listener = (event: MediaQueryListEvent) => {
        // Remove listeners if there are no more observers.
        if (!this._breakpointChange.observers.length) {
          this.removeListeners();
          return;
        }

        // Run the check outside of Angular's change detection since Angular
        // does not wrap matchMedia listeners in NgZone.
        // See: https://blog.assaf.co/angular-2-change-detection-zones-and-an-example/
        this.zone.run(() => {
          if (event.matches) {
            this._breakpointChange.next(breakpoint.name);
          }
        });
      };

      mq.addListener(listener);

      if (mq.matches) {
        this._breakpointChange.next(breakpoint.name);
      }

      return {
        mediaQueryList: mq,
        listener,
      };
    });
  }

  private removeListeners(): void {
    this.mediaQueries.forEach((mediaQuery) => {
      mediaQuery.mediaQueryList.removeListener(mediaQuery.listener);
    });
    this.mediaQueries = [];
  }
}
