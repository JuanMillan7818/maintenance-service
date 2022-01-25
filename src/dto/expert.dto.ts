import { ApiProperty } from "@nestjs/swagger";

export class ReqCreateExpertDTO {
    @ApiProperty({
        description: 'id relacionado al usuario ya existente que se convertira en tecnico de la empresa',
        minimum:1,
        example:1
    })
    id_expert: number;

    @ApiProperty({
        description: 'Codigo de referencia del contrato del tecnico',
        example: 'ACV123ASDFSDF'
    })
    refer_contract: string;

    @ApiProperty({
        description: 'Indica la cantidad maxima de solicitudes de trabajo puede aceptar el tecnico',
        minimum: 8,
        example: 14
    })
    max_request: number;
}