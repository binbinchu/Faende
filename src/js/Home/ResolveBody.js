import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {ResolveLeftMenu,ResolveRightMenu} from './home/resolve';

//组件


//样式
import '../../less/ProductBody.less'


export default class ResolveBody extends React.Component{
    render(){
        let showid = this.props.location.search.split("=")[1] || this.props.location.state.listId
        return(
            <div className="allwidth">
                <div className="ProductWrapper">
                    <div className="ProductTop_Head"></div>
                    <div className="ProductBox indexBox_2">
                        <div className="ProductNavigationBox allwidth">
                            <div className="ProductNavigation">
                                <Link to="/">首页</Link>>解决方案
                            </div>
                        </div>
                        <div className="ProductLeftBox">
                            <ResolveLeftMenu showid={showid}/>
                        </div>
                        <div className="ProductRightBox">
                            <ResolveRightMenu/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}