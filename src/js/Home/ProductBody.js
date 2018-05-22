import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {ProductLeftMenu,ProductRightMenu} from './home/product';

//组件


//样式
 import '../../less/ProductBody.less'


export default class ProductBody extends React.Component{
     constructor(props){
         super(props);
     }
    render(){
         let showid = this.props.location.search.split("=")[1] || this.props.location.state.listId
        return(
            <div className="allwidth">
                <div className="ProductWrapper">
                    <div className="ProductTop_Head"></div>
                    <div className="ProductBox indexBox_2">
                        <div className="ProductNavigationBox allwidth">
                            <div className="ProductNavigation">
                                <Link to="/">首页</Link>>产品中心
                            </div>
                        </div>
                        <div className="ProductLeftBox">
                            <ProductLeftMenu showid={showid}/>
                        </div>
                        <div className="ProductRightBox">
                            <ProductRightMenu/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}