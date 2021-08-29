import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Dosimeter } from "../dosimeters/dosimeter.entity";

@Entity()
export class Measurement {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({default: "meas"})
    name: string;
    // @Column()
    // userId: number;
    // @Column()
    // dosimeterId: number;
    @Column({default: 0})
    totalDose: number;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToOne(type => Dosimeter)
    @JoinColumn()
    dosimeter: Dosimeter;
}
