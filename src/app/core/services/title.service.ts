import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {
  private readonly baseTitle = `Love is our Weapon`;

  constructor(
    private title: Title,
  ) {
    this.clear();
  }

  clear(): void {
    console.log('TitleService#clear');
    this.title.setTitle(this.baseTitle);
  }

  set(newTitle: string): void {
    console.log('TitleService#set', 'newTitle', newTitle);
    this.title.setTitle(`${newTitle} | ${this.baseTitle}`);
  }
}
