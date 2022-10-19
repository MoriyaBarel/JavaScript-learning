const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const darkenLightenBtn = document.getElementById('Darken-Lighten-Button');
const fetchBtn = document.getElementById('Fetch-Button');

const overlay = document.querySelector('.overlay');

let images = [];
const maxImages = 5;


for (let i = 0; i < maxImages; i++) {
    const image = document.createElement('img');
    image.alt = 'random image';
    thumbBar.appendChild(image);
    images.push(image);
    loadImage(i);
    image.addEventListener('click', () => {
        displayedImage.src = image.src;
        displayedImage.alt = image.alt;
    });
}


/* Wiring up the Darken/Lighten button */
darkenLightenBtn.addEventListener('click', () => {
    let className = darkenLightenBtn.getAttribute('class');
    if (className === 'dark') {
        darkenLightenBtn.setAttribute('class', 'light');
        darkenLightenBtn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
    else {
        darkenLightenBtn.setAttribute('class', 'dark');
        darkenLightenBtn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});

/* Wiring up the new images button */
fetchBtn.addEventListener('click', () => {
    reloadGallery();
});

setInterval(function() {
    reloadGallery(); 
 }, 60000);

function reloadGallery() {
    for (let i = 0; i < maxImages; i++) {
        loadImage(i);
    }
}

async function loadImage(imageIndex) {
    const url = 'https://picsum.photos/640/480';
    const fetchPromise = fetch(url);

    fetchPromise.then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        images[imageIndex].src = response.url;
        if (imageIndex === 0) {
            displayedImage.src = response.url;
        }
    }).catch((error) => {
        console.error(`Could not get image: ${error}`);
    });
}

// async function loadImage(imageIndex) {
//     try {
//         const response = await fetch('https://picsum.photos/640/480');
//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//         }
//         images[imageIndex].src = response.url;
//         if (imageIndex === 0) {
//             displayedImage.src = response.url;
//         }
//     }
//     catch (error) {
//         console.error(`Could not get image: ${error}`);
//     }
// }