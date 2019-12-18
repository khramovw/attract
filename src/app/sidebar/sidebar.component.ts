import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';

// Data
import * as _city from '../../assets/data/city';
import * as _categories from '../../assets/data/category';
import * as _data from '../../assets/data/data';

// Models
import {CityModel} from '../shared/models/city.model';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CategoryModel} from "../shared/models/category.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  cities: CityModel[];
  categories = JSON.parse(JSON.stringify(_categories));
  form: FormGroup;
  rangeValues: number[] = [0, 250];

  // Значения фильтра
  @Output() filter: EventEmitter<any> = new EventEmitter();


  constructor(
    private fb: FormBuilder
  ) {
    this.cities = JSON.parse(JSON.stringify(_city));
    this.form = fb.group({
      cities: [null],
      check: fb.array([]),
      range: [{value: [0,250]}]
    });
  }

  ngOnInit() {
    this.categoryList();
    this.countCategory();
  }

  // Получаю чекбоксы
  get getCategories(): FormArray {
    return this.form.get('check') as FormArray;
  }

  // Собираю список категорий
  categoryList() {
    this.categories.forEach(() => {
      (this.form.get('check') as FormArray)
        .push(this.fb.control(false));
    });
  }

  // Считаю категории
  countCategory() {
    this.categories.forEach( item => {
      return item.count = _data.filter(cat => cat.category === item.id).length;
    });
  }

  // Сабмичу фильтр
  onSubmit() {
    this.filter.emit(this.form.value);
  }

}
