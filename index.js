var container = document.querySelector('.home-page__img-container');
const image = container.querySelectorAll('.home-page__img');
image.forEach(image => {
    image.addEventListener('click', () => {
        const fullsize = document.createElement('div');
        fullsize.classList.add('show');
        const fullsizeImage = document.createElement('img');
        fullsizeImage.src = image.src;
        fullsize.appendChild(fullsizeImage);
        document.body.appendChild(fullsize);
        window.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                fullsize.remove();
            }
        });
        fullsize.addEventListener("click", event => {
                fullsize.remove();
        });
    });
});

var card = document.querySelector('.page');
const imag = card.querySelectorAll('.img-item');
imag.forEach(imag => {
    imag.addEventListener('click', () => {
        const fullsize = document.createElement('div');
        fullsize.classList.add('show');
        const fullsizeImage = document.createElement('img');
        fullsizeImage.src = imag.src;
        fullsize.appendChild(fullsizeImage);
        document.body.appendChild(fullsize);
        window.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                fullsize.remove();
            }
        });
        fullsize.addEventListener("click", event => {
                fullsize.remove();
        });
    });
});

