import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { TitleService } from "../../core/services";

@Component({
  templateUrl: "./contact-us.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent implements OnInit {
  constructor(private title: TitleService) {}

  ngOnInit(): void {
    this.title.set(`Contact Us`);
  }
}
