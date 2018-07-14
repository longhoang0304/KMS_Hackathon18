import React, { Component } from 'react';

class Work extends Component{
    render(){
        const {item1} = this.props;
        const {index} = this.props;
        return ( <div>
            <table border="1" className="list">
                    <tr>
                    <th>{index}</th>
                    <th>{{item1}.title}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                
            </table>
        </div>);
    }

}

export default Work;