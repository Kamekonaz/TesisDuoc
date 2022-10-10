class ImageResizer{
    static async resizeImage(file, max_width, max_height){
        const resizedImage = await resize(file, max_width, max_height)
        return resizedImage
    }
}

module.exports = ImageResizer;



  async function resize(file, max_width, max_height, imageEncoding="image/png"){
    var fileLoader = new FileReader(),
    canvas = document.createElement('canvas'),
    context = null,
    imageObj = new Image(),
    finalImageData;          

    canvas.id     = "hiddenCanvas";
    canvas.width  = max_width;
    canvas.height = max_height;
    canvas.style.visibility   = "hidden";   
    canvas.style.display   = "none";  
    document.body.appendChild(canvas);  

    context = canvas.getContext('2d');  
       
    if (file.type.match('image.*')) {
        fileLoader.readAsDataURL(file);
    } else {
        alert('File is not an image');
    }


    fileLoader.onload = function() {
        var data = this.result; 
        imageObj.src = data;
    };

    fileLoader.onabort = function() {
        alert("The upload was aborted.");
    };

    fileLoader.onerror = function() {
        alert("An error occured while reading the file.");
    };  

    imageObj.onload = async function() {  


        if(this.width === 0 || this.height === 0){
            alert('Image is empty');
        } else {                

            context.clearRect(0,0,max_width,max_height);
            drawImageProp(context, imageObj, 0, 0, 80, 80)
            

            const imageDataURL = canvas.toDataURL(imageEncoding)
            finalImageData = imageDataURL;


        }       
    };

    imageObj.onabort = function() {
        alert("Image load was aborted.");
    };

    imageObj.onerror = function() {
        alert("An error occured while loading image.");
    };

    return await new Promise(resolve => {
            const interval = setInterval(() => {
            if (finalImageData) {
                resolve(finalImageData);
                clearInterval(interval);
            };
            }, 100);

    })
  }
// function dataURItoBlob(dataURI) {
//     // convert base64 to raw binary data held in a string
//     // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
//     var byteString = atob(dataURI.split(',')[1]);
  
//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
//     // write the bytes of the string to an ArrayBuffer
//     var ab = new ArrayBuffer(byteString.length);
  
//     // create a view into the buffer
//     var ia = new Uint8Array(ab);
  
//     // set the bytes of the buffer to the correct values
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
  
//     // write the ArrayBuffer to a blob, and you're done
//     var blob = new Blob([ab], {type: mimeString});
//     return blob;
  
//   }
function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
    }
    
    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;
    
    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;
    
    var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r,   // new prop. width
    nh = ih * r,   // new prop. height
    cx, cy, cw, ch, ar = 1;
    
    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;
    
    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);
    
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;
    
    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;
    
    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }
    