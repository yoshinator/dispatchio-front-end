import React from 'react'
import { Link } from 'react-router-dom'


export default function Sidebar({children}) {
  return <div>
      <div >
      <aside >
          <nav >
            <div >
              <ul >
                <li >
                  <Link to="/jobs">
                    Jobs
                  </Link>
                  <Link  to="/teams">
                    Teams
                  </Link>
                  <Link  to="/teammembers">
                    Team Members
                  </Link>
                  <Link  to="/customers">
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
