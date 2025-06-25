import React from 'react';
import Logo from '../assets/logo t4teq.ico';
import { Link } from 'react-router-dom';
import './T4teq.css';

function T4teq() {
    return (
        <>
            <nav className="navbar navbar-expand-lg nav-section shadow-sm">
                <div className="container-fluid d-flex justify-content-between align-items-center">

                    {/* Logo + Brand Text (responsive) */}
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img src={Logo} alt="Logo" className="logo-img me-2" />
                        <span className="brand-text d-none d-lg-inline">
                            T<span className="highlight">4</span>TEQ Software Solutions
                        </span>
                    </Link>

                    {/* Hamburger toggle */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarButtons"
                        aria-controls="navbarButtons"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible buttons */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarButtons">
                        <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">
                            <Link to="/register" className="text-center w-100 w-lg-auto">
                                <button className="btn btn-signup w-100 w-lg-auto">Signup</button>
                            </Link>
                            <Link to="/profile" className="text-center w-100 w-lg-auto">
                                <button className="btn btn-profile w-100 w-lg-auto">Admin</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Task Box Section */}
            <div className="container py-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Link to="/login" className="text-decoration-none">
                            <div className="task-box">Task Assignment</div>
                        </Link>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Link to="/elogin" className="text-decoration-none">
                            <div className="task-box">Skill Report</div>
                        </Link>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Link to="" className="text-decoration-none">
                            <div className="task-box">Coming Soon...</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default T4teq;
