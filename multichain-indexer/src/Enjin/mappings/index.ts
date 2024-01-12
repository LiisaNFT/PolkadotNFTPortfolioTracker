export {
  handleErc721Transfer,
  handleErc1155TransferBatch,
  handleErc1155TransferSingle
} from './transfers';
export { handleErc1155UriChanged } from './uriUpdateActions';
import multiTokens from './multiTokens'
import balances from './balances'
import marketplace from './marketplace'
import claims from './claims'
import xcm from './xcm'
import fuelTanks from './fuelTanks'

export { multiTokens, balances, marketplace, claims, xcm, fuelTanks }
