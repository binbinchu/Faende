import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {APIURL,IMG} from '../api'
//NewsMenu
class NewsMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuList:[],
            type:"news",
        }
    }
    loadNewsType(){
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"newsShowList",
            dataType:"JSON",
            data:{
                type:this.state.type
            },
            success:function(data){
                _this.setState({
                    menuList:data.data
                })
            }
        })
    }
    componentDidMount(){
        this.loadNewsType()
    }
    render(){
        const _menuList = this.state.menuList;
        const MenuList = _menuList.map((item,index) =>(
            <li className="newsMenuLi" key={index}>
                <Link to={{
                    pathname:"/newsList/articleList/"+item.name+"/"+item.id,
                    query:{
                        listId:item.id,
                        type:"news",
                        name:item.name
                    },
                    state:{
                        listId:item.id,
                        type:"news",
                        name:item.name
                    }
                }}>
                    <div className="newsMenuImg"><img src={IMG+"Public/Upload/NewsCover/"+item.img} /></div>
                    <div className="newsMenuTitleBox">
                        <div className="n_M_1"><div className="newsMenuTitle">{item.name}</div></div>
                        <div className="n_M_2">
                            <div className="newsMenuIntro">
                                {item.descr}
                            </div>
                        </div>
                    </div>
                </Link>
            </li>
        ))
        return(
            <div className="newsMenu">
                <div className="newsMenuTop_Head"></div>
                <div className="newsMenuBox indexBox">
                    <div className="newsMenuList">
                        <ul>
                            {MenuList}
                            {/*<li className="newsMenuLi">*/}
                                {/*<Link to="/newsList">*/}
                                    {/*<div className="newsMenuImg"><img src={news1} /></div>*/}
                                    {/*<div className="newsMenuTitleBox">*/}
                                        {/*<div className="n_M_1"><div className="newsMenuTitle">公司新闻</div></div>*/}
                                        {/*<div className="n_M_2">*/}
                                            {/*<div className="newsMenuIntro">*/}
                                                {/*公司大小事件*/}
                                                {/*即时信息发布*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</Link>*/}
                            {/*</li>*/}
                            {/*<li className="newsMenuLi">*/}
                                {/*<Link to="/newsList">*/}
                                    {/*<div className="newMenuImg"><img src={news2} /></div>*/}
                                    {/*<div className="newsMenuTitleBox">*/}
                                        {/*<div className="n_M_1"><div className="newsMenuTitle">行业新闻</div></div>*/}
                                        {/*<div className="n_M_2">*/}
                                            {/*<div className="newsMenuIntro">*/}
                                                {/*行业形势变化*/}
                                                {/*即时信息发布*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</Link>*/}
                            {/*</li>*/}
                            {/*<li className="newsMenuLi">*/}
                                {/*<Link to="/newsList">*/}
                                    {/*<div className="newMenuImg"><img src={news3} /></div>*/}
                                    {/*<div className="newsMenuTitleBox">*/}
                                        {/*<div className="n_M_1"><div className="newsMenuTitle">技术动态</div></div>*/}
                                        {/*<div className="n_M_2">*/}
                                            {/*<div className="newsMenuIntro">*/}
                                                {/*技术迭代更新*/}
                                                {/*即时信息发布*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</Link>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default {
    NewsMenu
}