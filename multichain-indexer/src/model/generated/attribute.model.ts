import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Collection} from "./collection.model"
import {NfTokenAttribute} from "./nfTokenAttribute.model"

@Entity_()
export class Attribute {
    constructor(props?: Partial<Attribute>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Collection, {nullable: true})
    collection!: Collection

    @Index_()
    @Column_("text", {nullable: false})
    type!: string

    @Column_("text", {nullable: false})
    value!: string

    @OneToMany_(() => NfTokenAttribute, e => e.attribute)
    tokens!: NfTokenAttribute[]

    @Index_()
    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: false})
    rarity!: number
}
