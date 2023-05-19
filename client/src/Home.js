import React from 'react'
import { useHistory } from "react-router-dom"
import imgGif from "../src/images/medGif.gif"
import imgDel from "../src/images/medicine-delivery.png"
import vitamin from "../src/images/vitamin.png"
import medAll from "../src/images/medAll.png"
import tracking from '../src/images/tracking.png'
import logo from '../src/images/logo.png'
import SocialFollow from './SocialFollow'
import F from './F'

function Home() {
    const history = useHistory()
    const redirect_to_home = () => {
        history.push('/')
    }
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
    const redirect_to_last = () => {
        history.push('/last')
    }
    return (
        <div>
        <div className='navHome'>
            <img src={logo} className='logo'></img>
            <h3 className='titleHome' onClick={redirect_to_home}>Pharmaceutical Supply Chain</h3>
            <ul>
                <li class="hover-underline-animation" onClick={redirect_to_home}>Home</li>
                <li class="hover-underline-animation" onClick={redirect_to_roles}>Register</li>
                <li class="hover-underline-animation" onClick={redirect_to_addmed}>Order Medicines</li>
                <li class="hover-underline-animation" onClick={redirect_to_supply}>Control Supply Chain</li>
                <li class="hover-underline-animation" onClick={redirect_to_track}>Track Medicines</li>
                <li class="hover-underline-animation" onClick={redirect_to_last}>Contact Us</li>
            </ul>
        </div>
            <table className='table1'>
                <tr>
                    <td>
                        {/* <img className='imgHome' src={img1}></img> */}
                        <img className='imgHome' src={imgGif}></img>
                    </td>
                    <td>
                        <h1 className='headHome'>Welcome to the Pharmaceutical Supply Chain website!</h1>
                        <p className='paraHome'>Welcome to the website dedicated to the innovative project on Fake Medicine Supply Chain Detection Using Blockchain. In an era plagued by the proliferation of counterfeit medicines. By ensuring transparency, traceability, and authenticity in the supply chain, we strive to protect public health and combat the dangerous presence of fake medications.</p>
                    </td>
                </tr>
            </table>
            <div className='newDiv'>
                <table className='table2'>
                    <tr>
                        <td className='part1'>
                            <p>Want to be a part of us?</p>
                            <button onClick={redirect_to_roles} className="btn1">Register</button>
                            <p></p>
                            <h6>Raw Material Supplier | Manufacturer | Distributor | Retailer | Consumer</h6>
                        </td>
                        <td className='part2'>
                            <img src={imgDel} className='imgDel'></img>
                        </td>
                    </tr>
                </table>
            </div>
            <div className='orderDiv'>
                <table className='table3'>
                    <tr>
                        <td className='part_1'>
                            <img src={vitamin} className='imgDel'></img>
                        </td>
                        <td className='part_2'>
                            <p>For ordering the medicines...</p>
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
            <F/>
        </div>
    )
}

export default Home
