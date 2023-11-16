const slider = document.querySelector('.slider');
const container = document.querySelector('.slider__container');
const slides = document.querySelectorAll('.slide');
const navigations = document.querySelectorAll('.slider_navigation');

init();

import {
    cards__slider
} from './cards.js';

const renderCards = (img, titel, country, day, price) => {
    slider.insertAdjacentHTML('beforeend', `
    <div class="slider__container">
          <div class="slide">
            <div class="images_slide">
              <img src="${img}" alt="slide" />
            </div>
            <div class="slide__descr">
              <h5>${titel}</h5>
              <p>${country}</p>
              <p>${day}</p>
              <p>${price}</p>
            </div>
          </div>
        </div>
    `)
}

cards__slider.forEach(item => renderCards(item.img, item.titel, item.country, item.day, item.price))



function init() {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];

    slide.dataset.order = i;
    slide.style.transform = "translate(-50%, -50%)";
    slide.addEventListener('click', clickHandler);
  }

  for (const navigation of navigations) {
    navigation.addEventListener('click', navigationHandler);
  }

  activeOrder = Math.floor(slides.length / 2);

  update();
}

function update() {
  const { width, height } = container.getBoundingClientRect();

  const a = width / 2;
  const b = height / 2;

  const delta = Math.PI / slides.length / 4;

  for (let i = 0; i < slides.length; i++) {
    const leftSlide = document.querySelector(`.slide[data-order="${activeOrder - i}"]`);
    if (leftSlide) {
      leftSlide.style.zIndex = slides.length - i;
      leftSlide.style.opacity = 1 - (1.5 * i) / slides.length;

      leftSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 - delta * i * 2)}px`;
      leftSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2 - delta * i * 2)}px`;
    }
    const rightSlide = document.querySelector(`.slide[data-order="${activeOrder + i}"]`);
    if (rightSlide) {
      rightSlide.style.zIndex = slides.length - i;
      rightSlide.style.opacity = 1 - (1.5 * i) / slides.length;

      rightSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 + delta * i * 2)}px`;
      rightSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2 + delta * i * 2)}px`;
    }
  }
}

function clickHandler() {
  const order = parseInt(this.dataset.order, 10);
  activeOrder = order;
  update();
}

function navigationHandler(e) {
  e.preventDefault();
  const { dir } = this.dataset;
  if (dir === 'prev') {
    activeOrder = Math.max(0, activeOrder - 1);
  } else if (dir === 'next') {
    activeOrder = Math.min(slides.length - 1, activeOrder + 1);
  }
  update();
}