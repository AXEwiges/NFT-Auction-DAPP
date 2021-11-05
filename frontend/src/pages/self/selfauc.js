import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';

import Head from '../../components/bar/head';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Button from '@mui/material/Button';
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";

import AddAuction from '../add/addAuction';

let web3 = require('../../utils/InitWeb3');
let AddNFT = require('../../asserts/abis');

const columns = [
  { field: 'id', headerName: 'id', width: 170 },
  {
    field: "img",
    headerName: "img",
    sortable: false,
    width:210,
    renderCell: (params) => {
        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
      return  <img src={thisRow["URI"]} style={{maxHeight:170, width:'auto'}}/>
    }
  },
  { field: 'URI', headerName: 'URI', width: 270 },
  { field: 'owner', headerName: 'owner', width: 270 },
  { field: 'time', headerName: 'time last', width: 270 },
  {
    field: "history",
    headerName: "history",
    sortable: false,
    renderCell: (params) => {
        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        let x = '/history/'+parseInt(thisRow["id"]);
      return <Button href={x} variant="primary">History</Button>;
    }
  },
];

class SelfAucTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            nfts:[],
            aucs:[],
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
        let accounts = await web3.eth.getAccounts();
        let rowss = [];
        var timestamp = Date.parse(new Date());
        // console.log(timestamp);
        for(let i = 0;i < this.state.nfts.length;i++){
            // console.log(this.state.nfts[i].owner," ",accounts[0]);
            timestamp = parseInt(Date.parse(new Date())/1000);
            let x = await AddNFT.methods.getOwner(i).call();
            if(x == accounts[0] && this.state.nfts[i].onauction == true){
                timestamp = Date.parse(new Date());
                const e = await AddNFT.methods.auctions(i).call();
                let f = parseInt(e.endtime) - parseInt(timestamp);;
                const a = parseInt(this.state.nfts[i].uid);
                const b = await AddNFT.methods.getURI(i).call();
                const c = x;
                if(f > 0){
                    const d = {id:a, URI:b, owner:c, time:f};
                    rowss = [...rowss, d];
                }
                else{
                    const d = {id:a, URI:b, owner:c, time:0};
                    rowss = [...rowss, d];
                }
            }
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
                        rowHeight={210}
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

export default SelfAucTable;