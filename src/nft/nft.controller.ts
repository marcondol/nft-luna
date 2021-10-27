import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NftService } from './nft.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post("/mint")
  create(@Body() createNftDto: CreateNftDto) {
    return this.nftService.create(createNftDto);
  }

  @Post("/whitelist")
  createwhitelist(@Body() createWhitelistDto: CreateWhitelistDto) {
    return this.nftService.createWhitelist(createWhitelistDto);
  }

  @Get("/whitelist")
  getwhitelist() {
    return this.nftService.getWhitelist();
  }

  @Get("/getsupply")
  getSupply() {
    return this.nftService.getSupply();
  }

  @Get('/gettoken/:id')
  findOne(@Param('id') id: number) {
    return this.nftService.findOne(+id);
  }

  @Get('/getowner/:tokenid')
  getowner(@Param('tokenid') tokenid: string) {
    return "null";
  }

  @Get('/getcontractinfo')
  getcontractinfo() {
    return this.nftService.contractInfo();
  }

 
}
