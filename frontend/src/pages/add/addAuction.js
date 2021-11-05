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

function AddAuction(props){
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(0);
    const [time, setTime] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function changeValue(event){
        setValue(event.target.value);
    }
    function changeTime(event){
        setTime(event.target.value);
    }
    const upload = async () => {
        let accounts = await web3.eth.getAccounts();
        // var timestamp = parseInt(Date.parse(new Date())/1000);
        // console.log(props.id);
        await AddNFT.methods.createAuction(parseInt(props.id), web3.utils.toWei(String(value)), parseInt(time)).send({
            from: accounts[0],
            gas: '3000000'
        });
        // let z = await AddNFT.methods.auctions(parseInt(props.id)).call();
        // console.log(z);
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

          <Button variant="primary" onClick={handleShow}>
            Auction
          </Button>
    
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <label>Set Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      onChange={changeValue}
                    />
                        {/* <TextField
                        required
                        id="NFT value"
                        name="NFT value"
                        label="NFT value"
                        fullWidth
                        variant="outlined"
                        onChange={changeValue}
                        /> */}
                    </Grid>
                    <Grid item xs={12}>
                    <label>Set time</label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      onChange={changeTime}
                    />
                        {/* <TextField
                        required
                        id="ETH price"
                        name="ETH price"
                        label="ETH price"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        onChange={changeTime}
                        /> */}
                    </Grid>
                </Grid>
            </React.Fragment>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={upload}>Upload</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default AddAuction;