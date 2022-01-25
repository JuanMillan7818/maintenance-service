import { ApiProperty } from "@nestjs/swagger";

export class ReqCreateRequestDTO {
    @ApiProperty({
        description: 'id asociado al cliente que quiere realizar una solicitud de servicio',        
        minimum: 1,        
        example: 1,        
    })
    id_customer: number;

    @ApiProperty({
        description: 'id asociado a un servicio que preste la empresa',
        example: 1,
        minimum: 1,        
    })
    id_info_service: number;
}