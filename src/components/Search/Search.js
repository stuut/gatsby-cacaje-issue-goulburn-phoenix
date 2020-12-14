import React from "react";
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
  Pagination,
  CurrentRefinements,
  ClearRefinements,
} from 'react-instantsearch-dom';
import Hit from "./Hit";
import filterIcon from '../../../static/filter.svg'
import { Link } from 'gatsby'


class Search extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false,
      showFilter: false
    };
  }

  handleClick() {
    this.setState(prevState => ({
      active: !prevState.active,
      showFilter: !prevState.showFilter,
    }));
  }

render() {


  return (
    <div>

          <InstantSearch
          appId="U8JDDS4KEE"
          apiKey="0afa3c4d71ac2da30f71df864155acb0"
          indexName="Goulburn_Phoenix"
          >

          <div >
          <div style={{outline: '0'}} className={'filterToggle'} tabIndex={0}  role = "button" onKeyDown={this.handleClick} onClick={this.handleClick}><img src={filterIcon} alt="filter results"/>{this.state.showFilter ? 'HIDE FILTERS': 'SHOW FILTERS'}</div>

          <div className={'mainBody darkModeDarkBackground'}>

            <div className={this.state.active ? 'active': null}>
              <div className={'mobilePadding'}>
              <p style={{fontWeight:'600', textTransform:'uppercase', fontSize:'1.2rem',}}>REFINE</p>
              <ClearRefinements />
              <CurrentRefinements />

              <p style={{marginTop:'25px', borderTop:'1px solid #ffffff', fontWeight:'600', paddingTop:'10px', textTransform:'uppercase', fontSize:'1rem'}}>Categories</p>

              <RefinementList attribute="categories.title" limit={20}

              />

              <p style={{marginTop:'25px', borderTop:'1px solid #ffffff', fontWeight:'600', paddingTop:'10px', textTransform:'uppercase', fontSize:'1rem'}}>Topics</p>
              <RefinementList attribute="tags.title" limit={35} />

              <p style={{marginTop:'25px', borderTop:'1px solid #ffffff', fontWeight:'600', paddingTop:'10px', textTransform:'uppercase', fontSize:'1rem'}}>Author</p>
              <RefinementList attribute="author.title"/>


              <div style={{marginTop:'25px', borderTop:'1px solid #ffffff', paddingTop:'10px'}}>
                <Link to="/our-latest-issue/"><span>Read The Latest Issue</span></Link>
              </div>
              </div>
            </div>
            <div>
              <div className={'searchboxArea'}>
              <SearchBox translations={{ placeholder: "Search" }} />
              <div className={'algolia-logo'}>
              </div>
              </div>
              <Hits hitComponent={Hit}/>
                <Pagination />
            </div>
          </div>
          </div>




          </InstantSearch>


    </div>
  );
 }
}


export default Search
