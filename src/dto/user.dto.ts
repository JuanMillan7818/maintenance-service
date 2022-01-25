import { ApiProperty } from "@nestjs/swagger";

export class ReqCreateUserDTO {
    @ApiProperty({
        description: 'Nombres del usuario que se va a crear',
        examples: ['Juan Pablo', 'Anderson'],
        maxLength: 40
    })
    first_name: string;

    @ApiProperty({
        description: 'Apellidos del usuario que se va a crear',
        examples: ['Millan', 'Hernandez Rodriguez'],
        maxLength: 40
    })
    last_name: string;    

    @ApiProperty({
        description: 'Direccion de correo electronico del usuario',
        example: 'juan@gmail.com',
        maxLength: 100
    })
    email: string;

    @ApiProperty({
        description: 'Nombre unico de usuario para el ingreso al sistema',
        examples: ['juan123', 'anderson431'],
        maxLength: 40
    })
    username: string;

    @ApiProperty({
        description: 'Contraseña para ingresar al sistema',
        examples: ['Juan Pablo', 'Anderson'],
        maxLength: 100
    })
    password: string;
}