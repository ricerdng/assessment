import "./ItemList.css";
import Card from "../UI/Card";
import Item from "./Item";
import { useState, useEffect } from 'react';
import ItemListFilter from "./ItemListFilter";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [filters, setFilter] = useState([]);

    useEffect(() => {
        fetchItems();        
    }, [])

    useEffect(() => {
        //console.log('items useEffect =>' + items)
        items.forEach(item => {
            item.categories.forEach(category => {   
                (filterList.indexOf(category.name) === -1)&&filterList.push(category.name);
            })               
        });            
        setFilterList(filterList)
        //console.log('filterList useEffect =>' + filterList)
    }, [items,filterList])

    const fetchItems = () => {
        //Fetch data from mock API
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

    const filterChangeHandler = (categoriesFilter) => {
        setFilter(categoriesFilter);
    };

    return (
        <div>            
            <Card className="item-list">
                <ItemListFilter
                filterList={filterList}
                onChangeFilter={filterChangeHandler}
                />
                {/* Perform filtering before output the data */}
                {items.map((item) => {
                    let bMatch = false;

                    if(filters.length === 0){
                        bMatch = true;
                    }
                    else{
                        item.categories.forEach((category) => {
                            bMatch |= filters.includes(category.name)
                        })
                    }                    
                    
                    if(bMatch){
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
            </Card>
        </div>        
    )
}

export default ItemList;