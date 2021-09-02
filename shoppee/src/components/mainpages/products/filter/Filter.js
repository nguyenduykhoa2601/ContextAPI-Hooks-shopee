import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import './Filter.css';
function Filter() {
    const state=useContext(GlobalState)
    
    const [sort,setSort] = state.productsAPI.sort
    
    
    
    return (
        <div className="home__controls-products">
            <div className="home__controls-filter">
                <span className="home__controls-title">Sắp xếp theo</span>
                <button className={`home__controls-btn ${sort==='sort=-sale'?'home__controls-btn--active':''}`} onClick={()=>setSort('sort=-sale')}>Giảm giá mạnh</button>
                <button className={`home__controls-btn ${sort===''?'home__controls-btn--active':''}`} onClick={()=>setSort('')}>Mới nhất</button>
                <button className={`home__controls-btn ${sort==='sort=-sold'?'home__controls-btn--active':''}`} onClick={()=>setSort('sort=-sold')}>Bán chạy</button>
               
               
                <select className="filter__price" value={sort} onChange={e=>setSort(e.target.value)}>
                    <option className="filter__price-item" value='' >Tất cả</option>
                    <option className="filter__price-item" value='sort=currentPrice'>
                        Từ thấp đến cao
                        
                    </option>
                    <option className="filter__price-item" value='sort=-currentPrice'>
                        Từ cao đến thấp
                    </option>
                </select>
            </div>
            
        </div>
    );
}


export default Filter;
