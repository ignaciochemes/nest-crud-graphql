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
    private description: string;

    @Field({ nullable: false, description: "Role's status" })
    @Column({ default: true })
    private enable: boolean;

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public isEnable(): boolean {
        return this.enable;
    }

    public setEnable(enable: boolean): void {
        this.enable = enable;
    }


}
