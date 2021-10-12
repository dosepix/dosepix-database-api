import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Measurement } from "../measurements/measurement.entity";

@Entity()
export class Point {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    time: number;
    @Column("double")
    dose: number;
    @Column()
    measurementId: number;
    
    @ManyToOne(type => Measurement, meas => meas.points, {onDelete: "CASCADE"})
    // @JoinColumn()
    measurement: Measurement;
}
