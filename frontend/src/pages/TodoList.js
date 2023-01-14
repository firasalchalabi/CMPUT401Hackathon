import React from "react";
import Activity from "../Activity";

class CreateTrip extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h1>To Do:</h1>
                </div>
                <div>
                    <Activity id="1" name="Swim"/>
                    <Activity id="2" name="Fish"/>
                    <Activity id="3" name="Explore"/>
                    <Activity id="4" name="Visit Relatives"/>
                </div>
            </div>
            )
    }
}

export default CreateTrip