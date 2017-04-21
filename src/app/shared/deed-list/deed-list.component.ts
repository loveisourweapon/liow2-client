import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Deed } from '../../core/models';
import { DeedService } from '../../core/services/deed.service';

@Component({
  selector: 'liow-deed-list',
  templateUrl: './deed-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListComponent implements OnInit {
  @Input() layout: string;

  deeds$: Observable<Deed[]>;

  constructor(
    private deedService: DeedService,
  ) { }

  ngOnInit(): void {
    this.deeds$ = this.deedService.find();
    this.deedService.countAll();
  }
}
