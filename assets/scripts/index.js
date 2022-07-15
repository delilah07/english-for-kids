/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import { cards as cardsData } from './cardsData.js';
import { MainCard } from './MainCard.js';

const cardsSection = document.querySelector('.cards');
const cardWrapper = document.querySelector('.cards__wrapper');
const navWrapper = document.querySelector('.nav__list');
const navigation = document.querySelector('.header__nav');
const burger = document.querySelector('.header__burger');
const burgerContainer = document.querySelector('.burger__container');

const mainCards = new MainCard(cardsData[0], cardWrapper);
mainCards.init();
mainCards.addNavLink(navWrapper);

let categoryCards;

const menuToggle = () => {
  burgerContainer.classList.remove('burger__container-active');
  navigation.classList.remove('header__nav-active');
};

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('card-title')) {
    categoryCards = mainCards.addHandlerCategoryClick(cardWrapper, event.target);
    document
      .querySelectorAll('.nav__link')
      .forEach((link) => link.classList.remove('nav__link-active'));
    const { category } = event.target.dataset;
    document.querySelector(`.nav__link[data-category="${category}"]`).classList.add('nav__link-active');
    menuToggle();
  }

  if (event.target.classList.contains('nav__link')) {
    event.preventDefault();
    const activeCategory = event.target.dataset.category;
    // eslint-disable-next-line no-unused-expressions
    categoryCards = activeCategory
      ? mainCards.addHandlerCategoryClick(cardWrapper, event.target)
      : mainCards.init();
    document
      .querySelectorAll('.nav__link')
      .forEach((link) => link.classList.remove('nav__link-active'));
    event.target.classList.add('nav__link-active');
    menuToggle();
  }

  if (event.target.classList.contains('btn__sound')) {
    const { category, name } = event.target.dataset;
    categoryCards.addHandlerSoundClick(category, name);
  }

  if (event.target.classList.contains('btn__turn')) {
    categoryCards.addHandlerTurnClick(event.target);

    event.target.closest('.card').addEventListener('mouseleave', () => {
      categoryCards.addHandlerTurnMouseleave(event.target);
    });
  }
  if (event.target.classList.contains('cards__btn-play')) {
    // eslint-disable-next-line no-param-reassign
    event.target.disabled = true;
    categoryCards.play(categoryCards);
  }

  if (event.target.classList.contains('cards-play .card:not("card-title")')) {
    // eslint-disable-next-line no-param-reassign
    categoryCards.cardClickListener(categoryCards);
  }

  if (event.target.classList.contains('checkbox')) {
    if (!document.querySelector('input[type=checkbox]').checked) {
      cardsSection.classList.add('cards-play');
    } else {
      cardsSection.classList.remove('cards-play');
    }
  }

  if (event.target.classList.contains('burger__container')) {
    event.target.classList.toggle('burger__container-active');
    navigation.classList.toggle('header__nav-active');
  }

  const itsMenu = event.target === navigation || navigation.contains(event.target);
  const menuIsActive = navigation.classList.contains('header__nav-active');
  const itsHamburger = event.target.parentElement === burger;
  if (!itsMenu && !itsHamburger && menuIsActive) {
    menuToggle();
  }
});
