import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links-container">
                    <ul className="social-links">
                        <li>
                            <a
                                href="https://github.com/nxusbets"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com/in/juancarlosdiazmendoza7"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <p className="copyright">&copy; 2025 Juan Carlos Diaz Mendoza. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;