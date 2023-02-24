class Display{

    constructor(){
        this.tiles = ['red', 'blue', 'green', 'yellow', 'aqua', 'fuchsia', 'gray', 'lime', 'navy', 'olive', 'purple', 'silver'];
        this.level = 0;
        this.nbTiles = 10;
        this.game = new Game(this.tiles, this.nbTiles);
        this.initDisplay();
    }

    initDisplay(){ // Lancer fonction lorsque l'on soumet le formulaire
        this.container = document.querySelector('.container');
        this.startButton = document.getElementById('startBtn');
        this.displayInfo = document.getElementById('info');


        const tilesToDisplay = this.game.generateNewSequence(this.nbTiles); // TODO: penser modulo (prendre moitié du tableau)
        let j = 0;
        let k = 0;
        let groupTiles = [];// TODO: optimiser ça
        groupTiles.push(document.createElement('div'));
        groupTiles[k].classList.add('grouptiles');
        tilesToDisplay.forEach(tile => {
            
            if( j % 4 === 0 ){
                k++;
                groupTiles.push(document.createElement('div'));
                groupTiles[k].classList.add('grouptiles'); 
            }
            j++;

            let divTile = document.createElement('div');
            divTile.classList.add('tile');

            let btnTile = document.createElement('button');
            btnTile.id = tile;
            btnTile.classList.add('tileElement');
            btnTile.style["background-color"] = tile;
            btnTile.addEventListener('click', () => {
                let res = this.game.handleClick(tile);
                if(res === 'res'){
                    setTimeout(() => {
                        // this.play(this.game.nextLevel());
                        this.play();
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



   /*     this.tiles.forEach(tile => {
            document.getElementById(tile).addEventListener('click', () => {
                let res = this.game.handleClick(tile);
                if(res === 'res'){
                    setTimeout(() => {
                        // this.play(this.game.nextLevel());
                        this.play();
                    }, 1000);
                }
                if(res === true){ // Si renvoie 'true' la partie en cours est terminé
                    this.reset();
                }

            });
        }) */
        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    startGame(){
        this.startButton.classList.add('hidden');
        this.displayInfo.classList.remove('hidden');
        this.displayInfo.textContent = 'Le jeu commence...';

        this.container.classList.add('no-display');
        
        this.level++;
        //this.play(this.game.nextLevel());
        this.play();
        setTimeout(() => {
            this.timeToPlay();
        }, this.level * 600 + 1000);
    }

    /*play(newSequence){
        console.log(newSequence);
        newSequence.forEach((color, index) => { 
            setTimeout(() => {
                this.activateTile(color);
        }, (index+1) * 600);
    });
    } */

    play(){
        if(!this.container.classList.contains('no-display')){
            this.container.classList.add('no-display');
        }
        this.game.generateNewSequence().forEach((color, index) => {
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