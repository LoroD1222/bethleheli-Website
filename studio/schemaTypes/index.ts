import {accommodation} from './documents/accommodation'
import {groupClimbsPage} from './documents/groupClimbsPage'
import {groupDeparture} from './documents/groupDeparture'
import {trip} from './documents/trip'
import {tripSettings} from './documents/tripSettings'
import {benefit} from './objects/benefit'
import {contentImage} from './objects/contentImage'
import {inclusionGroup} from './objects/inclusionGroup'
import {inclusionItem} from './objects/inclusionItem'
import {itineraryDay} from './objects/itineraryDay'
import {landscape} from './objects/landscape'
import {money} from './objects/money'
import {relatedTripCard} from './objects/relatedTripCard'
import {seo} from './objects/seo'

export const schemaTypes = [
  trip,
  accommodation,
  groupDeparture,
  tripSettings,
  groupClimbsPage,
  contentImage,
  money,
  seo,
  relatedTripCard,
  itineraryDay,
  landscape,
  inclusionGroup,
  inclusionItem,
  benefit,
]
