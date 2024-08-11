import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ContactForm } from '../../core/models';
import { AlertifyService, TitleService } from '../../core/services';

@Component({
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  natureOfEnquiryOptions = [
    'Interested in running campaign',
    'Tech support',
    'Media request',
    'Other',
  ];
  contactForm: ContactForm = {
    name: '',
    emailOrPhone: '',
    natureOfEnquiry: '',
    message: '',
  };
  isSaving$ = new BehaviorSubject<boolean>(false);
  errorMessage = '';
  errors: Record<string, any> = {};

  constructor(private alertify: AlertifyService, private title: TitleService) {}

  ngOnInit(): void {
    this.title.set(`Contact Us`);
  }

  send(contactForm: ContactForm): void {
    this.errorMessage = '';
    this.errors = {};

    this.isSaving$.next(true);
    console.log('TODO: send contact message', contactForm);

    this.alertify.success(`Your message has been sent. We will get back to you soon.`);
    this.isSaving$.next(false);
  }

  selectNatureOfEnquiry({ text: natureOfEnquiry }: { text: string }): void {
    this.contactForm.natureOfEnquiry = natureOfEnquiry;
  }
}
