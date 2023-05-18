import React from 'react'
import { useHistory } from "react-router-dom"
import img1 from "../src/images/medicine.jpg"
import imgGif from "../src/images/medGif.gif"
import imgDel from "../src/images/medicine-delivery.png"
import vitamin from "../src/images/vitamin.png"
import medAll from "../src/images/medAll.png"
import tracking from '../src/images/tracking.png'
import logo from '../src/images/logo.png'

function Home() {
    const history = useHistory()
    const redirect_to_roles = () => {
        history.push('/roles')
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
    return (
        <div>
        <div className='navHome'>
            <img src={logo} className='logo'></img>
            <h3 className='titleHome'>Pharmaceutical Supply Chain</h3>
            <ul>
                <li onClick={redirect_to_roles}>Register</li>
                <li onClick={redirect_to_addmed}>Order Medicines</li>
                <li onClick={redirect_to_supply}>Control Supply Chain</li>
                <li onClick={redirect_to_track}>Track Medicines</li>
            </ul>
        </div>
            <table className='table1'>
                <tr>
                    <td>
                        {/* <img className='imgHome' src={img1}></img> */}
                        <img className='imgHome' src={imgGif}></img>
                    </td>
                    <td>
                        <h1 className='headHome'>Welcome to the Pharmaceutical Supply Chain website</h1>
                        <p className='paraHome'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </td>
                </tr>
            </table>
            <div className='newDiv'>
                <table className='table2'>
                    <tr>
                        <td className='part1'>
                            <p>For registering Raw material suppliers ,Manufacturers, Distributors and Retailers</p>
                            <button onClick={redirect_to_roles} className="btn1">Register</button>
                        </td>
                        <td className='part2'>
                            <img src={imgDel} className='imgDel'></img>
                        </td>
                    </tr>
                </table>
            </div>
            {/* <h6>(Note: Here <u>Owner</u> is the person who deployed the smart contract on the blockchain)</h6>
            <h5>Step 1: Owner Should Register Raw material suppliers ,Manufacturers, Distributors and Retailers</h5> */}
            {/* <h6>(Note: This is a one time step. Skip to step 2 if already done)</h6>
            <button onClick={redirect_to_roles} className="btn btn-outline-primary btn-sm">Register</button>
            <br /> */}
            <div className='orderDiv'>
                <table className='table3'>
                    <tr>
                        <td className='part_1'>
                            <img src={vitamin} className='imgDel'></img>
                        </td>
                        <td className='part_2'>
                            <p>For ordering the medicines</p>
                            <button onClick={redirect_to_addmed} className="btn2">Order Medicines</button>
                        </td>
                    </tr>
                </table>
            </div>
            {/* <h5>Step 2: Owner should order medicines</h5>
            <button onClick={redirect_to_addmed} className="btn btn-outline-primary btn-sm">Order Medicines</button>
            <br /> */}
            <div className='newDiv'>
                <table className='table2'>
                    <tr>
                        <td className='part1'>
                            <p>For the details of control supply chain.</p>
                            <button onClick={redirect_to_supply} className="btn1">Control Supply Chain</button>
                        </td>
                        <td className='part_supp2'>
                            <img src={medAll} className='imgDel'></img>
                        </td>
                    </tr>
                </table>
            </div>
            {/* <h5>Step 3: Control Supply Chain</h5>
            <button onClick={redirect_to_supply} className="btn btn-outline-primary btn-sm">Control Supply Chain</button>
            <br />
            <hr />
            <br /> */}
            <div className='orderDiv'>
                <table className='table3'>
                    <tr>
                        <td className='part_1'>
                            <img src={tracking} className='imgDel'></img>
                        </td>
                        <td className='part_2'>
                            <p>For tracking the medicines</p>
                            <button onClick={redirect_to_track} className="btn2">Track Medicines</button>
                        </td>
                    </tr>
                </table>
            </div>
            {/* <h5><b>Track</b> the medicines:</h5>
            <button onClick={redirect_to_track} className="btn btn-outline-primary btn-sm">Track Medicines</button> */}
        </div>
    )
}

export default Home
