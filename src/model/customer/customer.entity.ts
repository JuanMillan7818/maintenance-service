import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity({name: 'customers'})
export class Customer {
    constructor(id: number) {
        this.id_customer = id;
    }

    @PrimaryColumn({name: 'id_customer', type: 'integer'})
    @OneToOne(() => User)    
    @JoinColumn({name: 'id_customer'})
    id_customer: number    

    @Column({name: 'date_start', type: 'timestamp', default: 'CURRENT_TIMESTAMP'})
    date_start: Date;
}
