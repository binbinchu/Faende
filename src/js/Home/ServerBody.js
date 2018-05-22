import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'

//组件
import ServerMenu from './home/server'
//样式
import '../../less/ServerBody.less'


export default class ServerBody extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            urlParam:this.props
        }
    }
    render(){
        return(
            <div className="allwidth">
                <div className="ServerWrapper">
                    <div className="newsMenuTop_Head"></div>
                    <div className="ProductNavigationBox indexBox_2">
                        <div className="ProductNavigation">
                            <Link to="/">首页</Link>>客户服务
                        </div>
                        <div className="serverMenuList">
                            <ServerMenu urlParam={this.state.urlParam}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}