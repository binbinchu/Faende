import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {NewsMenu} from './home/news';

//组件


//样式
import '../../less/NewsBody.less'

export default class NewsBody extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        // console.log(this.props.location.state.url);
        // console.log(this.props.location.state.menulist);
    }
    render(){
        return(
            <div className="allwidth">
                <div className="NewsMenu">
                    <NewsMenu />
                </div>
            </div>
        )
    }
}