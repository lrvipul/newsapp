import React, { Component } from 'react'

import { Link } from "react-router-dom";

export default class NavBar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link key="general" className="nav-link" aria-current="page" to="/">Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link key="general" className="nav-link" to="/">General</Link>
                                </li>
                                <li className="nav-item">
                                    <Link key="business" className="nav-link" to="/business">Business</Link>
                                </li>
                                <li className="nav-item">
                                    <Link key="entertainment" className="nav-link" to="/entertainment">Entertainment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link key="health" className="nav-link" to="/health">Health</Link>
                                </li>
                                <li className="nav-item">
                                    <Link key="science" className="nav-link" to="/science">Science</Link>
                                </li>
                                <li className="nav-item">
                                    <Link key="sports" className="nav-link" to="/sports">Sports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link key="technology" className="nav-link" to="/technology">Technology</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
