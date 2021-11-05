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

function AddBid(props){
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function changeValue(event){
        setValue(event.target.value);
    }
    const upload = async () => {
        let accounts = await web3.eth.getAccounts();
        // console.log(props.id);
        // const x = await AddNFT.methods.auctions(props.id).call();
        // console.log("x: ");
        // console.log(x);
        await AddNFT.methods.Bid(parseInt(props.id), web3.utils.toWei(String(value))).send({
            from: accounts[0],
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

          <Button variant="primary" onClick={handleShow}>
            Bid
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

export default AddBid;