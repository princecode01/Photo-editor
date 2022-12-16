
const rangeInputs = document.querySelectorAll('input[type="range"]');


let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayScale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue_rotate');
let invert = document.getElementById('invert');

let img = document.getElementById('img');
let upload = document.getElementById('open');
let save = document.getElementById('save');
let resetButton = document.querySelector('.reset');
let paragraph = document.querySelector('.img-container p');
let effect = document.querySelector('.effect')
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


function handleRangeChange(e) {
    let target = e.target

    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}


rangeInputs.forEach(input => {
    input.addEventListener('input', handleRangeChange)
})




upload.onchange = () => {

    paragraph.style.display = 'none';
    effect.style.display = 'block';
    resetButton.style.display = 'block';
    save.style.display = 'block';

    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = () => {
        img.src = file.result;

        resetValue();
    }

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // console.log(canvas.width)
        img.style.display = 'none';

    }
}

resetButton.addEventListener('click', () => {

    resetValue();
    rangeInputs.forEach(input => {

        const min = input.min
        const max = input.max
        const val = input.value

        input.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    })
})


let resetValue = () => {

    ctx.filter = "none";
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    grayScale.value = "0";
    sepia.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
    invert.value = "0";

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

save.onclick = () => {
    save.href = canvas.toDataURL();
}


let filters = document.querySelectorAll('input[type="range"]');
// console.log(filters)

filters.forEach(input => {
    input.oninput = function () {
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayScale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        invert(${invert.value}%)
        `
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

})

$(document).ready(() => {
    // console.log($('.effectRange:first div'))
    $('.effectRange div:first').css('display', 'flex');
    $('.effectRange div:first').addClass('justify-content-center align-items-center');
    $('.effect ul li').click((e) => {
        displayRange(e.target.getAttribute('name'))
        
    })
})


let displayRange = (name) => {
    
    $(`#${name}`).parent().css('display', 'flex');
    $(`#${name}`).parent().addClass('justify-content-center align-items-center');
    $('.effectRange div').not($(`#${name}`).parent()).css('display', 'none');
    $('.effectRange div').not($(`#${name}`).parent()).removeClass('justify-content-center align-items-center');
}

