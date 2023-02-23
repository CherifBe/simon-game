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
            return true;
        }

        if(this.humanSequence.length === this.sequence.length){
            if(this.humanSequence.length === 5){
                this.resetGame();
                return true;
            }
            this.humanSequence = [];
            //this.displayInfo.textContent = 'C\'est gagné!';
            setTimeout(() => {
                this.nextLevel();
            }, 1000);
            return;
        }
        const nbOfTaps = this.sequence.length - this.humanSequence.length;
        //this.displayInfo.textContent = `Votre tour: ${nbOfTaps}`;
    }

    nextTile(){
        return this.tiles[Math.floor(Math.random() * 4)];
    }

    nextLevel(){
        const newSequence = [...this.sequence];
        newSequence.push(this.nextTile());
        this.play(newSequence);

        this.sequence = [...newSequence];
    }

    play(newSequence){
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

    resetGame(){
        this.sequence = [];
        this.humanSequence = [];
        this.level = 0;
    }
}