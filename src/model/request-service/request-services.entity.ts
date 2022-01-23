import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";
import { Expert } from "../expert/expert.entity";
import { Maintenance } from "../maintenance/maintenance.entity";

@Entity({name: 'request_services'})
export class RequestServices {
    @PrimaryColumn({name: 'id_request', type: 'varchar', length: 100})
    id_request: string;

    @OneToMany(() => Customer, id => id.id_customer)
    @JoinColumn({name: 'id_customer'})
    id_customer: string;

    @OneToMany(() => Expert, id => id.id_expert)
    @JoinColumn({name: 'id_expert'})
    id_expert: string;

    @OneToMany(() => Maintenance, id => id.id_service)
    @JoinColumn({name: 'id_service'})
    id_service: string;

    @Column({name: 'date_service', type: 'timestamp', default: 'CURRENT_TIMESTAMP'})
    date_service: Date;
}