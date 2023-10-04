import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class ContractFunctionOnErc1155Received {
    constructor(props?: Partial<ContractFunctionOnErc1155Received>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    blockTimestamp!: Date

    @Index_()
    @Column_("text", {nullable: false})
    transactionHash!: string

    @Index_()
    @Column_("text", {nullable: false})
    contract!: string

    @Index_()
    @Column_("text", {nullable: false})
    functionName!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    functionValue!: bigint | undefined | null

    @Index_()
    @Column_("bool", {nullable: true})
    functionSuccess!: boolean | undefined | null

    @Column_("text", {nullable: false})
    param0!: string

    @Column_("text", {nullable: false})
    param1!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    param2!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    param3!: bigint

    @Column_("text", {nullable: false})
    param4!: string
}
