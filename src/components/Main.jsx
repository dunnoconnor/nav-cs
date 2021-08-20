import React, {useState} from 'react';
import Schools from './Schools';
import Search from './Search';

function Main() {
    //state storing search toggle and properties
    const [searching, setSearching] = useState(false);
    const [searchProperties, setSearchProperties] = useState({stateCode:"MA"});
    //reset search on return from schools view
    function resetSearch(){
      setSearching(false);
    };
    //set search properties and display schools list
    function resolveSearch(searchTerms){
      setSearchProperties(searchTerms);
      setSearching(true);
    };
    //ternary to show schools list or search menu
    return (
        <div>
            {searching ?  <Schools resetSearch={resetSearch} searchProperties={searchProperties}/> : <Search resolveSearch={resolveSearch}/>}
        </div>
    );
}

export default Main;