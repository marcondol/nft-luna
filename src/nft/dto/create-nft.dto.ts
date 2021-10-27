import { ApiProperty } from "@nestjs/swagger";

export class extension {
    @ApiProperty()
    image: string
    @ApiProperty()
    image_data: string
    @ApiProperty()
    external_url: string
    @ApiProperty()
    description: string
    @ApiProperty()
    name: string
    @ApiProperty()
    attributes: [string]
    @ApiProperty()
    background_color: string
    @ApiProperty()
    animation_url: string
    @ApiProperty()
    youtube_url: string
}

export class CreateNftDto {
    @ApiProperty()
    owner: string
    @ApiProperty()
    name: string
    @ApiProperty()
    token_id: string        
    @ApiProperty()
    token_uri: string
    @ApiProperty()
    extension: extension    
}
