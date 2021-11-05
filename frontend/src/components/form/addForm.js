import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {create} from 'ipfs-http-client';

let web3 = require('../../utils/InitWeb3');
let AddNFT = require('../../asserts/abis');
const ipfs = create('http://localhost:5001/api/v0');

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NFTname:'',
            Price:0,
            Des:'',
            URI:'',
            TBuffer:null
        }
    }
    // const [NFTname, setNFTname] = useState('');
    // const [Price, setPrice] = useState(0);
    // const [Des, setDes] = useState('');
    // const [URI, setURI] = useState('');
    // const [TBuffer, setTBuffer] = useState('');
    
    changeName = (event) => {
        this.state.NFTname = event.target.value;
    }
    changePrice = (event) => {
        this.state.Price = event.target.value;
    }
    changeDes = (event) => {
        this.state.Des = event.target.value;
    }
    readPic = (event) => {
        var file = event.target.files[0];
        console.log(file.size);
        var reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({TBuffer: Buffer(reader.result)});
            console.log(this.state.TBuffer.size);
        }
    }
    upload = async (event) => {
        // console.log(NFTname);
        // console.log(Price);
        // console.log(Des);
        //TODO: add web3 api
        let accounts = await web3.eth.getAccounts()
        let hashx = await ipfs.add(this.state.TBuffer);
        // console.log(hashx.path);
        this.state.URI = `http://127.0.0.1:8080/ipfs/${hashx.path}`;
        // console.log(this.state.URI);
        // let x = await AddNFT.methods.getAllNFTs().call();
        await AddNFT.methods.createNFT(this.state.NFTname, this.state.URI, this.state.Des, this.state.Price).send({
            from: accounts[0],
            gas: '3000000'
        });
        // let y = await AddNFT.methods.getAllNFTs().call();
        // if (x < y){
        //     alert("恭喜，NFT创建成功");
        // }
        //ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[\"true\"]"
        // console.log(this.state.NFTname);
        // console.log(this.state.Price);
        // console.log(this.state.URI);
        // console.log(this.state.Des);
        // let ppp = AddNFT.methods.getURI(9).call();
        // console.log(ppp);
    };
    render(){
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                必要信息
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <input type="file" onChange={this.readPic}></input>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="NFT name"
                        name="NFT name"
                        label="NFT name"
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                        onChange={this.changeName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="ETH price"
                        name="ETH price"
                        label="ETH price"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        onChange={this.changePrice}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        id="Description"
                        name="Description"
                        label="Description"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        onChange={this.changeDes}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        onClick={this.upload}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Submit
                    </Button>
                </Box>
            </React.Fragment>
        );
    };
  }

  export default AddressForm;