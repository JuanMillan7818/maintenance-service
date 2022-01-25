import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'users'})
export class User {
    constructor(name: string, last_name: string, email: string, username: string, pass: string) {
        this.first_name = name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.password = pass;
    }

    @PrimaryGeneratedColumn()    
    id_user: number;    

    @Column({name: 'first_name', type: 'varchar', length: 40})
    first_name: string;

    @Column({name: 'last_name', type: 'varchar', length: 40})
    last_name: string;

    @Column({name: 'email', type: 'varchar', unique: true, length: 100})
    email: string;   
    
    @Column({name: 'username', type: 'varchar', unique: true, length: 40})
    username: string;
    
    @Column({name: 'user_password', type: 'varchar', length: 100})
    password: string;
}