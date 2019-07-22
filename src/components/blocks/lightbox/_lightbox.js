/* eslint-disable no-underscore-dangle */
(() => {
  const lightboxSeeds = Array.from(document.querySelectorAll('.js-lightbox-item'));

  if (lightboxSeeds.length) {
    const lightbox = document.querySelector('.b-lightbox') || document.createElement('div');
    document.body.appendChild(lightbox);
    lightbox.classList.add('b-lightbox');
    lightbox.innerHTML = `
      <a class="b-lightbox__dismiss" title="Close" aria-label="Close"></a>
      <div class="b-lightbox__items"></div>
    `;
    const items = lightbox.querySelector('.b-lightbox__items');

    lightbox.addItem = (index, prepend = false) => {
      const seed = lightboxSeeds[index] || lightboxSeeds[0];
      const data = seed.dataset.lightbox ?
        JSON.parse(seed.dataset.lightbox)
        : null;
      const museumNumber = data && data.museumNumber ?
        `Museum number: <span itemprop="identifier">${data.museumNumber}</span>`
        : '';
      const copyright = data && data.copyright ?
        `<br/><span itemprop="copyrightHolder">${data.copyright}</span>`
        : '';
      const numberCopyright = museumNumber || copyright ?
        `<div class="b-lightbox__numbercopyright">
          ${museumNumber}
          ${copyright}
        </div>`
        : '';
      const onDisplay = data && data.onDisplay ?
        `<div class="b-lightbox__location-status">
          <svg role="img">
            <use xlink:href="/assets/svg/svg-template.svg#on-display"></use>
          </svg>
          On display
        </div>`
        : '';
      const locationSite = data && data.locationSite ?
        `<div class="b-lightbox__location-site">${data.locationSite}</div>`
        : '';
      const locationRoom = data && data.locationRoom ?
        `<div class="b-lightbox__location-room">${data.locationRoom}</div>`
        : '';
      const location = locationSite || locationRoom ?
        `<div class="b-lightbox__location">
          ${onDisplay}
          ${locationSite}
          ${locationRoom}
        </div>
        ` : '';
      const ctaScreen = seed.querySelector('a').href.length > 1 ?
        `<br/><a class="b-lightbox__cta b-lightbox__cta--screen" href="${seed.querySelector('a').href}">Explore object in more depth</a>`
        : '';
      const ctaMobile = seed.querySelector('a').href.length > 1 ?
        `<a class="b-lightbox__cta b-lightbox__cta--mobile" href="${seed.querySelector('a').href}">Explore object in more depth</a>`
        : '';
      const item = document.createElement('div');
      item.classList.add('b-lightbox__item');
      item.innerHTML += `
        <div class="b-lightbox__content">
          <figure class="b-lightbox__figure">
            <img class="b-lightbox__image"
                 itemprop="contentUrl"
                 alt="${seed.querySelector('img').alt}"
                 sizes="(max-width: 991px) calc(100vw - 20px),
                        (min-width: 992px) calc(70vw - 145px),
                        (min-width: 1200px) 710px"
                 srcset="${seed.querySelector('img').srcset}"
                 src="${seed.querySelector('img').src}">
            <figcaption class="b-lightbox__figcaption">
              ${numberCopyright}
              <div class="b-lightbox__prevnext">
                <a class="b-lightbox__prev b-lightbox__prev--disabled" title="Previous" aria-label="Previous">
                  <svg role="img">
                    <use xlink:href="/assets/svg/svg-template.svg#point-left"></use>
                  </svg>
                </a>
                <a class="b-lightbox__next b-lightbox__next--disabled" title="Next" aria-label="Next">
                  <svg role="img">
                    <use xlink:href="/assets/svg/svg-template.svg#point-right"></use>
                  </svg>
                </a>
              </div>
            </figcaption>
          </figure>
          <div class="b-lightbox__details">
            <div class="b-lightbox__caption">
              ${seed.querySelector('figcaption').textContent}
              ${ctaScreen}
            </div>
            ${location}
            ${ctaMobile}
          </div>
        </div>
      `;

      if (prepend) {
        items.insertBefore(item, items.firstElementChild);
      } else {
        items.appendChild(item);
      }

      const itemPrev = item.querySelector('.b-lightbox__prev');
      const itemNext = item.querySelector('.b-lightbox__next');
      if (index > 0) {
        itemPrev.classList.add('b-lightbox__prev--enabled');
      }
      if (index < lightboxSeeds.length - 1) {
        itemNext.classList.add('b-lightbox__next--enabled');
      }
    };

    lightbox.getIndex = (seed) => {
      const index = lightboxSeeds.findIndex((el) => {
        const match = (el === seed);
        return match;
      });
      return index;
    };

    lightbox.clipItem = (last = false) => {
      if (last) {
        items.lastElementChild.remove();
      } else {
        items.firstElementChild.remove();
      }
    };

    lightbox.advance = (rewind = false) => {
      lightbox.clipItem(rewind);
      lightbox.addItem(lightbox._index + (2 * (rewind ? -1 : 1)), rewind);
      lightbox._index += (1 * (rewind ? -1 : 1));
    };

    document.addEventListener('click', (e) => {
      if (e.target.closest('.js-lightbox-item')) {
        e.preventDefault();
        const seed = e.target.closest('.js-lightbox-item');
        lightbox._index = lightbox.getIndex(seed);
        lightbox.addItem(lightbox._index);
        lightbox.classList.add('b-lightbox--active');
        lightbox.addItem(lightbox._index + 1);
        lightbox.addItem(lightbox._index - 1, true);
        lightbox._width = lightbox.getBoundingClientRect().width;

        lightbox.onclick = (e2) => {
          if (e2.target.matches('.b-lightbox__item, .b-lightbox__dismiss')) {
            e2.preventDefault();
            lightbox.classList.remove('b-lightbox--active');
            items.innerHTML = '';
            lightbox.onclick = null;
          } else if (e2.target.closest('.b-lightbox__next--enabled')) {
            e2.preventDefault();
            lightbox.advance();
          } else if (e2.target.closest('.b-lightbox__prev--enabled')) {
            e2.preventDefault();
            lightbox.advance(true);
          }
        };
      }
    }, false);
  }
})();
/* eslint-enable no-underscore-dangle */
