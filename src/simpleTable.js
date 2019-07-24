import React from "react";
import { getColumns, getValues } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class SimpleTable extends React.Component {
	constructor() {
		super();
		this.state = {
		  cols: getColumns(),
		  search: '',
		  data: getValues().map(r => {
			  return {
				  ...r,
				  topicsByAppList: "",
			  }
		  })
		}; 
		this.handleFilter = this.handleFilter.bind(this);
	}
	
	handleFilter = (e) => {
        console.log(e.target.value);
        this.setState({
          filtered: e.target.value
        })
    };
 
	render() {
		const columns = this.state.cols;
		let values = this.state.data;

		//console.log(values);
		if (this.state.search) {
			values = values.filter(row => {
				return row.applicationId.indexOf(this.state.search) !== -1 || 
				row.applicationName.indexOf(this.state.search) !== -1 || row.applicationDesc.indexOf(this.state.search) !== -1
			})
		}
		return (
		  <div>
				<div align="center"
					style={{
							height: '600px',
							width: '100%', margin: '10px'
				}}>
				<div align="left" className="form-group">
                  	<input  
							value={this.state.search}
							className="form-control"
							onChange={e => this.setState({search: e.target.value})}
					/>
                </div>
				<br/>
				<br/>
				<ReactTable
				  data={values}
				  filtered={this.state.filtered}
				  columns={columns}
				  defaultPageSize={10}
				  className="-striped -highlight"
				/>
				</div>
		  </div>
		);
	}
}

export default SimpleTable;