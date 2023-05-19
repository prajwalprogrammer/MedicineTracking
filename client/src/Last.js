import React from 'react'
import { useHistory } from "react-router-dom"
import logo from '../src/images/logo.png'
import imgGif from "../src/images/medGif.gif"
import F from './F'

function Last() {
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
    const redirect_to_last = () => 
    {
        history.push('/last')
    }
    return (
        <div>
        <div className='navHome'>
            <img src={logo} className='logo'></img>
            <h3 className='titleHome'>Pharmaceutical Supply Chain</h3>
            <ul>
                <li><a onClick={redirect_to_home}>Home</a></li>
                <li><a onClick={redirect_to_roles}>Register</a></li>
                <li><a onClick={redirect_to_addmed}>Order Medicines</a></li>
                <li><a onClick={redirect_to_supply}>Control Supply Chain</a></li>
                <li><a onClick={redirect_to_track}>Track Medicines</a></li>
                <li><a onClick={redirect_to_last}>Contact Us</a></li>
            </ul>
        </div>
            <div className='newDiv'>
                <table className='table1'>
                    <tr>
                        <td>
                            <br></br>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                width="600"
                                height="450"
                                style={{ border: 1 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            />
                        </td>
                        <td>
                            <h1 className='headHome'>Have queries?</h1>
                            <h4 className='headHome'>React out to us at:</h4>
                            <p className='paraHome'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </td>
                    </tr>
                    <br></br>
                </table>
            </div>
            <F/>
        </div>
    )
}

export default Last
