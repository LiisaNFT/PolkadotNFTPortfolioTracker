import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_, OneToOne} from "typeorm"
import * as marshal from "./marshal"
import {ContractStandard} from "./_contractStandard"
import {NfToken} from "./nfToken.model"
import { CollectionStats } from './collectionStats.model';

@Entity_()
export class Collection {
    constructor(props?: Partial<Collection>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("varchar", {length: 7, nullable: false})
    collectionType!: ContractStandard

    @OneToOne(() => CollectionStats, stats => stats.collection, { 
        // additional options like cascade or eager loading
    })
    stats!: CollectionStats;

    @OneToMany_(() => NfToken, e => e.collection)
    nfts!: NfToken[]

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    createdAtBlock!: bigint

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    createdAt!: Date

    @Index_()
    @Column_("text", {nullable: true})
    name!: string | undefined | null
}
