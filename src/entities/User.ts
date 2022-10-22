import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity } from "typeorm"

@Entity('users')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    lastname: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string;

    @Column({type: 'timestamp', name: 'created_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @Column({type: 'timestamp', name: 'updated_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;
}
