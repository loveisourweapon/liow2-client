import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Injectable()
export class TitleService {
  private readonly baseTitle = environment.appName;

  constructor(private title: Title) {
    this.clear();
  }

  clear(): void {
    console.info('TitleService#clear');
    this.title.setTitle(this.baseTitle);
  }

  set(newTitle: string): void {
    console.info('TitleService#set', 'newTitle', newTitle);
    this.title.setTitle(`${newTitle} | ${this.baseTitle}`);
  }
}
