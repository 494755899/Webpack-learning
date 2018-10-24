import imgs from 'file-loader!./xx.png'
var img = new Image();
img.src = imgs;
var body = document.querySelector('body');
body.appendChild(img);
