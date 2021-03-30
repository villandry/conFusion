import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Dish} from '../shared/dish';
import {Comment} from '../shared/comment';
import {DishService} from '../services/dish.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {baseURL} from '../shared/baseurl';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  ratingControl = new FormControl(5);
  @ViewChild('fform') commentFormDirective;
  newComment: Comment;

  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long.',
      'maxlength': 'Author name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private BaseURL) {
    this.createForm();
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.ratingControl.valueChanges.subscribe(value => {
      this.commentForm.controls['rating'].setValue(value);
    });
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    // this.http.get<Dish>(baseURL + 'dishes/' + id);
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }


  private createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: ['5'],
      comment: ['', Validators.required]
    });

  }

  onSubmit() {
    this.newComment = this.commentForm.value;
    this.newComment.date = String(new Date());
    this.dish.comments.push(this.newComment);

    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: ''
    });
    // reset form to its pristine value
    this.commentFormDirective.resetForm();
  }

}
