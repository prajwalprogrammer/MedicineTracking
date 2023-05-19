import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import { useHistory } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"
import logo from '../src/images/logo.png'
import F from './F'

function AssignRoles() {
    const history = useHistory()
    const redirect_to_roles = () => {
        history.push('/roles')
    }
    const redirect_to_last = () => 
    {
        history.push('/last')
    }
    const redirect_to_addmed = () => {
        history.push('/addmed')
    }
    const redirect_to_supply = () => {
        history.push('/supply')
    }
    const redirect_to_track = () => {
        history.push('/track')
    }
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])
    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [RMSname, setRMSname] = useState();
    const [MANname, setMANname] = useState();
    const [DISname, setDISname] = useState();
    const [RETname, setRETname] = useState();
    const [RMSplace, setRMSplace] = useState();
    const [MANplace, setMANplace] = useState();
    const [DISplace, setDISplace] = useState();
    const [RETplace, setRETplace] = useState();
    const [RMSaddress, setRMSaddress] = useState();
    const [MANaddress, setMANaddress] = useState();
    const [DISaddress, setDISaddress] = useState();
    const [RETaddress, setRETaddress] = useState();
    const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            var i;
            const rmsCtr = await supplychain.methods.rmsCtr().call();
            const rms = {};
            for (i = 0; i < rmsCtr; i++) {
                rms[i] = await supplychain.methods.RMS(i + 1).call();
            }
            setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
           <LoadingSpinner />
        )

    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerChangeAddressRMS = (event) => {
        setRMSaddress(event.target.value);
    }
    const handlerChangePlaceRMS = (event) => {
        setRMSplace(event.target.value);
    }
    const handlerChangeNameRMS = (event) => {
        setRMSname(event.target.value);
    }
    const handlerChangeAddressMAN = (event) => {
        setMANaddress(event.target.value);
    }
    const handlerChangePlaceMAN = (event) => {
        setMANplace(event.target.value);
    }
    const handlerChangeNameMAN = (event) => {
        setMANname(event.target.value);
    }
    const handlerChangeAddressDIS = (event) => {
        setDISaddress(event.target.value);
    }
    const handlerChangePlaceDIS = (event) => {
        setDISplace(event.target.value);
    }
    const handlerChangeNameDIS = (event) => {
        setDISname(event.target.value);
    }
    const handlerChangeAddressRET = (event) => {
        setRETaddress(event.target.value);
    }
    const handlerChangePlaceRET = (event) => {
        setRETplace(event.target.value);
    }
    const handlerChangeNameRET = (event) => {
        setRETname(event.target.value);
    }
    const handlerSubmitRMS = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addRMS(RMSaddress, RMSname, RMSplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitMAN = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addManufacturer(MANaddress, MANname, MANplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDIS = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addDistributor(DISaddress, DISname, DISplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRET = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addRetailer(RETaddress, RETname, RETplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }



    return (
        <div className='register'>
            <div className='navHome'>
            <img src={logo} className='logo'></img>
            <h3 className='titleHome'onClick={redirect_to_home}>Pharmaceutical Supply Chain</h3>
            <ul>
                <li class="hover-underline-animation" onClick={redirect_to_home}>Home</li>
                <li class="hover-underline-animation" onClick={redirect_to_roles}>Register</li>
                <li class="hover-underline-animation" onClick={redirect_to_addmed}>Order Medicines</li>
                <li class="hover-underline-animation" onClick={redirect_to_supply}>Control Supply Chain</li>
                <li class="hover-underline-animation" onClick={redirect_to_track}>Track Medicines</li>
                <li class="hover-underline-animation" onClick={redirect_to_last}>Contact Us</li>
            </ul>
        </div>
            <h1 className='registerhead'>Welcome to the register page!</h1>
            <div className='registerBlock'>
                <div className='card'>
                <span className='spanRegister'><b>Current Account Address:</b> {currentaccount}</span>
                </div>
            </div>
            <hr className='new1'></hr>
            <h4 className="registerTitle">Raw Material Suppliers:</h4>
            <form onSubmit={handlerSubmitRMS}>
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangeAddressRMS} placeholder="Ethereum Address" required />
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangeNameRMS} placeholder="Raw Material Supplier Name" required />
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangePlaceRMS} placeholder="Based In" required />
                <button className="btn btn-outline-success btn-sm btnInRegister" onSubmit={handlerSubmitRMS}>Register</button>
            </form>
            <table className="table table-sm tableTop">
                <thead>
                    <tr>
                        <th scope="col" className='headingTable'>ID</th>
                        <th scope="col" className='headingTable'>Name</th>
                        <th scope="col" className='headingTable'>Place</th>
                        <th scope="col" className='headingTable'>Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(RMS).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{RMS[key].id}</td>
                                <td>{RMS[key].name}</td>
                                <td>{RMS[key].place}</td>
                                <td>{RMS[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h4 className="registerTitle">Manufacturers:</h4>
            <form onSubmit={handlerSubmitMAN}>
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangeAddressMAN} placeholder="Ethereum Address" required />
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangeNameMAN} placeholder="Manufacturer Name" required />
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangePlaceMAN} placeholder="Based In" required />
                <button className="btn btn-outline-success btn-sm btnInRegister" onSubmit={handlerSubmitMAN}>Register</button>
            </form>
            <table className="table table-sm tableTop">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MAN).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MAN[key].id}</td>
                                <td>{MAN[key].name}</td>
                                <td>{MAN[key].place}</td>
                                <td>{MAN[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h4 className="registerTitle">Distributors:</h4>
            <form onSubmit={handlerSubmitDIS}>
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangeNameDIS} placeholder="Distributor Name" required />
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangePlaceDIS} placeholder="Based In" required />
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangeAddressDIS} placeholder="Ethereum Address" required />
                <br></br>
                <button className="btn btn-outline-success btn-sm btnInRegister" onSubmit={handlerSubmitDIS}>Register</button>
            </form>
            <table className="table table-sm tableTop">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(DIS).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{DIS[key].id}</td>
                                <td>{DIS[key].name}</td>
                                <td>{DIS[key].place}</td>
                                <td>{DIS[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h4 className="registerTitle">Retailers:</h4>
            <form onSubmit={handlerSubmitRET}>
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangeAddressRET} placeholder="Ethereum Address" required />
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangeNameRET} placeholder="Retailer Name" required />
                <input className="form-control-sm formRegister" type="text" onChange={handlerChangePlaceRET} placeholder="Based In" required />
                <button className="btn btn-outline-success btn-sm btnInRegister" onSubmit={handlerSubmitRET}>Register</button>
            </form>
            <table className="table table-sm tableTop">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(RET).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{RET[key].id}</td>
                                <td>{RET[key].name}</td>
                                <td>{RET[key].place}</td>
                                <td>{RET[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <F/>
        </div>
    )
}

export default AssignRoles
