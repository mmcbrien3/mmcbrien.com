const wrapper = document.getElementById('contentWrapper');

$(document).ready(() => {
    const numStars = 3;
    for (let i = 0; i < numStars; i++) {
        setTimeout(() => {
            let night = document.createElement('div');
            night.setAttribute('class', 'night');
            let star = document.createElement('div');
            star.setAttribute('class', 'shooting_star');

            rotateNight(night);

            wrapper.appendChild(night)
            night.appendChild(star);
            star.night = night;
            star.addEventListener('animationiteration', (event) => {
                starListener(event);
            })
        }, Math.random()*10000 + 1)
    }
})

function starListener(event) {
    let star = event.currentTarget;
    let night = star.night;

    rotateNight(night);
    let clonedNight = night.cloneNode();
    let clonedStar = star.cloneNode();
    clonedStar.night = clonedNight;

    wrapper.removeChild(night);

    setTimeout((night, star) => {
        wrapper.appendChild(night);
        night.appendChild(star);
        star.addEventListener('animationiteration', (event) => {
            starListener(event);
        })
    }, Math.floor(Math.random() * 7000), clonedNight, clonedStar);
}

function rotateNight(night) {
    let rotation = Math.floor(Math.random() * 360);
    let rotationString = `rotate(${rotation}deg)`;
    night.style.webkitTransform = rotationString
    night.style.transform = rotationString
}
