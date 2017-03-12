import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { findIndex } from 'lodash';

import { JsonPatchOp } from '../utils';
import { Campaign, NewCampaign, NewGroup, Group } from './index';
import { CampaignService } from './campaign.service';
import { GroupService } from './group.service';
import * as act from '../act/act.actions';
import * as alertify from '../alertify/alertify.actions';
import * as auth from '../auth/auth.actions';
import { Deed } from '../deed';
import * as group from './group.actions';

@Injectable()
export class GroupEffects {
  @Effect()
  count$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.COUNT)
    .startWith(new group.CountAction()) // dispatch on startup
    .flatMap(() => this.groupService.count()
      .map((counter: number) => new group.CountSuccessAction(counter))
      .catch(error => Observable.of(new group.CountFailAction(error))));

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.CREATE).map(toPayload)
    .flatMap((payload: { group: NewGroup, setupCampaign: boolean }) => this.groupService.save(payload.group)
      .mergeMap((createdGroup: Group) => Observable.from([
        new group.CreateSuccessAction(createdGroup),
        new auth.LoginWithTokenAction(), // reload the current auth user
        new auth.SetCurrentGroupAction(createdGroup),
        new alertify.SuccessAction(`Created group <b>${createdGroup.name}</b>`),
        go(['/g', createdGroup.urlName], payload.setupCampaign ? { setupCampaign: true } : {}),
      ]))
      .catch((response: Response) => Observable.of(new group.CreateFailAction(response.json().error || {}))));

  @Effect()
  createCampaign$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.CREATE_CAMPAIGN).map(toPayload)
    .flatMap((newCampaign: NewCampaign) => this.campaignService.save(newCampaign)
      .mergeMap((campaign: Campaign) => Observable.from([
        new group.CreateCampaignSuccessAction(campaign),
        new group.FindAndSetCurrentCampaignAction({ group: campaign.group, active: true }),
        new alertify.SuccessAction(`Created campaign`),
      ]))
      .catch((response: Response) => Observable.of(new group.CreateCampaignFailAction(response.json().error || {}))));

  @Effect()
  findAndSetCurrent$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.FIND_AND_SET_CURRENT)
    .flatMap((action: Action) => this.groupService.findOne(action.payload)
      .mergeMap((foundGroup: Group) => Observable.from([
        new group.SetCurrentAction(foundGroup),
        new group.FindAndSetCurrentCampaignAction({ group: foundGroup._id, active: true }),
        new act.CountAction({ group: foundGroup._id }),
      ]))
      .catch((error: Error) => Observable.of(new group.FindAndSetCurrentFailAction(error.message))));

  @Effect()
  findAndSetCurrentCampaign$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.FIND_AND_SET_CURRENT_CAMPAIGN)
    .flatMap((action: Action) => this.campaignService.findOne(action.payload)
      .map((foundCampaign: Campaign) => new group.SetCurrentCampaignAction(foundCampaign))
      .catch((error: Error) => Observable.of(new group.FindAndSetCurrentCampaignFailAction(error.message))));

  @Effect()
  finishCampaign$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.FINISH_CAMPAIGN).map(toPayload)
    .flatMap((campaign: Campaign) => {
      const patches = [{
        op: JsonPatchOp.Replace,
        path: `/active`,
        value: false,
      }, {
        op: JsonPatchOp.Replace,
        path: `/dateEnd`,
        value: new Date(),
      }];

      return this.campaignService.update(campaign, patches)
        .mergeMap(() => Observable.from([
          new group.SetCurrentCampaignAction(null),
          new alertify.SuccessAction(`Finished campaign`),
        ]))
        .catch(() => Observable.of(new alertify.ErrorAction(`Failed finishing campaign`)));
    });

  @Effect()
  setDeedPublished$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.SET_DEED_PUBLISHED).map(toPayload)
    .flatMap(({ campaign, deed, isPublished }: { campaign: Campaign, deed: Deed, isPublished: boolean }) => {
      const deedIndex = findIndex(campaign.deeds, { deed: { _id: deed._id } });
      const patch = {
        op: JsonPatchOp.Replace,
        path: `/deeds/${deedIndex}/published`,
        value: isPublished,
      };

      const action = isPublished ? `Publish` : `Unpublish`;
      const alertMethod = isPublished ? `SuccessAction` : `LogAction`;
      return this.campaignService.update(campaign, [patch])
        .mergeMap(() => Observable.from([
          new group.FindAndSetCurrentCampaignAction({ group: campaign.group, active: true }),
          new alertify[alertMethod](`${action}ed deed <b>${deed.title}</b>`),
        ]))
        .catch(() => Observable.of(new alertify.ErrorAction(`Failed ${action}ing deed <b>${deed.title}</b>`)));
    });

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.UPDATE).map(toPayload)
    .flatMap((groupToUpdate: Group) => this.groupService.save(groupToUpdate)
      .mergeMap((updatedGroup: Group) => Observable.from([
        new group.UpdateSuccessAction(updatedGroup),
        new group.SetCurrentAction(updatedGroup),
        new alertify.SuccessAction(`Updated group <b>${updatedGroup.name}</b>`),
      ]))
      .catch((response: Response) => Observable.of(new group.UpdateFailAction(response.json().error || {}))));

  constructor(
    private actions$: Actions,
    private campaignService: CampaignService,
    private groupService: GroupService,
  ) { }
}
