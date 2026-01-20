import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { has } from 'lodash';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AlertifyService, AuthService, EnvironmentService, GroupService, TitleService } from '../../core/services';

@Component({
  templateUrl: './approve-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproveGroupComponent implements OnInit {
  constructor(
    public env: EnvironmentService,
    private alertify: AlertifyService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private title: TitleService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.route.params
      .filter((params: Params) => has(params, 'token'))
      .first()
      .switchMap((params: Params) => this.groupService.approveWithToken(params.token))
      .switchMap(() => this.auth.loadCurrentUser())
      .finally(() => this.router.navigate(['/']))
      .subscribe(
        () => this.alertify.success(`Approved group`),
        () => this.alertify.error(`Failed approving group`)
      );

    this.title.set(`Approving Group`);
  }
}
