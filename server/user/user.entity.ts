import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import Bcrypt from 'bcrypt';

@Entity('user') 
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number; 

    @Column({ type: 'varchar', nullable: false, length: 80, unique: true })
    email!: string;

    @Column({ type: 'varchar', nullable: false, length: 30 }) 
    name!: string; 

    @BeforeInsert() async hashPassword() { 
        this.password = await Bcrypt.hash(this.password, 10); 
    }
    @Column({ type: 'varchar', nullable: false, length: 80 })
    password!: string; 
}
