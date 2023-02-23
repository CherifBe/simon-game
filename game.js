class Game{
    constructor(tiles){
        this.tiles = tiles;
        this.sequence = [];
        this.humanSequence = [];
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

    nextTile(){
        return this.tiles[Math.floor(Math.random() * 4)];
    }

    nextLevel(){
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
}