import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenericTable } from "./GenericTable";
import { Role } from "./RoleEntity";

@ObjectType()
@Entity()
export class Project extends GenericTable {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field({ nullable: false, description: "Project's uuid" })
    @Column({ unique: true, length: 100, nullable: false })
    private uuid: string;

    @Field({ nullable: false, description: "Project's name" })
    @Column({ length: 100, nullable: false })
    private name: string;

    @Field({ nullable: false, description: "Project's description" })
    @Column({ length: 100, nullable: false })
    private description: string;

    @Field({ nullable: false, description: "Project's status" })
    @Column({ length: 100, nullable: false })
    private status: string;

    @Field(type => [Role], { description: "Project's required roles" })
    @ManyToMany(() => Role, (role: Role) => role.id)
    @JoinTable()
    private roles: Role[];

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getRoles(): Role[] {
        return this.roles;
    }

    public setRoles(roles: Role[]): void {
        this.roles = roles;
    }
}