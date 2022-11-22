import Chip from '@mui/material/Chip';

const Category = (props) => {
    return (
        <div>
            <Chip label={props.name} variant="outlined" size="small"/>
        </div>        
    )
}

export default Category;