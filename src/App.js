import React from 'react';

import './App.css';
import Switch from './components/ToggleSwitch';
import SimpleTable from './simpleTable'
import MasterDetail from './masterDetail'


class App  extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            active: true,
			enabled: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
		console.log(this.state.active);
        this.setState({
            active: !this.state.active
        });
    }

    render() {
		return (
            <div>
				<h1 style={{
                        color:'#cd040b', margin: '25px'
                    }}> Grid POC</h1>
				<hr/>
				<div align="left">
					<Switch theme="default" className="d-flex"  onStateChanged={this.handleClick} />
				</div>
				<br/>
				<br/>

                 {this.state.active && <SimpleTable />}

				 {!this.state.active && <MasterDetail />}


            </div>
        )
    }
}

export default App;