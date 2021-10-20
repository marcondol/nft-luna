import { Injectable } from '@nestjs/common';

import { LCDClient, MsgExecuteContract, MnemonicKey } from '@terra-money/terra.js';


const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12',
});


const mk = new MnemonicKey({
  mnemonic:
    'empower laptop potato monitor firm excess virtual matter orient toy wagon spell trigger say review slab real increase match middle spend wagon shell enroll',
});

const wallet = terra.wallet(mk);

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const send = new MsgExecuteContract(
      'terra1kp209vznl6r9ky0exzqygfwhgky27pm7qklagm',
      'terra1ejm29a3s9y8znrkcchp4gl9w4r79mjg9mk6kj8',
      {
        "mint": {
          "name": "token_name",
          "token_id": "10004",    
          "owner": "terra1mzcvtvqml8k5a9e4p4t2h2wxguctcz4fc9jx63",    
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
        'terra1etskav4tg3hw8vpp7vqp5g4xunmaepjfev7hqf',
        { 
          query: { 
              "num_tokens": {}    
           } 
        } // query msg
      );
  
      return result  
    } catch (error) {
      return error
    }
    

  }
}
