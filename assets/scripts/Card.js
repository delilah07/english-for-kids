/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

export class Card {
  constructor(data, wrapper) {
    this.data = data;
    this.wrapper = wrapper;
  }

  init() {
    this.cleanWrapper();
    this.createCards();
    this.addTitle('Categories');
  }

  cleanWrapper() {
    this.wrapper.innerHTML = '';
  }

  createCards() {
    const cardsArr = this.data;
    cardsArr.forEach((card, i) => {
      this.wrapper.insertAdjacentHTML('beforeend', this.textHTML(i));
    });
  }

  addTitle(categoryTitle) {
    document.querySelector('.cards__title').innerHTML = categoryTitle;
  }
}
