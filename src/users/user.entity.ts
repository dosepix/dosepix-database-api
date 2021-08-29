import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
