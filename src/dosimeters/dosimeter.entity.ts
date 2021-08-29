import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
