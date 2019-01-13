import React, { Component } from 'react'
import { connect } from "react-redux";


class Job extends Component {

  jsxBuilder = () => {
    if (this.props.jobs){
    return this.props.jobs.map(job => {
      return(
           < div key={job.id} className = "card" >
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  {job.city.toUpperCase()} | {job.customer.name.toUpperCase()}
                  </button>
              </h2>
            </div>

      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div className="card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        </div>
      </div>
      </div >
      )
    })
    }
    else {
      return (
        < div className="card" >
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                No Jobs
              </button>
            </h2>
          </div>
          </div>
      )
    }
  }

  render() {
  return this.jsxBuilder()
  }
}


const mapStateToProps = ({ jobsReducer }) => ({
  jobs: jobsReducer.jobs[0]
})

export default connect(mapStateToProps)(Job);