import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'

//组件
import PartnerMenu from './home/partner'
//样式
import '../../less/ServerBody.less'


export default class PartnerBody extends React.Component{
    render(){
        return(
            <div className="allwidth">
                <div className="ServerWrapper">
                    <div className="newsMenuTop_Head"></div>
                    <div className="ProductNavigationBox indexBox_2">
                        <div className="ProductNavigation">
                            首页>战略合作
                        </div>
                        <div className="serverMenuList">
                            <PartnerMenu/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}