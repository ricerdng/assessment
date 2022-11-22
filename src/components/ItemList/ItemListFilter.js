import "./ItemListFilter.css";

import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useState, useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const filters = [    
"Surveys and Forms",
"Digital Marketing",
"Platform News and Updates",
"Tips and Best Practise",
"Data Management",
"Marketing Analytics",
"Landing Pages",
"Ecommerce",
"Email Marketing", 
"Marketing Automation",
]

const ItemListFilter = (props) => {

    const [filterList, setFilterList] = useState([]);
    
    // Once filterList modified we fire the onChangeFilter to notify parent class
    useEffect(() => {
        props.onChangeFilter(filterList);
     }, [filterList,props]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setFilterList(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );        
    };    

    return (
        <div className='itemList-filter'>
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <FormControl sx={{ m: 1, width: 500 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                            multiple
                            value={filterList}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} size="small"/>
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                                {filters.map((filter) => (
                                    <MenuItem
                                    key={filter}
                                    value={filter}
                                    >
                                        {filter}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>                        
                    </Grid>
                </Grid>                
                
            </div>
        </div>
    )
}

export default ItemListFilter;