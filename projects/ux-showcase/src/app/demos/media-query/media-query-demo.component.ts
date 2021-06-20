import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import {
  MediaQueryBreakpoint,
  MediaQueryService,
} from 'projects/ux/src/public-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-media-query-demo',
  templateUrl: './media-query-demo.component.html',
  styleUrls: ['./media-query-demo.component.scss'],
})
export class MediaQueryDemoComponent implements OnInit, OnDestroy {
  public breakpoint: MediaQueryBreakpoint = MediaQueryBreakpoint.Medium;

  private ngUnsubscribe = new Subject();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private mediaQueryService: MediaQueryService,
  ) {}

  public ngOnInit(): void {
    this.mediaQueryService.breakpointChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((breakpoint: MediaQueryBreakpoint) => {
        this.breakpoint = breakpoint;
        // this.changeDetector.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
