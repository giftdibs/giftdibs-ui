import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  TypeaheadSearchFunction,
  TypeaheadSearchResultAction,
} from 'projects/ux/src/public-api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-typeahead-demo',
  templateUrl: './typeahead-demo.component.html',
})
export class TypeaheadDemoComponent implements OnInit {
  public errors: any[] = [];

  public reactiveForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {}

  public findProductFunction: TypeaheadSearchFunction<any> = (
    searchText: string,
  ) => {
    const results: any[] = [];

    if (searchText === 'steve') {
      for (let i = 0; i < 15; i++) {
        results.push({
          imageUrl: '',
          name: `Item ${i} name`,
          price: i,
          url: '',
        });
      }
    }

    const subject = new Subject<any>();

    setTimeout(() => {
      subject.next(results);
      subject.complete();
    }, 1000);

    return subject;
  };

  public searchResultAction: TypeaheadSearchResultAction = (result: any) => {
    console.log('result?', result);
    if (!result) {
      return;
    }
    return {
      resolvedSearchTerms: result.name,
    };
  };

  public ngOnInit(): void {
    this.createForm();
    this.reactiveForm?.reset({
      name: 'Charles',
    });

    this.reactiveForm?.get('name')?.valueChanges.subscribe((value: string) => {
      console.log('name:', value);
    });

    this.reactiveForm?.get('name2')?.valueChanges.subscribe((value: string) => {
      console.log('name2:', value);
    });
  }

  public submit(): void {}

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      name2: new FormControl(null, [Validators.required]),
    });
  }
}
