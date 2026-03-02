// Selecting DOM elements
const container = document.querySelector('.container');
const sliderImage = document.querySelector('.slider-image');
const beforeImage = document.querySelector('.image-before');
const afterImage = document.querySelector('.image-after');
const slider = document.querySelector('.slider');
const sliderLine = document.querySelector('.slider-line');
const sliderButton = document.querySelector('.slider-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

// Array of images (mix of single images and image pairs)
const images = [
  { type: 'slider', before: 'slider/before.jpg', after: 'slider/after.jpg' },
  { type: 'single', src: 'Gallery/photo5.webp' },
  { type: 'slider', before: 'slider/before2.png', after: 'slider/after2.png' },
  { type: 'single', src: 'Gallery/photo10.webp' },
  // Add more images as needed
];

let currentImageIndex = 0;

// Function to update the displayed image
function updateImage() {
  const currentImage = images[currentImageIndex];
  
  if (currentImage.type === 'single') {
    // Display single image
    sliderImage.style.display = 'block';
    sliderImage.src = currentImage.src;
    beforeImage.style.display = 'none';
    afterImage.style.display = 'none';
    slider.style.display = 'none';
    sliderLine.style.display = 'none';
    sliderButton.style.display = 'none';
  } else if (currentImage.type === 'slider') {
    // Display slider image pair
    sliderImage.style.display = 'none';
    beforeImage.style.display = 'block';
    afterImage.style.display = 'block';
    beforeImage.src = currentImage.before;
    afterImage.src = currentImage.after;
    slider.style.display = 'block';
    sliderLine.style.display = 'block';
    sliderButton.style.display = 'block';
    // Reset slider position
    container.style.setProperty('--position', '50%');
    slider.value = 50;
  }
  
  updateButtonVisibility();
}

// Function to update button visibility
function updateButtonVisibility() {
  prevButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
  nextButton.style.display = currentImageIndex === images.length - 1 ? 'none' : 'block';
}

// Event listener for slider input
slider.addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
});

// Event listener for previous button
prevButton.addEventListener('click', () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateImage();
  }
});

// Event listener for next button
nextButton.addEventListener('click', () => {
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
    updateImage();
  }
});

// Initial image load
updateImage();