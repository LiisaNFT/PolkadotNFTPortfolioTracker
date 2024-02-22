import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class CollectionStats {
    constructor(props?: Partial<CollectionStats>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    totalVolume!: bigint | undefined | null

    @Column_("float", {transformer: marshal.bigintTransformer, nullable: true})
    floorPrice!: bigint | undefined | null

    @Column_("float", {transformer: marshal.bigintTransformer, nullable: true})
    floorPriceUSD!: bigint | undefined | null

    @Column_("int4", {nullable: true})
    tokenCount!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    marketCap!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    highestSale!: number | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    lastSaleDate!: Date | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    supply!: bigint | undefined | null

    @Column_("float", {nullable: true})
    floor1hDif!: number | undefined | null

    @Column_("float", {nullable: true})
    floor1hDifUsd!: number | undefined | null

    @Column_("float", {nullable: true})
    floor24hDif!: number | undefined | null

    @Column_("float", {nullable: true})
    floor24hDifUsd!: number | undefined | null

    @Column_("float", {nullable: true})
    floor7dDif!: number | undefined | null

    @Column_("float", {nullable: true})
    floor7dDifUsd!: number | undefined | null

    @Column_("float", {nullable: true})
    floor30dDif!: number | undefined | null

    @Column_("float", {nullable: true})
    floor30dDifUsd!: number | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    date!: Date | undefined | null;

}

