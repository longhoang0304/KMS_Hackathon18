import React, { Component } from 'react';
import '../App.css';
import Work from './Work';
class NavBar extends Component {
    
    render() {
        const {item} = this.props;
        var listItem = {item}.map((item2, count)=>{
             <Work item1={item2} index={count} />;
        });
        return (
            <div>
                <table border="1" className="list">
                    <thead>
                        <tr>
                        <th>STT</th>
                        <th>TITLE</th>
                        <th>NOTE</th>
                        <th>START</th>
                        <th>END</th>
                        </tr>
                    </thead>
                </table>
            </div>);
    }

}
export default NavBar;