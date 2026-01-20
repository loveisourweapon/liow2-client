import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { has } from 'lodash';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AlertifyService, AuthService, EnvironmentService, TitleService } from '../../core/services';

@Component({
  templateUrl: './confirm-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit {
  constructor(
    public env: EnvironmentService,
    private alertify: AlertifyService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .filter((params: Params) => has(params, 'token'))
      .first()
      .switchMap((params: Params) => this.auth.confirmEmail(params.token))
      .finally(() => this.router.navigate(['/']))
      .subscribe(
        () => this.alertify.success(`Confirmed email address`),
        () => this.alertify.error(`Failed confirming email address`),
      );

    this.title.set(`Confirming Email Address`);
  }
}
