import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {APIURL,IMG} from '../api'

class ServerMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listData:[]
        }
        // console.log(this.props.urlParam)
    }
    loadServerList(){
        let _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"Customermain",
            dataType:"JSON",
            success:function(data){
                _this.setState({
                    listData:data.data
                })
            }
        })
    }
    componentDidMount(){
        this.loadServerList();
    }
    render(){
        let _listdata = this.state.listData;
        let ListData = _listdata.map((item,index) =>(
            <li className="serverMenuListLi" key={index} data-type={item.type} data-name={item.descr}>
                <Link to={{
                    pathname:"/serverArticle/"+item.type,
                    query:{
                        type:item.type,
                        name:item.descr
                    },
                    state:{
                        type:item.type,
                        name:item.descr
                    },
                }}>
                    <div className="serverMenuLiImg"><img src={IMG+"Public/Upload/Customer/"+item.img} /></div>
                    <div className="serverMenuLiIntro">
                        {item.descr}
                    </div>
                </Link>
            </li>
        ));
        return(
            <div className="serverMenu">
                <div className="serverMenuTitle">
                    客户服务
                </div>
                <div className="serverMenuList">
                    <ul>
                        {ListData}
                    </ul>
                </div>
            </div>
        )
    }
}
export default ServerMenu