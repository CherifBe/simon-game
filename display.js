class Display{
    startButton = '';
    constructor(){
        this.initDisplay();
    }

    initDisplay(){
        console.log('display is init');
        this.container = document.getElementsByClassName('container');
    }

    getContainer(){
        return this.container[0];
    }

    activateTile(color){
        console.log(color);
        const tileElement = document.getElementById(color);
        console.log('je suis là aussi');
        console.log(tileElement);
        tileElement.classList.add('activated');
        setTimeout(() => {
            tileElement.classList.remove('activated');
        }, 400);
    }
}