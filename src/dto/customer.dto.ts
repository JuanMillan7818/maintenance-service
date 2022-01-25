import { ApiProperty } from "@nestjs/swagger";

export class ReqCreateCustomerDTO {
    @ApiProperty({
        description: 'id relacionado al usuario ya existente que se creara como cliente',
        minimum:1,
        example:1
    })
    id_customer: number;    
}