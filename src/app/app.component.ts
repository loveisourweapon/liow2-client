import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'liow-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  date = new Date();
}
