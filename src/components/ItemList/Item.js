
import "./Item.css"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Author from './author'
import Category from './category'

const Item = (props) => {

    return (
        <div className="item">
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <br></br>                    
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Author
                            name={props.author.name}
                            avatar={props.author.avatar}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2" color="text.secondary">
                                {props.publishDate}
                            </Typography>
                            <Typography variant="body1" component="div">
                                {props.summary}
                            </Typography>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={1} >
                        {props.categories.map((category) => {
                                return(
                                    <Grid item key={category.id}>
                                        <Category                                        
                                        name={category.name}
                                        />
                                    </Grid>
                                )
                            })}
                    </Grid>                        
                                  
                </CardContent>
            </Card>
        </div>        
    )
}

export default Item;