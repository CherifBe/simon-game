class Game{
    constructor(tiles, nbTiles){
        this.tiles = tiles;
        this.nbTiles = nbTiles;
        this.sequence = [];
        this.humanSequence = [];
        this.i = 0;
    }

    handleClick(tile){
        const index = this.humanSequence.push(tile) - 1;
        if(this.humanSequence[index] !== this.sequence[index]){ // Si la tuile qu'a joué l'utilisateur ne correspond pas à la tuile présente dans le tableau qu'a joué la machine cela veut dire que l'utilisateur n'a pas choisi la bonne tuile, donc la partie est terminé et l'utilisateur a perdu
            this.resetGame();
            alert('Vous avez perdu...');
            return true;
        }

        if(this.humanSequence.length === this.sequence.length){ // Ici l'utilisateur a joué la bonne tuile, la partie continue
            if(this.humanSequence.length === 5){ // Si la taille atteint 5, le jeu est terminé, l'utilisateur a gagné
                this.resetGame();
                alert('Vous avez gagné!!!');
                return true;
            }
            this.humanSequence = [];
            return 'res';
        }
    }

    nextTile(k = false, j = null){
        if(!k){ // Lorsque la machine joue une nouvelle tuile k est false, donc on vient prendre au hasard (random) un élément du tableau
            return this.tiles[Math.floor(Math.random() * this.nbTiles)];
        }
        return this.tiles[j]; // On arrive ici lorsqu'on génère un nouveau tableau pour une nouvelle partie, on n'utilise pas de random pour garder chaque tuile unique
    }

    nextLevel(){ // On n'utilise plus cette fonction dans le mode de jeu aléatoire
        this.newSequence = this.sequence;
        this.newSequence.push(this.nextTile());
        this.sequence = this.newSequence;
        return this.newSequence;
    }

    resetGame(){ // Lorsque le jeu est terminé on vient on réinitialise tout à 0
        this.sequence = [];
        this.humanSequence = [];
        this.level = 0;
    }

    generateNewSequence(i = 0){ // Cette fonction vient nous générer une nouvelle séquence
        // Si i est passé en paramètre on vient prendre i pour générer notre séquence, on passe par cette option au début du jeu pour générer toutes nos tuiles
        // Sinon on prend le i courant 'this.i' pour générer au fur et à mesure de la partie la nouvelle tuile à jouer
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