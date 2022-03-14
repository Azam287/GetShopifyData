import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn({type: "bigint"})
    id: string;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    body_html: string;

    @Column({nullable: true})
    vendor: string;

    @Column({nullable: true})
    product_type: string;

    @Column({nullable: true})
    created_at: string;

    @Column({nullable: true})
    handle: string;

    @Column({nullable: true})
    updated_at: string;

    @Column({nullable: true})
    published_at: string;

    @Column({nullable: true})
    template_suffix: string;

    @Column({nullable: true})
    status: string;

    @Column({nullable: true})
    published_scope: string;

    @Column({nullable: true})
    tags: string;

    @Column({nullable: true})
    admin_graphql_api_id: string;

    @Column("simple-json", {nullable: true})
    variants: {
        id: string,
        product_id: string,
        title: string,
        price: string,
        sku: string,
        position: string,
        inventory_policy: string,
        compare_at_price: string,
        fulfillment_service: string,
        inventory_management: string,
        option1: string,
        option2: string,
        option3: string,
        created_at: string,
        updated_at: string,
        taxable: string,
        barcode: string,
        grams: string,
        image_id: string,
        weight: string,
        weight_unit: string,
        inventory_item_id: string,
        inventory_quantity: string,
        old_inventory_quantity: string,
        requires_shipping: string,
        admin_graphql_api_id: string
    }[]

    @Column("simple-json", {nullable: true})
    options: {
        id: string,
        product_id: string,
        name: string,
        position: string,
        values: string[]
    }[]

    @Column("simple-json", {nullable: true})
    images: {
        id: string,
        product_id: string,
        position: string,
        created_at: string,
        updated_at: string,
        alt: string,
        width: string,
        height: string,
        src: string,
        variant_ids: string[],
        admin_graphql_api_id: string
    }[]

    @Column("simple-json", {nullable: true})
    image: {
        id: string,
        product_id: string,
        position: string,
        created_at: string,
        updated_at: string,
        alt: string,
        width: string,
        height: string,
        src: string,
        variant_ids: string[],
        admin_graphql_api_id: string
    }[]

    @Column({type: "float",nullable: true})
    price: number;

}
