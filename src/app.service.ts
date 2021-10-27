import { Injectable } from '@nestjs/common';

import { LCDClient, MsgExecuteContract, MnemonicKey } from '@terra-money/terra.js';


const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12',
});

// walletku
// const mk = new MnemonicKey({
//   mnemonic:
//     'empower laptop potato monitor firm excess virtual matter orient toy wagon spell trigger say review slab real increase match middle spend wagon shell enroll',
// });

//Wallet kevin
const mk = new MnemonicKey({
  mnemonic:
    'evolve enroll put track tell clinic pulp lucky potato milk online neutral power raccoon blanket credit derive october adult audit major rally pool travel',
});



const wallet = terra.wallet(mk);

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const send = new MsgExecuteContract(
      'terra1mzcvtvqml8k5a9e4p4t2h2wxguctcz4fc9jx63',
      'terra1tpztpe3vh84xddfstm5tanemegqku8prqv86e3',
      {
        "mint": {          
          "token_id": "10001",    
          // "owner": "terra1mzcvtvqml8k5a9e4p4t2h2wxguctcz4fc9jx63",    
          "token_uri": "QmQPziwFBW9zLVggTbStowV28khP5riFNmHjJxowAA5q25",
          "extension": {}
         }
      },
      { uluna: 1000000 } 
    );

    try {
      const tx = await wallet.createAndSignTx({
        msgs: [send],
        memo: 'mint nft',
      })
  
      const res =  await terra.tx.broadcast(tx);
      console.log(res);
      return res.txhash    
        
    } catch (error) {
      return error      
    }

  }

  async getTotalSupply(): Promise<any> {
    try {
      const result = await terra.wasm.contractQuery(
        'terra1tpztpe3vh84xddfstm5tanemegqku8prqv86e3',
        { 
          "num_tokens": {}    
        } 
      );
  
      return result  
    } catch (error) {
      return error
    }
    

  }
}
