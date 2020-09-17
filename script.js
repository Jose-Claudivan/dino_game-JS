const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeydown(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {  
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }
        else {
            position += 20;
            dino.style.bottom = position + 'px';
        }

    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000; //posicao inicial do cacto
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {//remove o cacto da tela
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {//fim de jogo
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1>';
        }
        else {
            cactusPosition -= 7;//velocidade do cacto
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeydown);