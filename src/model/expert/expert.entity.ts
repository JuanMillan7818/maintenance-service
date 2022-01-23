import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity({name: 'experts'})
export class Expert {
    @PrimaryColumn({name: 'id_expert', type: 'integer'})
    @OneToOne(() => User)
    @JoinColumn({name: 'id_expert'})
    id_expert: number;

    @Column({name: 'refer_contract', type: 'varchar', length: 100})
    contract: string;

    @Column({name: 'max_request', type: 'integer'})
    max_request: number;
}