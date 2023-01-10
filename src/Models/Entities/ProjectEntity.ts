import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Developer } from "./DeveloperEntity";
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

    @Field(type => [Developer], { description: "Project's developers" })
    @OneToMany(() => Developer, (developer: Developer) => developer.id)
    private devs: Developer[];

    @Field(type => [Role], { description: "Project's required roles" })
    @OneToMany(() => Role, (role: Role) => role.id)
    private requiredRoles: Role[];

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

    public getDevs(): Developer[] {
        return this.devs;
    }

    public setDevs(devs: Developer[]): void {
        this.devs = devs;
    }

    public getRequiredRoles(): Role[] {
        return this.requiredRoles;
    }

    public setRequiredRoles(requiredRoles: Role[]): void {
        this.requiredRoles = requiredRoles;
    }



}