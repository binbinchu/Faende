import $ from 'jquery'
import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {APIURL,IMG} from '../api'
//Banner
class Banner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            aboutData:[]
        }
    }
    loadAbout(){
        let _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"getAboutUs",
            dataType:"JSON",
            success:function(data){
                _this.setState({
                    aboutData: data.data
                });
            }
        })
    }
    componentDidMount(){
        this.loadAbout();
    }
    render(){
        const aboutData = this.state.aboutData;
        return(
            <div className="aboutBanner">
                <div className="aboutBannerTitle BannerLeft">关于我们</div>
                <div className="aboutBannerIntro BannerLeft">
                    {aboutData.text}
                </div>
                {/*<div className="aboutBannerBtn">Explore</div>*/}
            </div>
        )
    }
}
class AboutMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listData:[]
        }
    }
    loadAboutList(){
        var _this = this;

        $.ajax({
            type:"get",
            url:APIURL+"aboutUsmain",
            dataType:"JSON",
            success:function(data){
                for(let i in data.data){
                    if(data.data[i].type == "introduce"){
                        data.data[i].name = "公司介绍"
                    }else if(data.data[i].type == "culture"){
                        data.data[i].name = "公司文化"
                    }else if(data.data[i].type == "honor"){
                        data.data[i].name = "资质荣耀"
                    }else if(data.data[i].type == "contact"){
                        data.data[i].name = "联系我们"
                    }
                }
                _this.setState({
                    listData:data.data
                })
            }
        })
    }
    componentDidMount(){
        this.loadAboutList();
    }
    render(){
        let _listdata = this.state.listData;

        let ListData = _listdata.map((item,index) =>(
            <li className="aboutMenuLi" key={index}>
                <Link to={{
                    pathname:"/aboutArticle/"+item.type,
                    query:{type:item.type},
                    state:{type:item.type}
                }}>
                    <div className="aboutMenuLiImg"><img src={IMG+"Public/Upload/AboutUs/"+item.img} /></div>
                    <div className="aboutMenuTitle">{item.name}</div>
                </Link>
            </li>
        ))
        return(
            <div className="aboutMenu">
                <div className="aboutMenuBox">
                    <ul>
                        {ListData}
                    </ul>
                </div>
            </div>
        )
    }
}
export default {
    Banner,
    AboutMenu
}