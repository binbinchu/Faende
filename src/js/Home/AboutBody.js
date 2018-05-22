import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {Banner,AboutMenu} from './home/about';

//组件


//样式
import '../../less/AboutBody.less'

export default class AboutBody extends React.Component{
    render(){
        return(
            <div className="allwidth">
                <div className="Banner">
                    <Banner/>
                </div>
                <div className="AboutMenu">
                    <AboutMenu/>
                </div>
            </div>
        )
    }
}