import React from 'react'
import { Hits, Pagination} from 'react-instantsearch-dom'
import { connectStateResults } from 'react-instantsearch/connectors'
import Hit from './Hit.js'

export default connectStateResults(
  ({ searchState, searchResults }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      <div>
      <Hits hitComponent={Hit} />
      <Pagination />
      </div>
    ) : (
      <div className={'darkModeText'}>
        No results found for <strong>{searchState.query}</strong>.
      </div>
    )
)
