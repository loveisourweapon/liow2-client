import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as seedrandom from 'seedrandom';

import { environment } from '../../../environments/environment';
import { Comment, GroupId, NewComment } from '../models';
import { buildUrlSearchParams, SearchParams } from '../../shared';
import { StateService } from './state.service';

@Injectable()
export class CommentService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly numberOfUserPictures = 12;

  constructor(private http: JwtHttp, private state: StateService) {}

  save(comment: Comment | NewComment): Observable<Comment> {
    console.info('CommentService#save', 'comment', comment);
    const method = has(comment, '_id') ? 'put' : 'post';
    const urlSuffix = `/comments${has(comment, '_id') ? `/${comment._id}` : ''}`;

    let url;
    if (has(comment.target, 'deed')) {
      url = `/deeds/${comment.target.deed}${urlSuffix}`;
    } else if (has(comment.target, 'group')) {
      url = `/groups/${comment.target.group}${urlSuffix}`;
    } else if (has(comment.target, 'comment')) {
      url = `/comments/${comment.target.comment}${urlSuffix}`;
    } else if (has(comment.target, 'act')) {
      url = `/acts/${comment.target.act}${urlSuffix}`;
    }

    return this.http[method](this.baseUrl + url, comment).map(
      (response: Response) => response.json() || {}
    );
  }

  approve(comment: Comment): Observable<void> {
    console.info('CommentService#approve', 'comment', comment);
    return this.http.post(`${this.baseUrl}/comments/${comment._id}/approve`, {}).map(() => {});
  }

  reject(comment: Comment): Observable<void> {
    console.info('CommentService#reject', 'comment', comment);
    return this.http.post(`${this.baseUrl}/comments/${comment._id}/reject`, {}).map(() => {});
  }

  remove(comment: Comment): Observable<void> {
    console.info('CommentService#remove', 'comment', comment);
    return this.http.delete(`${this.baseUrl}/comments/${comment._id}`).map(() => {});
  }

  find(params: SearchParams = {}): Observable<Comment[]> {
    console.info('CommentService#find', 'params', params);
    return this.http
      .get(`${this.baseUrl}/comments`, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json())
      .map((comments: Comment[]) =>
        comments.map((comment: Comment) => this.transformComment(comment))
      );
  }

  count(params: SearchParams = {}): Observable<number> {
    console.info('CommentService#count', 'params', params);
    params['count'] = true;
    return this.http
      .get(`${this.baseUrl}/comments`, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json());
  }

  /**
   * Count the comments awaiting moderation in a group, into shared state
   *
   * Only moderators may filter by a pending status, so callers have to gate on
   * that - a refused request leaves the count as it was rather than erroring
   */
  countPending(groupId: GroupId): void {
    console.info('CommentService#countPending', 'groupId', groupId);
    this.count({ group: groupId, 'target.group': 'null', status: 'pending' }).subscribe(
      (count: number) => this.state.updatePendingCommentCount(groupId, count),
      () => {}
    );
  }

  private transformComment(comment: Comment): Comment {
    // Convert all date strings to Date objects
    if (comment.created) {
      comment.created = new Date(comment.created);
    }
    if (comment.approvedAt) {
      comment.approvedAt = new Date(comment.approvedAt);
    }

    // Set a random profile picture seeded by the user ID
    const seed = seedrandom(comment.user._id);
    comment.user.picture = `/images/user${Math.floor(seed() * this.numberOfUserPictures)}.png`;

    return comment;
  }
}
