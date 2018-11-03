import {
  Component,
  OnInit
} from '@angular/core';

import {
  of
} from 'rxjs';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  TypeaheadSearchFunction,
  TypeaheadSearchResultAction
} from 'projects/ux/src/public_api';

@Component({
  selector: 'app-typeahead-demo',
  templateUrl: './typeahead-demo.component.html'
})
export class TypeaheadDemoComponent implements OnInit {
  public errors: any[];
  public reactiveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public findProductFunction: TypeaheadSearchFunction<any> = (searchText: string) => {
    const results = [];
    if (searchText === 'steve') {
      for (let i = 0; i < 15; i++) {
        results.push({
          imageUrl: '',
          name: `Item ${i} name`,
          price: i,
          url: ''
        });
      }
    }
    return of(results);
  }

  public searchResultAction: TypeaheadSearchResultAction<any> = (result: any) => {
    console.log('result?', result);
  }

  public ngOnInit(): void {
    this.createForm();
    this.reactiveForm.reset({
      name: 'Charles'
    });

    this.reactiveForm.get('name').valueChanges.subscribe((value: string) => {
      console.log('name:', value);
    });

    this.reactiveForm.get('name2').valueChanges.subscribe((value: string) => {
      console.log('name2:', value);
    });
  }

  public submit(): void {}

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required
      ]),
      name2: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
