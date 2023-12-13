import { SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { u8aToHex } from '@polkadot/util'
import { UnknownVersionError } from '../../../src/common/errors'
import { FuelTanksRuleSetRemovedEvent } from '../../../src/types/generated/events'
import { Event as EventModel, FuelTankRuleSet, PermittedExtrinsics } from '../../../src/modelEnjin'
import { Event } from '../../../src/types/generated/support'
import { CommonContext } from '../../types/contexts'

function getEventData(ctx: CommonContext, event: Event) {
    const data = new FuelTanksRuleSetRemovedEvent(ctx, event)

    if (data.isMatrixEnjinV603) {
        return data.asMatrixEnjinV603
    }

    throw new UnknownVersionError(data.constructor.name)
}

export async function ruleSetRemoved(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: EventItem<'FuelTanks.RuleSetRemoved', { event: { args: true; extrinsic: true } }>
): Promise<EventModel | undefined> {
    const eventData = getEventData(ctx, item.event)

    if (!eventData) return undefined

    const ruleId = `${u8aToHex(eventData.tankId)}-${eventData.ruleSetId}`

    await ctx.store.delete(PermittedExtrinsics, { ruleSet: { id: ruleId } })
    await ctx.store.delete(FuelTankRuleSet, { id: ruleId })

    return undefined
}
