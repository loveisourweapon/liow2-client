import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import * as inViewport from 'in-viewport';

@Directive({
  selector: '[uiInViewport]',
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  @Output() inViewport = new EventEmitter<void>();

  private isInViewport = false;
  private watcher: any;
  private resetTimer: any;

  constructor(
    private element: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    this.watcher = inViewport(this.element.nativeElement, this.handleInViewport.bind(this));
  }

  ngOnDestroy(): void {
    this.watcher.dispose();
    if (this.resetTimer) { clearInterval(this.resetTimer); }
  }

  private handleInViewport(): void {
    if (this.isInViewport) { return; }

    this.isInViewport = true;
    this.inViewport.emit();

    this.resetTimer = setInterval(() => {
      if (!inViewport(this.element.nativeElement)) {
        this.isInViewport = false;
        this.watcher.watch();
        clearInterval(this.resetTimer);
        this.resetTimer = null;
      }
    }, 300);
  }
}
