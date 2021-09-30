import React from "react";
import './Footer.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGithub } from '@fortawesome/free-brands-svg-icons';


const Footer = () => (
    <div className="footer">
        <a href="https://github.com/rpassmore01/mars-weather-app" target="_blank">
            <h3 className='gitHubLink'><FontAwesomeIcon icon={faGithub} /> Check out this project on GitHub!</h3>
        </a>
    </div>
);

export default Footer;