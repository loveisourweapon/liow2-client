import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'liow-control-panel-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelSearchComponent implements AfterViewInit {
  @Input() query: string;
  @Output() search = new EventEmitter<string>();

  private readonly searchDebounce = 300;
  private debounceTimer;

  constructor(
    private element: ElementRef,
  ) { }

  onQueryChange(query: string) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => this.search.emit(query), this.searchDebounce);
  }

  ngAfterViewInit(): void {
    const element = this.element.nativeElement;
    if (element.hasAttribute('autofocus')) {
      const inputElement = element.querySelector('input');
      if (inputElement) { inputElement.focus(); }
    }
  }
}
