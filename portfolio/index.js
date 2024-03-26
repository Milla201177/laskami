var gallery = document.querySelector('.image-gallery');
const images = gallery.querySelectorAll('.image-item');
images.forEach(image => {
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