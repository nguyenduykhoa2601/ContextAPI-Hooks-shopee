import React, {  useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import './Search.css'

function Search() {
    const state= useContext(GlobalState)
    const [search,setSearch] = state.productsAPI.search
    return (
        <div className="header__search">
            <input className="header__search-input" placeholder="Bạn đang tìm kiếm gì?"  onChange={e=>setSearch(e.target.value)}/>
            
            <button className="header__search-btn" onClick={()=>{setSearch(search)}}>
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}


export default Search;
