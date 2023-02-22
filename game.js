class Game{
    constructor(){
        this.initGame();
        this.initBtnStart();
    }

    initGame(){
        this.tiles = ['red', 'blue', 'green', 'yellow'];
        this.sequence = [];
        this.humanSequence = [];
        this.level = 0;
    }

    handleClick(tile){
        const index = this.humanSequence.push(tile) - 1;
        console.log('mon index');
        console.log(index);

        if(this.humanSequence[index] !== this.sequence[index]){
            this.resetGame();
            return;
        }

        if(this.humanSequence.length === this.sequence.length){
            if(this.humanSequence.length === 5){
                this.resetGame();
                return;
            }
            this.humanSequence = [];
            this.displayInfo.textContent = 'C\'est gagné!';
            setTimeout(() => {
                this.nextLevel();
            }, 1000);
            return;
        }
        const nbOfTaps = this.sequence.length - this.humanSequence.length;
        this.displayInfo.textContent = `Votre tour: ${nbOfTaps}`;
    }

    initBtnStart(){
        this.startButton = document.getElementById('startBtn');
        this.displayInfo = document.getElementById('info');
        console.log('mon start', this.startButton);

        this.redButton = document.getElementById('red');
        this.redButton.addEventListener('click', this.handleClick.bind(this,'red'));

        this.blueButton = document.getElementById('blue');
        this.blueButton.addEventListener('click', this.handleClick.bind(this,'blue'));

        this.greenButton = document.getElementById('green');
        this.greenButton.addEventListener('click', this.handleClick.bind(this,'green'));

        this.yellowButton = document.getElementById('yellow');
        this.yellowButton.addEventListener('click', this.handleClick.bind(this,'yellow'));

        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    startGame(){
        this.display = new Display();
        // Faire fonction pour éviter de mélanger les opérations dans le DOM
        this.startButton.classList.add('hidden');
        this.displayInfo.classList.remove('hidden');
        this.displayInfo.textContent = 'The game is starting';
        this.nextLevel();
    }

    nextTile(){
        return this.tiles[Math.floor(Math.random() * 4)];
    }

    nextLevel(){
        this.level++;

        this.display.getContainer().classList.add('no-display');

        const newSequence = [...this.sequence];
        newSequence.push(this.nextTile());
        this.play(newSequence);

        this.sequence = [...newSequence];
        setTimeout(() => {
            this.timeToPlay();
        }, this.level * 600 + 1000);
    }

    play(newSequence){
        console.log('je suis là');
        newSequence.forEach((color, index) => { 
            setTimeout(() => {
                this.display.activateTile(color);
        }, (index+1) * 600);
    });
    }

    resetGame(){
        this.sequence = [];
        this.humanSequence = [];
        this.level = 0;
        this.displayInfo.classList.add('hidden');
        this.startButton.classList.remove('hidden');
        this.display.getContainer().classList.add('no-display');
    }

    timeToPlay(){
        this.display.getContainer().classList.remove('no-display');
        info.textContent = `Votre tour: ${this.level}`;
    }
}