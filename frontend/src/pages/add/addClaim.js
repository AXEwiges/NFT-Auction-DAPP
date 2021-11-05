import React, { useState, useEffect } from 'react';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
let web3 = require('../../utils/InitWeb3');
let AddNFT = require('../../asserts/abis');

function AddClaim(props){
    const upload = async () => {
        let accounts = await web3.eth.getAccounts();
        // var timestamp = parseInt(Date.parse(new Date())/1000);
        // console.log("time: "+timestamp);
        // console.log(props.id);
        let z = await AddNFT.methods.auctions(parseInt(props.id)).call();
        let p = z.finalvalue;
        // console.log(web3.utils.toWei(p));
        await AddNFT.methods.claim(parseInt(props.id)).send({
            from: accounts[0],
            value: p,
            gas: '3000000'
        });
    }
    return (
        <>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

        <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossorigin></script>

        <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin></script>

          <Button variant="primary" onClick={upload}>
            Claim
          </Button>
        </>
      );
}

export default AddClaim;