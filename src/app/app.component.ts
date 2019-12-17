import {Component, OnInit} from '@angular/core';

// Data
import * as _categories from '../assets/data/category';
import * as _city from '../assets/data/city';
import * as _data from '../assets/data/data';

// Models
import {CategoryModel} from "./shared/models/category.model";
import {CityModel} from './shared/models/city.model'
import {CardModel} from './shared/models/card.model'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  category = _categories;
  city = _city;
  data = _data;
  newData: CardModel[];
  resultData: CardModel[];

  constructor() {
  }

  ngOnInit(): void {
    this.newData = this.mergeData;
    this.resultData = this.newData;
    this.addImg();
  }

  // Собиираю данные в один масив
  get mergeData(): CardModel[] {
    let data = this.data.map(card => {
      let {id, name, price, category: category_id} = card;
      let categoryName = this.category.find(cat => cat.id === card.category) as CategoryModel;
      let town = this.city.find(city => city.id === card.city) as CityModel;
      return {id, name, city: town['name'], price, category_id, category: categoryName['name']} as CardModel;
    });
    return data as CardModel[]
  }

  // Добавляю путь к изображению
  addImg() {
    let counter = 1;
    this.newData.forEach(card => {
      if(counter > 3) counter = 1;
      card.path = `card-ico-${counter}.jpg`;
      counter++;
    });
  }

  // Сортирую
  onFilter(e) {
    this.resultData = this.newData
      .filter( card => e.cities ? e.cities.name === card.city : card)
        .filter( card => e.check.filter(o => o === false).length === 5 ? card : e.check[card.category_id - 1])
          .filter( card => e.range[0] <= card.price && e.range[1] >= card.price);
  }

}
