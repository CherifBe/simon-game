class Display{

    constructor(){
        this.tiles = ['red', 'blue', 'green', 'yellow'];
        this.level = 0;
        this.game = new Game(this.tiles);
        this.initDisplay();
    }

    initDisplay(){
        this.container = document.getElementsByClassName('container');

        this.startButton = document.getElementById('startBtn');
        this.displayInfo = document.getElementById('info');

        this.tiles.forEach(tile => {
            document.getElementById(tile).addEventListener('click', () => { // Optimiser ça...
                if(this.game.handleClick(tile)){ // Si renvoie "true" le jeu est terminé
                    this.reset();
                }
            });
        })

        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    startGame(){
        // Faire fonction pour éviter de mélanger les opérations dans le DOM
        this.startButton.classList.add('hidden');
        this.displayInfo.classList.remove('hidden');
        this.displayInfo.textContent = 'The game is starting';

        this.container[0].classList.add('no-display'); // TODO: Mofifier getElementSSS
        
        this.level++;
        this.game.nextLevel();
        setTimeout(() => {
            this.timeToPlay();
        }, this.level * 600 + 1000);
    }

    timeToPlay(){
        this.container[0].classList.remove('no-display');
        this.displayInfo.textContent = `Votre tour: ${this.level}`;
    }

    reset(){
        this.displayInfo.classList.add('hidden');
        this.startButton.classList.remove('hidden');
        this.container[0].classList.add('no-display'); // TODO: Modifier getElementSSS
    }
}