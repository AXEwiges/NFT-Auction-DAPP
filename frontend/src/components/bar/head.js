import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
const theme = createTheme();
export default function Head(){
    return(
        <React.Fragment>
            <AppBar
            position="absolute"
            color="primary"
            elevation={0}
            sx={{
                position: 'relative',
                borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
            >
                <Toolbar>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" noWrap>
                        <a href='/market' style={{textDecoration:'none', color:"white"}}>Explore</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" noWrap>
                        <a href='/create' style={{textDecoration:'none', color:"white"}}>Create</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" noWrap>
                        <a href='/me' style={{textDecoration:'none', color:"white"}}>MyNFTs</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" noWrap>
                        <a href='/made' style={{textDecoration:'none', color:"white"}}>IMade</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" noWrap>
                        <a href='/myauc' style={{textDecoration:'none', color:"white"}}>MyAuction</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" noWrap>
                        <a href='/buyin' style={{textDecoration:'none', color:"white"}}>MyBuy</a>
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}