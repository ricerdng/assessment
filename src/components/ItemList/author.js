import Card from '../UI/Card';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import "./author.css";

const Author = (props) => {
    return (
        <Card className="author">
            <div>
                <Grid 
                container 
                spacing={1} 
                alignItems="center"
                justifyContent="center">
                    <Grid item xs={5}>
                        <img src={props.avatar} alt="Logo" />
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="button" display="block">
                            {props.name}
                        </Typography>
                    </Grid>
                </Grid>                                
            </div>        
        </Card>        
    )
}

export default Author;