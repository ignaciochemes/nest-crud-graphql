import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class GenericTable {
    @Field()
    @CreateDateColumn({ name: "created_at" })
    public createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "updated_at" })
    public updatedAt: Date;

    @Field()
    @DeleteDateColumn({ name: "deleted_at" })
    public deletedAt: Date;
}