import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {NfToken} from "./nfToken.model"
import {EventType} from "./_eventType"
import {Account} from "./account.model"

@Entity_()
export class NftEvent {
    constructor(props?: Partial<NftEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("text", {nullable: false})
    txnHash!: string

    @Index_()
    @ManyToOne_(() => NfToken, {nullable: true})
    nfToken!: NfToken

    @Index_()
    @Column_("varchar", {length: 8, nullable: false})
    eventType!: EventType

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    from!: Account

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    to!: Account

    @Index_()
    @Column_("text", {nullable: false})
    marketplace!: string

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price!: bigint

    @Index_()
    @Column_("text", {nullable: false})
    chain!: string
}
