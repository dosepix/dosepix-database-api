import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Measurement } from "../measurements/measurement.entity";

@Entity()
export class Dosimeter {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({unique: true})
    name: string;
    @Column()
    color: string;
    @Column({default: 0})
    totalDose: string;

    @OneToMany(type => Measurement, meas => meas.dosimeter)
    measurements: Measurement[];
}
