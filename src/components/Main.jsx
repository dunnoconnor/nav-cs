import React, {useState} from 'react';
import Schools from './Schools';
import Search from './Search';

function Main() {
    const [searching, setSearching] = useState(false);
    const [searchProperties, setSearchProperties] = useState({stateCode:"MA"});
  
  
    function resetSearch(){
      setSearching(false);
    };
  
    function resolveSearch(searchTerms){
      setSearchProperties(searchTerms);
      setSearching(true);
    };
  
    return (
        <div>
            {searching ?  <Schools resetSearch={resetSearch} searchProperties={searchProperties}/> : <Search resolveSearch={resolveSearch}/>}
        </div>
    );
}

export default Main;