import { ApiProperty } from "@nestjs/swagger";

export class CreateWhitelistDto {
    @ApiProperty()
    addresses: [string]
}
