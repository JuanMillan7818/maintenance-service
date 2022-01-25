import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";
import { Expert } from "../expert/expert.entity";
import { Maintenance } from "../maintenance/maintenance.entity";

@Entity({name: 'request_services'})
export class RequestServices {
    constructor(id_request: string, id_customer: number, 
                id_expert: number, id_service: number) {
        this.id_request = id_request;
        this.id_customer = id_customer;
        this.id_expert = id_expert;
        this.id_service = id_service;
        this.status = false;
    }

    @PrimaryColumn({name: 'id_request', type: 'varchar', length: 100})
    id_request: string;

    @ManyToOne(type => Customer, id => id.id_customer, {eager: true})
    @JoinColumn({name: 'id_customer', referencedColumnName: 'id_customer'})
    id_customer: number;

    @ManyToOne(() => Expert, id => id.id_expert, {eager: true})
    @JoinColumn({name: 'id_expert'})
    id_expert: number;

    @ManyToOne(() => Maintenance, id => id.id_service, {eager: true})
    @JoinColumn({name: 'id_service'})
    id_service: number;

    @Column({name: 'status', type: 'boolean'})
    status: boolean;

    @Column({name: 'date_service', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date_service: Date;
}