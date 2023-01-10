import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenericTable } from "./GenericTable";
import { Project } from "./ProjectEntity";
import { Role } from "./RoleEntity";

@ObjectType()
@Entity()
export class Developer extends GenericTable {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field({ nullable: false, description: "Developer's name" })
    @Column({ nullable: false, length: 50 })
    private name: string;

    @Field({ nullable: false, description: "Developer's email" })
    @Column({ nullable: false, length: 50 })
    private email: string;

    @Field(type => [Project], { description: "Developer's projects" })
    @ManyToMany(() => Project, (project: Project) => project.id)
    @JoinTable()
    private projects: Project[];

    @Field(type => [Role], { description: "Developer's roles" })
    @ManyToMany(() => Role, (role: Role) => role.id)
    @JoinTable()
    private roles: Role[];

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getProjects(): Project[] {
        return this.projects;
    }

    public setProjects(projects: Project[]): void {
        this.projects = projects;
    }

    public getRoles(): Role[] {
        return this.roles;
    }

    public setRoles(roles: Role[]): void {
        this.roles = roles;
    }

}