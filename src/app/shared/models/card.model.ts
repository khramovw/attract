export class CardModel {
  constructor(
    public id: number,
    public name: string,
    public city: string,
    public category: string,
    public price: number,
    public path: string,
    public categoryId: number
  ) {}
}
