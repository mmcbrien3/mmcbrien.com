const WRAPPER = document.getElementById('contentWrapper');

interface StarElement extends HTMLDivElement {
    night?: HTMLDivElement
}

interface NightElement extends HTMLDivElement {

}

$(document).ready(() => {
    const numStars = 3;
    for (let i = 0; i < numStars; i++) {
        setTimeout(() => {
            let night: NightElement = document.createElement('div');
            night.setAttribute('class', 'night');
            let star: StarElement = document.createElement('div');
            star.setAttribute('class', 'shooting_star');

            rotateNight(night);

            WRAPPER!.appendChild(night)
            night.appendChild(star);
            star.night = night;
            star.addEventListener('animationiteration', (event) => {
                starListener(event);
            })
        }, Math.random() * 10000 + 1)
    }
})

function starListener(event: Event) {
    let star: StarElement = event.currentTarget as StarElement;
    let night: NightElement = star.night!;

    rotateNight(night);
    let clonedNight = night.cloneNode() as NightElement;
    let clonedStar = star.cloneNode() as StarElement;
    clonedStar.night = clonedNight;

    WRAPPER!.removeChild(night);

    setTimeout((night: NightElement, star: StarElement) => {
        WRAPPER!.appendChild(night);
        night.appendChild(star);
        star.addEventListener('animationiteration', (event) => {
            starListener(event);
        })
    }, Math.floor(Math.random() * 7000), clonedNight, clonedStar);
}

function rotateNight(night: NightElement) {
    let rotation: number = Math.floor(Math.random() * 360);
    let rotationString: string = `rotate(${rotation}deg)`;
    night.style.webkitTransform = rotationString
    night.style.transform = rotationString
}
