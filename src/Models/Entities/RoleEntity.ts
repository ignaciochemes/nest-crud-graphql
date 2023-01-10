import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenericTable } from './GenericTable';

@ObjectType()
@Entity()
export class Role extends GenericTable {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field({ nullable: false, description: "Role's name" })
    @Column({ nullable: false, length: 100 })
    private name: string;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}
