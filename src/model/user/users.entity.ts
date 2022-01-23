import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()    
    id_user: number;    

    @Column({name: 'first_name', type: 'varchar', length: 40})
    first_name: string;

    @Column({name: 'last_name', type: 'varchar', length: 40})
    last_name: string;

    @Column({name: 'email', type: 'varchar', unique: true, length: 100})
    email: string;    
}