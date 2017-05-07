import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as seedrandom from 'seedrandom';

import { environment } from '../../../environments/environment';
import { Comment, NewComment } from '../models';
import { buildUrlSearchParams, SearchParams } from '../../shared';

@Injectable()
export class CommentService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly numberOfUserPictures = 12;

  constructor(
    private http: JwtHttp,
  ) { }

  save(comment: Comment|NewComment): Observable<Comment> {
    console.log('CommentService#save', 'comment', comment);
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

    return this.http[method](this.baseUrl + url, comment)
      .map((response: Response) => response.json() || {});
  }

  find(params: SearchParams = {}): Observable<Comment[]> {
    console.log('CommentService#find', 'params', params);
    return this.http.get(`${this.baseUrl}/comments`, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json())
      .map((comments: Comment[]) => comments.map((comment: Comment) => this.transformComment(comment)));
  }

  count(params: SearchParams = {}): Observable<number> {
    console.log('CommentService#count', 'params', params);
    params['count'] = true;
    return this.http.get(`${this.baseUrl}/comments`, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json());
  }

  private transformComment(comment: Comment): Comment {
    // Convert all date strings to Date objects
    if (comment.created) { comment.created = new Date(comment.created); }

    // Set a random profile picture seeded by the user ID
    const seed = seedrandom(comment.user._id);
    if (!comment.user.picture) {
      comment.user.picture = `/images/user${Math.floor(seed() * this.numberOfUserPictures)}.png`;
    }

    return comment;
  }
}
