class Game{
    constructor(tiles, nbTiles){
        this.tiles = tiles;
        this.nbTiles = nbTiles;
        this.sequence = [];
        this.humanSequence = [];
        this.i = 0;
    }

    handleClick(tile){
        console.log(tile);
        const index = this.humanSequence.push(tile) - 1;
        if(this.humanSequence[index] !== this.sequence[index]){
            this.resetGame();
            alert('Vous avez perdu...');
            return true;
        }

        if(this.humanSequence.length === this.sequence.length){
            if(this.humanSequence.length === 5){
                this.resetGame();
                alert('Vous avez gagné!!!');
                return true;
            }
            this.humanSequence = [];
            return 'res';
        }
    }

    nextTile(k = false, j){
        if(!k){
            return this.tiles[Math.floor(Math.random() * this.nbTiles)];
        }
        return this.tiles[j];
    }

    nextLevel(){ // On n'utilise plus cette fonction dans la version aléatoire
        this.newSequence = this.sequence;
        this.newSequence.push(this.nextTile());
        this.sequence = this.newSequence;
        return this.newSequence;
    }

    resetGame(){
        this.sequence = [];
        this.humanSequence = [];
        this.level = 0;
    }

    generateNewSequence(i = 0){
        let k = true;
        if(i === 0){
            k = false;
            this.i++;
            i = this.i;
        }
        this.newSequence = [];
        for(let j = 0; j < i; j++){
            this.newSequence.push(this.nextTile(k, j));
        }
        this.sequence = this.newSequence;
        return this.newSequence;
    }
}