import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../../components/form/addForm.js';
import Test from '../home/test';
import '../home/home.css';
import Head from '../../components/bar/head';
let web3 = require('../../utils/InitWeb3');
function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/AXEwiges">
          My Github
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
} 
    const theme = createTheme();
  
  export default function Checkout() {
    return (
      <React.Fragment>  
      <Head/>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              表单测试
            </Typography>
            <React.Fragment>
                <form>
                <AddressForm/>
                </form>
            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
      </React.Fragment> 
    );
  }