import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';

import Head from '../../components/bar/head';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@mui/material/Button';

import Modal from "react-bootstrap/Modal";

import AddAuction from '../add/addAuction';

let web3 = require('../../utils/InitWeb3');
let AddNFT = require('../../asserts/abis');

const columns = [
  { field: 'id', headerName: 'id', width: 270 },
  { field: 'owner', headerName: 'owner', width: 270 },
];

class History extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            nfts:[],
            rows:[],
            news:0
        }
    }
    UNSAFE_componentWillMount = async() => {
        // console.log("Pre: ");
        await this.OK();
        const row = await this.datas();
        // console.log(this.state.rows)
        this.setState({rows: row});
    }

    OK = async() => {
        let cc = await AddNFT.methods.itemUid().call();
        // console.log("cc=",cc);
        for(let i = 0;i < cc;i++){
            const nft = await AddNFT.methods.marketBoard(i).call();
            this.state.nfts = [...this.state.nfts, nft];
        }
        // console.log(this.state.nfts.length);
    };
    datas = async() => {
        let rowss = [];
        var check = 0;
        // console.log(this.props);
        let uid = parseInt(this.props.match.params.id);
        let hislength = await AddNFT.methods.hislen(uid).call();
        // console.log(hislength);
        for(let i = 0;i < hislength;i++){
            let x = await AddNFT.methods.Historys(uid, i).call();
            const c = x;
            const d = {id:check,owner:c};
            check++;
            // console.log(d)
            rowss = [...rowss, d];
            
        }
        return rowss;
    }

    render(){
        // console.log("ME");
        return(
            <React.Fragment>  
            <Head/>
            <CssBaseline />
                <Container component="main" >
                    <Grid item xs={12}>
                    <div style={{ height: 400, width: '100%' }} align="center">
                    <DataGrid
                        rows={this.state.rows}
                        columns={columns}
                        // pageSize={5}
                        // rowsPerPageOptions={[5]}
                        // checkboxSelection
                    />
                    </div>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    };

}

export default History;