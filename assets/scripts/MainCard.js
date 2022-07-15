/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import { categoriesCardHTML, navLinkHTML, playTitleHTML } from './createHTML.js';
import { Card } from './Card.js';
import { cards as cardsData } from './cardsData.js';
import { CategoryCard } from './CategoryCard.js';

export class MainCard extends Card {
  textHTML(index) {
    return categoriesCardHTML(this.data[index], index);
  }

  addHandlerCategoryClick(wrapper, target) {
    const index = target.dataset.category;

    const categoryName = cardsData[0][index - 1].name;
    const categoryCards = new CategoryCard(
      cardsData[index],
      wrapper,
      categoryName,
    );
    categoryCards.init();
    document.querySelector('.cards__title-wrapper').innerHTML = '<h1 class="cards__title"></h1>';
    const categoryTitle = cardsData[0][index - 1].title;
    this.addTitle(categoryTitle);
    document.querySelector('.cards__title-wrapper').insertAdjacentHTML('beforeend', playTitleHTML());

    return categoryCards;
  }

  addNavLink(navListWrapper) {
    const cardsArr = this.data;
    cardsArr.forEach((card, i) => {
      navListWrapper.insertAdjacentHTML(
        'beforeend',
        navLinkHTML(this.data[i], i),
      );
    });
  }
}
