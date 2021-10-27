import { Injectable } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';


import { LCDClient, MsgExecuteContract, MnemonicKey,Coin, Coins } from '@terra-money/terra.js';

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

const contract = "terra1gqakrtac4e9y7mjf8l67wxz43f4r86lymgt5kj";
const ownerAddress = wallet.key.accAddress;
@Injectable()
export class NftService {
  async create(createNftDto: CreateNftDto) {
    const c = new Coin('uluna', 1000000)
    const coins = new Coins([c])
    const send = new MsgExecuteContract(
      ownerAddress,
      contract,
      {
        "mint": { 
          "name": createNftDto.name,         
          "token_id": createNftDto.token_id,              
          "owner": createNftDto.owner,
          "token_uri": createNftDto.token_uri,
          "extension": createNftDto.extension
         }
      },
      coins 
    );
   
    try {
      const tx = await wallet.createAndSignTx({
        msgs: [send],
        memo: 'mint nft',
      })
  
      const res =  await terra.tx.broadcast(tx);
      return res.txhash    
        
    } catch (error) {
      return error      
    }    
  }

  async getSupply() {
    try {
      const result = await terra.wasm.contractQuery(
        contract,
        { 
          "num_tokens": {}    
        } 
      );
  
      return result  
    } catch (error) {
      return error
    }
  }

  async contractInfo() {
    try {
      const result = await terra.wasm.contractQuery(
        contract,
        { 
          "contract_info": {}    
        } 
      );
  
      return result  
    } catch (error) {
      return error
    }
  }

  async getWhitelist() {
    try {
      const result = await terra.wasm.contractQuery(
        contract,
        { 
          "white_list": {}    
        } 
      );
  
      return result  
    } catch (error) {
      return error
    }
  }
  

  findOne(id: number) {
    return `This action returns a #${id} nft`;
  }

  async createWhitelist(createWhitelistDto: CreateWhitelistDto) {
    const c = new Coin('uluna', 10)
    const coins = new Coins([c])
    const send = new MsgExecuteContract(
      ownerAddress,
      contract,
      {
        "update_white_list": {
          "addresses": createWhitelistDto.addresses
        }
      },
      coins 
    );
   
    try {
      const tx = await wallet.createAndSignTx({
        msgs: [send],
        memo: 'mint nft',
      })
  
      const res =  await terra.tx.broadcast(tx);
      return res.txhash    
        
    } catch (error) {
      return error      
    }  
  }

  remove(id: number) {
    return `This action removes a #${id} nft`;
  }
}
