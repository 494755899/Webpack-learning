import myImage from  './image.jpeg'

const img = new Image()
img.src = myImage
const body = document.querySelector('body');
body.appendChild(img)