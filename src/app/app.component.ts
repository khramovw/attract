import {Component, OnInit} from '@angular/core';

// Data
import * as _categories from '../assets/data/category';
import * as _city from '../assets/data/city';
import * as _data from '../assets/data/data';

// Models
import {CategoryModel} from './shared/models/category.model';
import {CityModel} from './shared/models/city.model';
import {CardModel} from './shared/models/card.model';
import {DataModel} from './shared/models/data.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  category: CategoryModel[] = this.copyObj(_categories);
  city: CityModel[] = this.copyObj(_city);
  data: DataModel[] = this.copyObj(_data);
  newData: CardModel[];
  resultData: CardModel[];

  constructor() {
  }

  ngOnInit(): void {
    this.newData = this.copyObj(this.mergeData);
    this.resultData = this.newData;
    this.addImg();
  }

  // Копирую
  copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // Собиираю данные в один масив
  get mergeData(): CardModel[] {
    const data = this.data.map(card => {
      const {id, name, price, category: categoryId} = card;
      const categoryName = this.category.find(cat => cat.id === card.category) as CategoryModel;
      const town = this.city.find(city => city.id === card.city) as CityModel;
      return {id, name, city: town.name, price, categoryId, category: categoryName.name} as CardModel;
    });
    return data as CardModel[];
  }


  // Добавляю путь к изображению
  addImg() {
    let counter = 1;
    this.newData.forEach(card => {
      if (counter > 3) {
        counter = 1;
      }
      card.path = `card-ico-${counter}.jpg`;
      counter++;
    });
  }

  // Сортирую
  onFilter(e) {
    this.resultData = this.newData
      .filter( card => e.cities ? e.cities.name === card.city : card)
        .filter( card => e.check.filter(o => o === false).length === e.check.length ? card : e.check[card.categoryId - 1])
          .filter( card => e.range[0] <= card.price && e.range[1] >= card.price);
  }

}
