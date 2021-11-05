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
import AddClaim from '../add/addClaim';
import AddBid from '../add/addBid';
import History from '../add/addHistory';

let web3 = require('../../utils/InitWeb3');
let AddNFT = require('../../asserts/abis');

function x(props){
    return(
        <AddAuction id={props}/>
    )
}

const columns = [
  { field: 'id', headerName: 'id', width: 100 },
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
  { field: 'price', headerName: 'price', width: 120 },
  { field: 'owner', headerName: 'owner', width: 280 },
  { field: 'receiver', headerName: 'receiver', width: 280 },
  { field: 'time', headerName: 'time last', width: 170 },
  { field: 'URI', headerName: 'URI', width: 120 },
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
  {
    field: "action",
    headerName: "Action",
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
      return <AddBid id={thisRow["id"]}/>;
    }
  },
  {
    field: "claim",
    headerName: "Claim",
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
      return <AddClaim id={thisRow["id"]} price={thisRow["price"]} to={thisRow["owner"]}/>;
    }
  },
];

class Market extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            nfts:[],
            rows:[],
            news:0
        }
    }
    UNSAFE_componentWillMount = async() => {
        console.log("Pre: ");
        await this.OK();
        const row = await this.datas();
        // console.log(this.state.rows)
        this.setState({rows: row});
    }

    OK = async() => {
        let cc = await AddNFT.methods.itemUid().call();
        console.log("cc=",cc);
        for(let i = 0;i < cc;i++){
            const nft = await AddNFT.methods.marketBoard(i).call();
            this.state.nfts = [...this.state.nfts, nft];
        }
        console.log(this.state.nfts.length);
    };
    datas = async() => {
        let accounts = await web3.eth.getAccounts();
        let rowss = [];
        var timestamp = Date.parse(new Date());
        console.log("nfts: ");
        console.log(this.state.nfts);
        for(let i = 0;i < this.state.nfts.length;i++){
            if(this.state.nfts[i].onauction == true){
                timestamp = parseInt(Date.parse(new Date())/1000);
                console.log("time: "+timestamp);
                const a = parseInt(this.state.nfts[i].uid);
                const b = await AddNFT.methods.auctions(i).call();
                console.log("auc: ");
                console.log(b);
                const c = await this.state.nfts[i].owner;
                const cc = await AddNFT.methods.getOwner(i).call();
                console.log("owner: "+cc)
                let e = String(b.finalvalue);
                let re = b.receiver;
                let xe = web3.utils.fromWei(e);
                let ps = await AddNFT.methods.hislen(i).call();
                let ii = this.state.nfts[i].tokenURI;
                console.log("times: "+e);
                let f = parseInt(b.endtime) - parseInt(timestamp);
                if(f > 0){
                    const d = {id:a, price:xe, owner:c, receiver:re, time:f, URI:ii};
                    console.log(d)
                    rowss = [...rowss, d];
                }
                else{
                    const d = {id:a, price:xe, owner:c, receiver:re, time:0, URI:ii};
                    console.log(d)
                    rowss = [...rowss, d];
                }
            }
        }
        return rowss;
    }

    render(){
        console.log("ME");
        return(
            <React.Fragment>  
            <Head/>
            <CssBaseline />
                <Container>
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

export default Market;