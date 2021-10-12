import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Dosimeter } from "../dosimeters/dosimeter.entity";
import { Point } from "../points/point.entity";

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

    @Column()
    userId: number;

    @Column()
    dosimeterId: number;

    @ManyToOne(type => User, user => user.measurements, {onDelete: "CASCADE"})
    // @JoinColumn()
    user: User;

    @ManyToOne(type => Dosimeter, dosimeter => dosimeter.measurements,  {onDelete: "CASCADE"})
    // @JoinColumn()
    dosimeter: Dosimeter;

    @OneToMany(type => Point, point => point.measurement)
    points: Point[];
}
