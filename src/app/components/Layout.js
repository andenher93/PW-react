import React from "react";
import Navigation from "./partials/Navigation";

export default class Home extends React.Component {
    render(){
        var loadNavigation;
        if(this.props.location.pathname.indexOf('projekter') > -1){
            loadNavigation = <Navigation />;
        }
        return(
            <div>
                { loadNavigation }
                { this.props.children }
            </div>
        )
    }
}