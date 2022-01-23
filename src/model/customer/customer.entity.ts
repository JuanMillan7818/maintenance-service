import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../user/users.entity";

@Entity({name: 'customers'})
export class Customer {
    @PrimaryColumn({name: 'id_customer', type: 'integer'})
    @OneToOne(() => User)    
    @JoinColumn({name: 'id_customer'})
    id_customer: number    

    @Column({name: 'username', type: 'varchar', length: 40})
    username: string;
    
    @Column({name: 'user_password', type: 'varchar', length: 100})
    password: string
}
