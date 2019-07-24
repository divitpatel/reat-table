import React from "react";
import { getColumns, getValues, getSubColumns, getChildValues } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const cust_columns = [
    ...getColumns(),
    {
        Header: 'Action',
        accessor: 'id',
        show: true,
        className: 'centered',
        Cell: (props) => (<button type="button" className="btn btn-primary btn-sm" onClick={() => { console.log('clicked value', props) }}>Subscribe</button>)
    }
];

class MasterDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            cols: cust_columns,
            subCols: getSubColumns(),
            data: getValues().map(r => {
                return {
                    ...r,
                    topicsByAppList: ""
                }
            })
        };
    }

    handleFilter = (e) => {
        console.log(e.target.value);
        this.setState({
            filtered: e.target.value
        })
    };
    render() {
        const columns = this.state.cols;
        console.log(this.state.subCols)
        console.log(columns, 'column')
        let values = this.state.data;
        let filteredData = getValues()
        console.log(filteredData)
        let childData = filteredData.map(r => {
            return {
                ...r,
                topicsByAppListArr: r.topicsByAppList,
                topicsByAppList: ""
            }
        });
        let searchStr = this.state.search
        if (searchStr) {
            searchStr = searchStr.toLowerCase();
			/*values = values.filter(row => {
				//console.log(row);
				return row.applicationId.indexOf(searchStr) !== -1 || 
				row.applicationName.indexOf(searchStr) !== -1 || row.applicationDesc.indexOf(searchStr) !== -1
			})*/
            let nestedFound = false;
            childData = childData.map(a => {
                a.topicsByAppListArr = a.topicsByAppListArr.filter(row => {
                    for (let key in row) {
                        if (!!key && row[key]) {
                            nestedFound = row[key].toLowerCase().indexOf(searchStr) !== -1;
                        }
                        if (!!nestedFound) {
                            break;
                        }
                    }
                    return nestedFound;
                    // return (row.id.indexOf(searchStr) !== -1 || row.dataType.indexOf(searchStr) !== -1 )
                })
                return a;
            }).filter(row => {
                //console.log(row);
                let con1 = (row.applicationId.toLowerCase().indexOf(searchStr) !== -1 || row.applicationName.toLowerCase().indexOf(searchStr) !== -1 || row.applicationDesc.toLowerCase.indexOf(searchStr) !== -1)
                let con2 = row.topicsByAppListArr.length;
                if (con1 > 0) {
                    return true;
                } else if (con2 > 0) {
                    return true;
                } else {
                    return false;
                }
            })

        }
        return (
            <div>
                <div align="left" className="form-group">
                    <input
                        value={this.state.search}
                        className="form-control"
                        onChange={e => this.setState({ search: e.target.value })}
                    />
                </div>

                <br />
                <br />
                <ReactTable
                    data={childData}
                    columns={columns}
                    filterable
                    defaultPageSize={10}
                    SubComponent={row => {
                        //console.log(row.index);
                        return (
                            <div  style={{
                                height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                              }} key={row.index}>
                                <br />
                                <ReactTable
                                    data={getChildValues(childData, row.index)}
                                    columns={this.state.subCols}
                                    defaultPageSize={getChildValues(childData, row.index).length}
                                    showPagination={false}
                                />
                            </div>
                        );
                    }}
                />
                <br />
            </div>
        );
    }
}


export default MasterDetail;
