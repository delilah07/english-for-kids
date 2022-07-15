/* eslint-disable linebreak-style */
export const categoriesCardHTML = (data, index) => `
        <div class="card card-title" data-category="${index + 1}">
              <div class="card__img">
                <img
                  src="./assets/images/img/${data.name}/${data.name}.jpg"
                  alt=""
                />
              </div>

              <div class="card__content">${data.title}</div>
              <div class="card__play">Play Mode</div>
            </div>
`;

export const categoryCardHTML = (data, index, category) => `
        <div class="card" data-name="${data.word}">
              <div class="card__img">
                <img
                  class="front" src="./assets/images/img/${category}/${data.imageEn}"
                  alt="${data.word}"
                />
                <img
                class="back" src="./assets/images/img/${category}/${data.imageRu}"
                alt="${data.translate}"
              />
              </div>

              <div class="card__content">
                <div class="card__btns">
                    <img
                        class="btn__sound" data-category="${category}" data-name="${data.word}" src="./assets/images/icon/sound.svg"
                        alt="sound icon"
                    />
                    <img
                        class="btn__turn" src="./assets/images/icon/turn.svg"
                        alt="turn icon"
                    />
                </div>
              </div>
            </div>
`;

export const navLinkHTML = (data, index) => `
    <li class="nav__item">
        <a href="#" class="nav__link" data-category="${index + 1}">${
  data.title
}</a>
    </li>
`;

export const playTitleHTML = () => `
    <button class="cards__btn-play">Start</button>
    <span class="cards__rate"></span>
`;

export const rateHTML = () => `
    <img
        class="rate__img" src="./assets/images/icon/star.png"
        alt="star icon"
    />
`;
