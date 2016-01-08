const React = require('react');
const { render } = require('react-dom');

import { Router, Route, Link, browserHistory } from 'react-router';
import SwipePane from './component/SwipePane';
require('./main.scss');
// material-ui
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const AppBar = require('material-ui/lib/app-bar');
const injectTapEventPlugin = require('react-tap-event-plugin');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const initialState = {
    muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    currentIndex : 0,
    isMobile : false
}

class MainBody extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    
    getChildContext() {
        return {
          muiTheme: this.state.muiTheme,
        };
    }

    componentDidMount(){
        $(window).resize(() => {
            if($(window).width() < 450){
                this.setState({ isMobile: true});
            }
            else{
                this.setState({ isMobile: false});
            }
            console.log(this.state.isMobile);
        });
    }

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500,
        });
        this.setState({muiTheme: newMuiTheme});
    }

    renderSwipePane(content, index){
    	return(
    		<SwipePane key={index} 
    			paneContent={content.content} 
    			paneIndex={index} />
    	);
    }

    renderSingleSwipePane(content){
        console.log("currentIndex: " + this.state.currentIndex);        
        return(
            <SwipePane 
                paneContent={this.state.currentIndex} 
                paneIndex={this.state.currentIndex} 
                updateIndex = {this.updateIndex.bind(this)} />
        );
    }

    updateIndex(indexUpdate){
        let index = this.state.currentIndex + indexUpdate;
        this.setState({currentIndex: index});
    }

    render() {
    	//const contents = this.state.contents;
        const fullHeight = {height: "100%" };
        const displayNone = {display: 'none'};
        var isMobile = this.state.isMobile;
        var appBarStyle = {};//{ isMobile? {display:"none"} : {display:"none"}};
        //<AppBar style={ isMobile? {display: 'none'} : {display: 'flex'}} title="Swipo" iconClassNameRight="muidocs-icon-navigation-expand-more" /> 

        return (
            <div style={fullHeight}>
                <AppBar className='header' title="Swipo" iconClassNameRight="muidocs-icon-navigation-expand-more" /> 
            	<div className='swipePanes' style={fullHeight} > 
            		{this.renderSingleSwipePane()}
            	</div>
            </div>
        );
    }
}

MainBody.childContextTypes = {
    muiTheme: React.PropTypes.object,
}

render(<MainBody />, document.getElementById('root'));