class Display{

    constructor(){
        this.tiles = ['red', 'blue', 'green', 'yellow'];
        this.level = 0;
        this.initDisplay();
    }

    initDisplay(){
        this.container = document.querySelector('.container');
        this.startButton = document.getElementById('startBtn');
        this.displayInfo = document.getElementById('info');

        this.tiles.forEach(tile => {
            document.getElementById(tile).addEventListener('click', () => {
                let res = this.game.handleClick(tile);
                if(res === 'res'){
                    setTimeout(() => {
                        this.play(this.game.nextLevel());
                    }, 1000);
                }
                if(res === true){ // Si renvoie 'true' la partie en cours est terminé
                    this.reset();
                }

            });
        })
        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    startGame(){
        this.game = new Game(this.tiles, this.displayInfo);
        this.startButton.classList.add('hidden');
        this.displayInfo.classList.remove('hidden');
        this.displayInfo.textContent = 'Le jeu commence...';

        this.container.classList.add('no-display');
        
        this.level++;
        this.play(this.game.nextLevel());
        setTimeout(() => {
            this.timeToPlay();
        }, this.level * 600 + 1000);
    }

    play(newSequence){
        console.log(newSequence);
        newSequence.forEach((color, index) => { 
            setTimeout(() => {
                this.activateTile(color);
        }, (index+1) * 600);
    });
    }

    activateTile(color){
        console.log(color);
        const tileElement = document.getElementById(color);
        tileElement.classList.add('activated');
        setTimeout(() => {
            tileElement.classList.remove('activated');
        }, 400);
    }

    timeToPlay(){
        this.container.classList.remove('no-display');
        this.displayInfo.textContent = `Votre tour: ${this.level}`;
    }

    reset(){
        this.displayInfo.classList.add('hidden');
        this.startButton.classList.remove('hidden');
        this.container.classList.add('no-display');
    }
}