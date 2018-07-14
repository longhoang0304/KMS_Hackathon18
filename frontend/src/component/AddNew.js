
import React, { Component } from 'react';

import '../App.css';

class AddNew extends Component {
   
    onHandle = (event) => {
        event.preventDefault();
        var work = {
            title: this.refs.txtTitle.value,
            note: this.refs.txtNode.value,
            start_time: this.refs.txtStart.value,
            end_time: this.refs.txtEnd.value
        };
       
        let temp = this.state.works;
        temp.push(work);
        this.setState({ works: temp });
        console.log(this.state.works);
        
    }
    render() {
        const { onHandle } = this.props;
        return (
            <div>
                <form onSubmit= {onHandle} className="App-title" >
                    <table>
                        <tbody>
                            <tr>
                                <td>Title</td>
                                <td><input type="text" ref="txtTitle" /></td>
                            </tr>
                            <tr>
                                <td>Note</td>
                                <td><input type="text" ref="txtNode" /></td>
                            </tr>
                            <tr>
                                <td>Start Time </td>
                                <td><input type="datetime-local" ref="txtStart" /></td>
                            </tr>
                            <tr>
                                <td>End Time </td>
                                <td><input type="datetime-local" ref="txtEnd" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" value="Submit" />&nbsp;
          <input type="reset" value="Reset" />
                </form>
            </div>

        );
    }

}
export default AddNew;