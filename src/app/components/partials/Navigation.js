import React from 'react';
import { IndexLink, Link } from 'react-router';

const Navigation = () => (
    <header>
        <nav className="container">
            <ul>
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                <li><Link to="/projekter" activeClassName="active">Projekter</Link></li>
            </ul>
        </nav>
    </header>
)
export default Navigation;