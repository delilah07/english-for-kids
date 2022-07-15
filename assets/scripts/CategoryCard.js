/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import { categoryCardHTML, rateHTML } from './createHTML.js';
import { Card } from './Card.js';

export class CategoryCard extends Card {
  constructor(data, wrapper, category) {
    super(data, wrapper);
    this.category = category;
  }

  textHTML(index) {
    return categoryCardHTML(this.data[index], index, this.category);
  }

  addHandlerSoundClick(cardsCategory, cardName) {
    this.addSound(`./assets/pronunciation/${cardsCategory}/pronunciation_en_${cardName}.mp3`);
  }

  addSound(srcString) {
    const audio = new Audio();
    audio.src = srcString;
    audio.autoplay = true;
  }

  addHandlerTurnClick(target) {
    target.closest('.card').classList.add('card-turn');
  }

  addHandlerTurnMouseleave(target) {
    target.closest('.card').classList.remove('card-turn');
  }

  play(cards) {
    const cardsLength = cards.data.length;
    const stars = rateHTML().repeat(cardsLength);
    document.querySelector('.cards__rate').insertAdjacentHTML('beforeend', stars);
    const shuffleArr = [...Array(cardsLength)].map((_, i) => i).sort(() => Math.random() - 0.5);
    console.log(shuffleArr);
    const currentWordIndex = shuffleArr.pop();
    this.currentName = cards.data[currentWordIndex].word;
    this.correctAnswer = 0;
    this.wrongAnswer = 0;
    this.addHandlerSoundClick(cards.category, this.currentName);
    document.querySelectorAll('.card').forEach((card) => card.addEventListener('click', (event) => this.playStep(shuffleArr, this.currentName, cards, event)));
  }

  playStep(arr, element, cardsData, event) {
    const index = cardsData.data.length - arr.length - 1;
    const answer = event.target.dataset.name;
    console.log(arr, element);
    
    if (answer === element) {
      document.querySelectorAll('.rate__img')[index].classList.add('rate__img-true');
      this.addSound('./assets/pronunciation/success-sound-effect.mp3');
      this.correctAnswer += 1;
    } else {
      document.querySelectorAll('.rate__img')[index].classList.add('rate__img-false');
      this.addSound('./assets/pronunciation/fail-sound-effect.mp3');
      this.wrongAnswer += 1;
    }
    if (arr.length === 0) {
      return this.gameOver(this.correctAnswer, this.wrongAnswer, cardsData.category);
    }
    setTimeout(() => {
      const currentWordIndex = arr.pop();
      this.currentName = cardsData.data[currentWordIndex].word;
      this.addHandlerSoundClick(cardsData.category, this.currentName);
    }, 1500);
    console.log(arr);
  }

  gameOver(correct, wrong, category) {
    console.log('game over');
    document.querySelector('.popup').classList.add('popup-active');
    document.querySelector('.popup__correct .col-popup__result').innerHTML = correct;
    document.querySelector('.popup__wrong .col-popup__result').innerHTML = wrong;
    this.correctAnswer = 0;
    this.wrongAnswer = 0;
    this.init();
    this.addTitle(category);
    setTimeout(() => {
      document.querySelector('.popup').classList.remove('popup-active');
      document.querySelector('.cards__btn-play').disabled = false;
      document.querySelector('.cards__rate').innerHTML = '';
    }, 5000);
  }
}
