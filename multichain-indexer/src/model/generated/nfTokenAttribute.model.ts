import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {NfToken} from "./nfToken.model"
import {Attribute} from "./attribute.model"

@Entity_()
export class NfTokenAttribute {
    constructor(props?: Partial<NfTokenAttribute>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => NfToken, {nullable: true})
    nftoken!: NfToken

    @Index_()
    @ManyToOne_(() => Attribute, {nullable: true})
    attribute!: Attribute
}
