import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class CollectionStats {
    constructor(props?: Partial<CollectionStats>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string;

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    totalVolume!: bigint | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floorPrice!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floorPriceUSD!: number | null;

    @Column_("int4", {nullable: true})
    tokenCount!: number | null;

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    marketCap!: bigint | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    highestSale!: number | null;

    @Column_("timestamp with time zone", {nullable: true})
    lastSaleDate!: Date | null;

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    supply!: bigint | null;

    @Column_("int4", {nullable: true})
    salesCount24h!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floorPriceChange!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floor1hDif!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floor1hDifUsd!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floor24hDif!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floor24hDifUsd!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floor7dDif!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floor7dDifUsd!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floor30dDif!: number | null;

    @Column_("float", {transformer: marshal.floatTransformer, nullable: true})
    floor30dDifUsd!: number | null;

    @Column_("timestamp with time zone", {nullable: true})
    date!: Date | null;

}

