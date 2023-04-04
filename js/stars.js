const numStars = 3;
for (let i = 0; i < numStars; i++) {
    let night = document.getElementsByClassName('night')[i];
    let star = document.getElementsByClassName('shooting_star')[i];
    star.addEventListener('animationiteration', () => {
        let rotation = Math.floor(Math.random() * 360);
        let rotationString = `rotate(${rotation}deg)`;
        night.style.webkitTransform = rotationString
        night.style.transform = rotationString
    })
}