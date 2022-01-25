import { ApiProperty } from "@nestjs/swagger";

export class ReqCreateMaintenanceDTO {
    @ApiProperty({
        description: 'Breve descripcion sobre que acciones hace el nuevo servicio que se piensa crear',
        example: 'Cambio de placa madre del televisor',            
        maxLength: 300
    })    
    description: string;

    @ApiProperty({
        description: 'Determinar que tipo de servicio es',
        example: 'Mantenimiento',            
        maxLength: 15
    })
    type: string;
}