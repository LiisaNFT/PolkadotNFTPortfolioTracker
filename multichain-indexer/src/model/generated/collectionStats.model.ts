import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import * as marshal from './marshal';
import { Collection } from './collection.model';

@Entity()
export class CollectionStats {
    constructor(props?: Partial<CollectionStats>) {
        Object.assign(this, props);
    }

    @PrimaryColumn()
    id!: string;

    @OneToOne(() => Collection, collection => collection.stats)
    @JoinColumn()
    collection!: Collection;

    @Column('bigint', { nullable: true, transformer: marshal.bigintTransformer })
    totalVolume?: bigint;

    @Column('bigint', { nullable: true, transformer: marshal.bigintTransformer })
    floorPrice?: bigint;

    @Column('int', { nullable: true })
    tokenCount?: number;

    @Column('bigint', { nullable: true, transformer: marshal.bigintTransformer })
    marketCap?: bigint;

    @Column('numeric', { nullable: true })
    highestSale?: number;

    @Column('timestamp with time zone', { nullable: true })
    lastSaleDate?: Date;

    @Column('bigint', { nullable: true, transformer: marshal.bigintTransformer })
    supply?: bigint;

    // Additional fields can be added here based on the data you need to store
}

