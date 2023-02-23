class Game{
    constructor(tiles){
        this.tiles = tiles;
        this.sequence = [];
        this.humanSequence = [];
    }

    handleClick(tile){
        const index = this.humanSequence.push(tile) - 1;

        if(this.humanSequence[index] !== this.sequence[index]){
            this.resetGame();
            return 'Vous avez perdu...';
        }

        if(this.humanSequence.length === this.sequence.length){
            if(this.humanSequence.length === 5){
                this.resetGame();
                return 'Vous avez gagné!!!';
            }
            this.humanSequence = [];
            setTimeout(() => {
                this.nextLevel();
            }, 1000);
            return '';
        }
        return this.sequence.length - this.humanSequence.length;
    }

    nextTile(){
        return this.tiles[Math.floor(Math.random() * 4)];
    }

    nextLevel(){
        const newSequence = [...this.sequence];
        newSequence.push(this.nextTile());
        this.play(newSequence);
        this.sequence = [...newSequence];
        return newSequence;
    }

    resetGame(){
        this.sequence = [];
        this.humanSequence = [];
        this.level = 0;
    }
}