import { lookupArchive } from "@subsquid/archive-registry";
import {
    BatchContext,
    BatchProcessorItem,
    SubstrateBatchProcessor,
  } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";

export const processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: lookupArchive("astar", {
            release: "FireSquid",
            type: "Substrate",
        }),
    })
    .addEvent("Contracts.ContractEmitted");

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;

