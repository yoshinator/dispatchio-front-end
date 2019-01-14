import React from 'react'

export default function Sidebar() {
  return (
    <div class="container-fluid h-100">
      <div class="row h-100">
        <aside class="col-12 col-md-2 p-0 bg-dark">
          <nav class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start">
            <div class="collapse navbar-collapse">
              <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                <li class="nav-item">
                  <a class="nav-link pl-0" href="#">Link</a>
                </li>
                ..
                    </ul>
            </div>
          </nav>
        </aside>
        <main class="col">
          ..
        </main>
      </div>
    </div>

  )
}
