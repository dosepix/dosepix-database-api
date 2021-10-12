import { Column, Entity, OneToMany,BeforeInsert, PrimaryGeneratedColumn } from "typeorm";
import { Measurement } from "../measurements/measurement.entity";
import { Role } from "../guard/role.enum";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({unique: true})
    name: string;
    @Column({select: false})
    fullName: string;
    @Column({select: false})
    email: string;
    // Important: never return hashed password!
    @Column({select: false})
    password: string;
    @Column({select: true, default: Role.User})
    role: Role;

    @OneToMany(type => Measurement, meas => meas.user)
    measurements: Measurement[];

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }  
}
