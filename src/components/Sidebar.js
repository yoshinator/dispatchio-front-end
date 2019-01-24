import React from 'react'
import { Link } from 'react-router-dom'
import '../css/sidebar.css'


export default function Sidebar({children}) {
  return <div className="container-fluid h-100  outer-right-sidebar">
      <div className="row h-100">
      <aside className="col-12 col-md-2 p-0 bg-dark my-side-bar">
          <nav className="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start">
            <div className="collapse navbar-collapse">
              <ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                <li className="nav-item">
                  <Link className="nav-link pl-0" to="/jobs">
                    Jobs
                  </Link>
                  <Link className="nav-link pl-0" to="/teams">
                    Teams
                  </Link>
                  <Link className="nav-link pl-0" to="/teammembers">
                    Team Members
                  </Link>
                  <Link className="nav-link pl-0" to="/customers">
                    Customers
                  </Link>
                </li>
                ..
              </ul>
            </div>
          </nav>
        </aside>
        {children}
      </div>
    </div>;
}
