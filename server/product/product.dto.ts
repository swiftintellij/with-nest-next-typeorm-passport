import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class ProductDto {
    @Field(() => Int)
    readonly id?: number;

    @Field()
    readonly title!: string;

    @Field(() => Int)
    readonly price!: number;
}

