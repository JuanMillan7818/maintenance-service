import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'services'})
export class Maintenance {
    constructor(description: string, type: string) {
        this.description = description;
        this.type_maintenance = type;
    }

    @PrimaryGeneratedColumn({name: 'id_service'})
    id_service: number;

    @Column({name: 'text_description', type: 'varchar', length: 300})
    description: string;

    @Column({name: 'type_service', type: 'varchar', length: 15})
    type_maintenance: string;
}