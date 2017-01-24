import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'liow-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JumbotronComponent implements OnChanges, OnInit {
  @Input() image: string;
  @Input() background: string;
  @Input() classes: string[] = [];

  backgroundUrl: string;
  hasContent: boolean;

  constructor(
    private element: ElementRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['background']) {
      this.backgroundUrl = this.background ? `url(${this.background})` : 'none';
    }
  }

  ngOnInit(): void {
    const contentElement = this.element.nativeElement.querySelector('[jumbotron-content]');
    this.hasContent = contentElement != null;
  }
}
