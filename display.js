class Display{

    constructor(){
        this.tiles = ['red', 'blue', 'green', 'yellow', 'aqua', 'fuchsia', 'gray', 'lime', 'navy', 'olive', 'purple', 'silver'];
        this.userPreference();
        this.level = 0;
        this.nbTiles = 0;
        this.linear = true;
    }

    initDisplay(){ // Cette fonction est lancée une fois que le formulaire est envoyé

        document.getElementById('userPreference').classList.add('hidden');
        this.game = new Game(this.tiles, this.nbTiles);

        this.container = document.querySelector('.container');
        this.startButton = document.getElementById('startBtn');
        this.startButton.classList.remove('hidden');
        this.displayInfo = document.getElementById('info');

        const tilesToDisplay = (this.linear) ? this.tiles.slice(0,this.nbTiles) : this.game.generateNewSequence(this.nbTiles);
        let j = 0;
        let k = 0;
        let groupTiles = [];
        groupTiles.push(document.createElement('div'));
        groupTiles[k].classList.add('grouptiles');
        tilesToDisplay.forEach(tile => {
            
            if( j % ((this.nbTiles > 8) ? 4 : (this.nbTiles / 2) ) === 0 ){ // Si le joueur a selectionné un mode avec plus de 8 tuiles, on fait des lignes de 4.
                k++;
                groupTiles.push(document.createElement('div'));
                groupTiles[k].classList.add('grouptiles'); 
            }
            j++;

            const divTile = document.createElement('div');
            divTile.classList.add('tile');

            const btnTile = document.createElement('button');
            btnTile.id = tile;
            btnTile.classList.add('tileElement');
            btnTile.style["background-color"] = tile;
            btnTile.addEventListener('click', () => {
                let res = this.game.handleClick(tile);
                if(res === 'res'){
                    setTimeout(() => {
                        (this.linear) ? this.play(this.game.nextLevel()) : this.play();
                    }, 1000);
                }
                if(res === true){ // Si renvoie 'true' la partie en cours est terminé
                    this.reset();
                }
            });

            divTile.appendChild(btnTile);
            groupTiles[k].appendChild(divTile);
            this.container.appendChild(groupTiles[k]);
        });

        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    userPreference(){
        document.getElementById('userPreference').addEventListener('submit', (e) => this.formTreatment(e));
    }

    formTreatment(e){
        e.preventDefault();

        const nbTiles = document.getElementById('chooseNbTiles');
        const aleatoireMode = document.getElementById('aleatoire');
        
        if(nbTiles.value > 0 || nbTiles.value <= 12){
            this.nbTiles = nbTiles.value;
        }
        else{
            return;
        }
        if(aleatoireMode.checked){
            this.linear = false;
        }
        this.initDisplay();
    }

    startGame(){
        this.startButton.classList.add('hidden');
        this.displayInfo.classList.remove('hidden');
        this.displayInfo.textContent = 'Le jeu commence...';

        this.container.classList.add('no-display');
        
        this.level++;
        (this.linear) ? this.play(this.game.nextLevel()) : this.play();
        setTimeout(() => {
            this.timeToPlay();
        }, this.level * 600 + 1000);
    }

    play(sequence = null){
        if(!this.container.classList.contains('no-display')){
            this.container.classList.add('no-display');
        }
        if(sequence == null || !(this.linear)){
            sequence = this.game.generateNewSequence();
        }
        sequence.forEach((color, index) => {
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
        this.timeToPlay();
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