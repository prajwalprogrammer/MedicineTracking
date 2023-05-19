import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import LoadingSpinner from './LoadingSpinner';
import F from './F'
import logo from '../src/images/logo.png'
function AddMed() {
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
    const [MED, setMED] = useState();
    const [MedName, setMedName] = useState();
    const [MedDes, setMedDes] = useState();
    const [MedStage, setMedStage] = useState();


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
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
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
    const handlerChangeNameMED = (event) => {
        setMedName(event.target.value);
    }
    const handlerChangeDesMED = (event) => {
        setMedDes(event.target.value);
    }
    const handlerSubmitMED = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addMedicine(MedName, MedDes).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    return (
        <div className='addMed'>
            <div className='navHome'>
            <img src={logo} className='logo'></img>
            <h3 className='titleHome'>Pharmaceutical Supply Chain</h3>
            <ul>
                <li onClick={redirect_to_home}>Home</li>
                <li onClick={redirect_to_roles}>Register</li>
                <li onClick={redirect_to_addmed}>Order Medicines</li>
                <li onClick={redirect_to_supply}>Control Supply Chain</li>
                <li onClick={redirect_to_track}>Track Medicines</li>
                <li onClick={redirect_to_last}>Contact Us</li>
            </ul>
        </div>
            <h1 className='registerhead'>Welcome please add your medicine here</h1>
            <div className='registerBlock'>
                <div className='card'>
                <span className='spanRegister'><b>Current Account Address:</b> {currentaccount}</span>
                <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm">HOME</span>
                </div>
            </div>
            <hr className='new1'></hr>
            {/* <span><b>Current Account Address:</b> {currentaccount}</span>
            <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm"> HOME</span>
            <br /> */}
            <h5 className='addMedHead'>Add Medicine Order:</h5>
            <form onSubmit={handlerSubmitMED}>
                <input className="form-control-sm addMedInput" type="text" onChange={handlerChangeNameMED} placeholder="Medicine Name" required />
                <input className="form-control-sm addMedInput" type="text" onChange={handlerChangeDesMED} placeholder="Medicine Description" required />
                <button className="btn btn-outline-success btn-sm btnInAdd" onSubmit={handlerSubmitMED}>Order</button>
            </form>
            <br />
            <h5 className='orderMed'>Ordered Medicines:</h5>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Stage</th>
                    </tr>
                </thead>
                <tbody>

                    {Object.keys(MED).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
                                <td>{MED[key].description}</td>
                                <td>
                                    {
                                        MedStage[key]
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <F/>
        </div>
    )
}

export default AddMed
