const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
         this.index = index;
         this.timestamp = timestamp;
         this.data = data;
         this.previousHash = previousHash;
         this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "09/02/2019", "Genesis block", "0");
    }

    getLatestBlock(){
     return this.chain[this.chain.length - 1];  
    }

    addBlock(newBlock){
       newBlock.previousHash = this.getLatestBlock().hash;
       newBlock.hash = newBlock.calculateHash();
       this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i< this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            return true;
        }
    }
}

let sattu = new Blockchain();
sattu.addBlock(new Block(1, "10/02/2019", { amount: 4}));
sattu.addBlock(new Block(2, "15/02/2019", { amount: 69}));
sattu.addBlock(new Block(3, "14/03/2019", { amount: 25}));
sattu.addBlock(new Block(4, "14/03/2019", { amount: 27}));

 console.log(JSON.stringify(sattu, null, 4));

//console.log(sattu.isChainValid());
