//CRIAR TORRES COM DOM
const containerPrincipal = document.getElementById('container');

const startSection  = document.createElement('section');
const offsetSection = document.createElement('section');
const endSection    = document.createElement('section');

const startP        = document.createElement('p');
startP.innerText    = 'Start';
const offsetP       = document.createElement('p');
offsetP.innerText   = 'Offset';
const endP          = document.createElement('p');
endP.innerText      = 'End';
const startTower    = document.createElement('div');
startTower.id       = 'start';
const offsetTower   = document.createElement('div');
offsetTower.id      = 'offset';
const endTower      = document.createElement('div');
endTower.id         = 'end';

startSection.appendChild(startP);
startSection.appendChild(startTower);
offsetSection.appendChild(offsetP);
offsetSection.appendChild(offsetTower);
endSection.appendChild(endP);
endSection.appendChild(endTower);
containerPrincipal.appendChild(startSection);
containerPrincipal.appendChild(offsetSection);
containerPrincipal.appendChild(endSection);

//CRIAR DISCOS COM DOM
const discOne   = document.createElement('div')
discOne.id      = 'disc-1'
discOne.classList.add('disc')

const discTwo   = document.createElement('div')
discTwo.id      = 'disc-2'
discTwo.classList.add('disc')

const discThree = document.createElement('div')
discThree.id    = 'disc-3'
discThree.classList.add('disc')

const discFour  = document.createElement('div')
discFour.id     = 'disc-4'
discFour.classList.add('disc')

startTower.appendChild(discOne);
startTower.appendChild(discTwo);
startTower.appendChild(discThree);
startTower.appendChild(discFour);

//VARIÁVEIS GLOBAIS
let selectedDisc  = [];
let clickNumber   = 0;

//função que recebe o evento de click
function selectDisc(event) {
    let click = event.target;
    let container = event.currentTarget;

    if ( click.tagName === 'DIV' ) {
        isDiscSelected(click, container)
    }
}

//função que valida se há um objeto selecionado
function isDiscSelected(div, tower) {
    if (div.className === 'disc') {
        if ( selectedDisc.length === 0 ) {
                capture(div)
        } 
    } else {
        dropDisc(tower)
    }
}

//função que seleciona o disco
function capture(disc) {
    let lastChild = disc.parentElement.lastChild
    if (disc === lastChild) {
        selectedDisc.push(disc.clientWidth)
        selectedDisc.push(disc)
        disc.remove()
        clickCounter()
    }
}

//função que solta o disco selecionado
function dropDisc(tower) {
    let lastChild = tower.lastChild
    // console.log(selectedDisc[0].clientWidth)
    if (lastChild === null|| lastChild.clientWidth > selectedDisc[0]) {
        let disc = selectedDisc[1]
        tower.appendChild(disc)
        selectedDisc = []
        clickCounter()
        setTimeout(victory, 1000)
    }
}

//VITÓRIA
function victory () {
    let finalDiscs = endTower.querySelectorAll('.disc');
    if (finalDiscs.length === 4) {
        containerPrincipal.innerHTML = ''

        victoryContainer            = document.createElement('section');
        victoryContainer.classList.add('victory')
        victoryMessage              = document.createElement('p');
        victoryMessage.innerText    =  'PARABÉNS! VOCÊ CONSEGUIU!!';

        victoryContainer.appendChild(victoryMessage);
        containerPrincipal.appendChild(victoryContainer);

    }
}

//CONTADOR DE CLIQUES

const body              = document.querySelector('body');
const aside             = document.createElement('aside');

function clickCounter() {
    clickNumber++

    const paragraph      = document.createElement('p');
    aside.innerHTML      = ''
    paragraph.innerText  = `Número de cliques: ${clickNumber}`

    aside.appendChild(paragraph);
    body.appendChild(aside);
}

startTower.addEventListener('click', selectDisc)
offsetTower.addEventListener('click', selectDisc)
endTower.addEventListener('click', selectDisc)