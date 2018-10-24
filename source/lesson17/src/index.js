import imgs1 from './xx.jpg'
import imgs2 from './xxx.png'
var img = new Image();
img.src = imgs1;
var img2 = new Image();
img2.src = imgs2;
var body = document.querySelector('body');
body.appendChild(img);
body.appendChild(img2);
