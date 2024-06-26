import { addressOf } from './helper';
import {
  BaseCall, CallWith, Context, UnwrapFunc,
} from './types';

function toBaseEvent(ctx: Context): BaseCall {
  const caller = addressOf(ctx.event.extrinsic?.signature?.address);
  const blockNumber = ctx.block.height.toString();
  const timestamp = new Date(ctx.block.timestamp);

  return { caller, blockNumber, timestamp };
}

export function unwrap<T>(ctx: Context, unwrapFn: UnwrapFunc<T>): CallWith<T> {
  const baseCall = toBaseEvent(ctx);
  const unwrapped = unwrapFn(ctx);
  return { ...baseCall, ...unwrapped };
}
