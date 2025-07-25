import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {
  private readonly baseTitle = `BeKind`;

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
