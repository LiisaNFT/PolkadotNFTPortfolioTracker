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
    floor_1h_dif!: number | undefined | null

    @Column_("float", {nullable: true})
    floor_1h_dif_usd!: number | undefined | null

    @Column_("float", {nullable: true})
    floor_24h_dif!: number | undefined | null

    @Column_("float", {nullable: true})
    floor_24h_dif_usd!: number | undefined | null

    @Column_("float", {nullable: true})
    floor_7d_dif!: number | undefined | null

    @Column_("float", {nullable: true})
    floor_7d_dif_usd!: number | undefined | null

    @Column_("float", {nullable: true})
    floor_30d_dif!: number | undefined | null

    @Column_("float", {nullable: true})
    floor_30d_dif_usd!: number | undefined | null
}

