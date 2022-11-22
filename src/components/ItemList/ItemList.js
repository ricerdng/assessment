import "./ItemList.css";

import Card from "../UI/Card";
import Item from "./Item";
import { useState, useEffect } from 'react';
import ItemListFilter from "./ItemListFilter";
import Pagination from '@mui/material/Pagination';

const ITEM_PER_PAGE = 5

const ItemList = () => {
    const [items, setItems] = useState([]); //Ori data from server
    const [selectedFilters, setSelectedFilter] = useState([]);  //Selected filters
    const [filteredItems, setFitleredItem] = useState([]);  //Filtered data
    const [currentPage, setCurrentPage] = useState(1);  //Filtered data

    useEffect(() => {
        fetchItems();        
    }, [])

    // Filter data source once the selected filter changed
    useEffect(() => {
        let filteredItems = [];

        items.forEach((item) => {
            let bMatch = false;

            if(selectedFilters.length === 0){
                bMatch = true;
            }
            else{
                item.categories.forEach((category) => {
                    bMatch |= selectedFilters.includes(category.name)
                })
            }                    
            
            if(bMatch){
                filteredItems.push(item)
            }
        })

        setFitleredItem(filteredItems);
        setCurrentPage(+1);  //reset to default page
    }, [selectedFilters,items])

    //Fetch data from mock API
    const fetchItems = () => {        
        fetch('http://localhost:3000/api/posts', {
            method: "GET"  
        }).then(res => res.json())
        .then(result => {
            setItems(result.posts)
            console.log('Fetch Data Complete')                    
        }).catch((err) => {
            console.log(err)
        })
    } 

    // Child class ItemListFilter return the selected filters from user
    const filterChangeHandler = (categoriesFilter) => {
        setSelectedFilter(categoriesFilter);
    };

    const paginationClicked = (event) => {
        setCurrentPage(+event.target.textContent)
    }

    return (
        <div>            
            <Card className="item-list">
                <ItemListFilter
                onChangeFilter={filterChangeHandler}
                />
                {filteredItems.map((item,index) => {

                    if(index >= (ITEM_PER_PAGE * (currentPage - 1)) && index < (currentPage * ITEM_PER_PAGE)){
                        return(
                            <Item
                            key={item.id}
                            title={item.title}
                            publishDate={item.publishDate}
                            author={item.author}
                            summary={item.summary}
                            categories={item.categories}
                            />
                        )                    
                    }                        
                })}
                <Pagination 
                count={Math.ceil(filteredItems.length / ITEM_PER_PAGE)} 
                color="primary" 
                onClick={(event) => paginationClicked(event)} page={currentPage}
                hideNextButton={true}
                hidePrevButton={true}
                />            
            </Card>
        </div>        
    )
}

export default ItemList;