import $ from 'jquery'
import React from 'react'
import Swiper from 'swiper'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {APIURL,IMG} from '../api'

import '../../../less/swiper.less'
import '../../../less/less/bootstrap.less'

//Slider
class Slider extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            imageData:[]
        }
    }
    InitSwiper(){
        const mySwiper = new Swiper('.swiper-container', {
            observer: true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        })
    }
    loadIndexSlider(){
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"mainGetImg",
            dataType:"JSON",
            success:function(data){
                _this.setState({
                    imageData:data.data
                })
            }
        })
    }
    componentDidMount(){
        this.InitSwiper();
        this.loadIndexSlider();

    }
    render() {
        let _imagedata = this.state.imageData;
        let ImageData = _imagedata.map((item,index) =>(
            <div className="swiper-slide" key={index}>
                <img src={IMG+"Public/Upload/Pictures/"+item.file} />
                <div className="SliderIntro">{item.desc}</div>
            </div>
        ))
        return (
            <div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {ImageData}
                        {/*<div className="swiper-slide"><img src={Silder} /></div>*/}
                        {/*<div className="swiper-slide"></div>*/}
                        {/*<div className="swiper-slide"></div>*/}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        );
    }
}
//IndexAbout
class IndexAbout extends React.Component {
    render(){
        return(
            <div className="indexAboutBox indexBox">
                <div className="aboutTitle">关于我们<span></span></div>
                <div className="aboutContent">
                    济南法恩德信息技术有限公司，中国第一家枪支定位设备提供商。公司奉行积淀孕育创新、智慧创造价值”的价值理念，坚持以人为本、凝聚智慧、
                    激发潜能、提升技能、促进发展的管理理念。 在公司领导的领导下，法恩德已形成简单可依赖的核心文化，深深地植根于法恩德。这是一个充满
                    朝气、求实坦诚的公司，以科技改变生活，推动人类的文明与进步，促进中国经济的发展为己任，正朝着更为远大的目标而迈进。
                </div>
                <div className="aboutBtnBox">
                    <div className="aboutBtn"><Link to={{
                        pathname:"/about"
                    }}>了解详情</Link></div>
                </div>
            </div>
        )
    }
}

//IndexNews
class IndexNews extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let newslist = this.props.newslist;
        let IndexNewsList = newslist.map((item,index) =>(
            <li className="indexN_CLi" key={index}>
                <Link to={{
                    pathname:"/newsArticle/详情/"+item.title+"/news/"+item.id,
                    query:{
                        // type:this.state.type,
                        id:item.id,
                        pName:item.title,
                        name:"详情",
                        type:"news"
                    },
                    state:{
                        // type:this.state.type,
                        id:item.id,
                        pName:item.title,
                        name:"详情",
                        type:"news"
                    }
                }}>
                    <div className="indexN_CLiImg"><img src={IMG+"Public/Upload/Article/"+item.cover} /></div>
                    <div className="indexN_CLiTitleBox">
                        <span className="indexN_CLiTitle">{item.title}</span>
                        <div className="indexN_CLiIntro">{item.descr}</div>
                    </div>
                </Link>
            </li>
        ))
        return(
            <div className="indexN_CBox indexBox">
                <div className="indexN_CTop">
                    <div className="indexN_CTitleBox">
                        <div className="indexN_CTitle">新闻动态</div>
                        <div className="indexMoreN_C"><Link to={{
                            pathname:"/news"
                        }}>更多>></Link></div>
                    </div>
                    <div className="indexN_CIntro">
                        如果你无法简洁的表达你的想法，那只说明你还不够了解它。
                    </div>
                </div>
                <div className="indexN_CList">
                    <ul>
                        {IndexNewsList}
                        {/*<li className="indexN_CLi">*/}
                            {/*<div className="indexN_CLiImg"><img src={newsImg} /></div>*/}
                            {/*<div className="indexN_CLiTitleBox">*/}
                                {/*<span className="indexN_CLiTitle">环境监控</span>*/}
                                {/*<div className="indexN_CLiIntro">*/}
                                    {/*法恩德信息技术有限公司位于*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="indexN_CLi">*/}
                            {/*<div className="indexN_CLiImg"><img /></div>*/}
                            {/*<div className="indexN_CLiTitleBox">*/}
                                {/*<span className="indexN_CLiTitle">环境监控</span>*/}
                                {/*<div className="indexN_CLiIntro">*/}
                                    {/*法恩德信息技术有限公司位于*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="indexN_CLi">*/}
                            {/*<div className="indexN_CLiImg"><img /></div>*/}
                            {/*<div className="indexN_CLiTitleBox">*/}
                                {/*<span className="indexN_CLiTitle">环境监控</span>*/}
                                {/*<div className="indexN_CLiIntro">*/}
                                    {/*法恩德信息技术有限公司位于*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}


//IndexCase
class IndexCase extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let _caseData = this.props.caselist;
        let CaseData = _caseData.map((item,index) =>(
            <li className="indexN_CLi CaseHover" key={index}>
                <div className="indexN_CLiImg"><img src={IMG+"Public/Upload/Article/"+item.cover} /></div>
                <div className="indexN_CLiWrapper">
                    <div className="indexN_CWrapperBox">
                        <div className="IndexN_CLiCaseTitle">{item.title}</div>
                        <div className="indexN_CLiCaseIntro">{item.descr}</div>
                        <div className="indexN_CLiCaseMore"><Link to={{
                            pathname:"/product/list/article/"+item.id,
                            query:{
                                id:item.id,
                                listId:item.id,
                                type:"product"
                            },
                            search:"id="+item.id+"&type=product",
                            state:{
                                id:item.id,
                                listId:item.id,
                                type:"product"
                            }
                        }}>READMORE</Link></div>
                    </div>
                </div>
            </li>
        ))
        return(
            <div className="indexN_CBox indexBox">
                <div className="indexN_CTop">
                    <div className="indexN_CTitleBox">
                        <div className="indexN_CTitle">主打产品</div>
                        <div className="indexMoreN_C"><Link to={{
                            pathname:"/product/list",
                            query:{
                                listId:"4"
                            },
                            state:{
                                listId:"4"
                            }
                        }}>更多>></Link></div>
                    </div>
                    <div className="indexN_CIntro">
                        如果你无法简洁的表达你的想法，那只说明你还不够了解它。-- 阿尔伯特·爱因斯坦
                    </div>
                </div>
                <div className="indexN_CList">
                    <ul>
                        {CaseData}
                        {/*<li className="indexN_CLi CaseHover">*/}
                            {/*<div className="indexN_CLiImg"><img src={require('../../../images/product/product.png')} /></div>*/}
                            {/*<div className="indexN_CLiWrapper">*/}
                                {/*<div className="indexN_CWrapperBox">*/}
                                    {/*<div className="IndexN_CLiCaseTitle">车辆安全监控管理系统</div>*/}
                                    {/*<div className="indexN_CLiCaseIntro">实时记录车辆运行轨迹、方向、安全管理、全面</div>*/}
                                    {/*<div className="indexN_CLiCaseMore">READMORE</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="indexN_CLi CaseHover">*/}
                            {/*<div className="indexN_CLiImg"><img /></div>*/}
                            {/*<div className="indexN_CLiWrapper">*/}
                                {/*<div className="indexN_CWrapperBox">*/}
                                    {/*<div className="IndexN_CLiCaseTitle">车辆安全监控管理系统</div>*/}
                                    {/*<div className="indexN_CLiCaseIntro">实时记录车辆运行轨迹、方向、安全管理、全面</div>*/}
                                    {/*<div className="indexN_CLiCaseMore">READMORE</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="indexN_CLi CaseHover">*/}
                            {/*<div className="indexN_CLiImg"><img /></div>*/}
                            {/*<div className="indexN_CLiWrapper">*/}
                                {/*<div className="indexN_CWrapperBox">*/}
                                    {/*<div className="IndexN_CLiCaseTitle">车辆安全监控管理系统</div>*/}
                                    {/*<div className="indexN_CLiCaseIntro">实时记录车辆运行轨迹、方向、安全管理、全面</div>*/}
                                    {/*<div className="indexN_CLiCaseMore">READMORE</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}

//IndexEntrance
class IndexEntrance extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listData:[]
        }
    }
    loadEntrance(){
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"mainGetConvenient",
            dataType:"JSON",
            success:function(data){
                _this.setState({
                    listData:data.data
                })
            }
        })
    }
    componentDidMount(){
        this.loadEntrance()
    }
    render(){
        let _listdata = this.state.listData;
        let ListData = _listdata.map((item,index) =>(
            <li className="indexN_CLi EntranceLi" key={index}>
                <a href={item.value} target="_blank">
                    <div className="indexN_CLiImg EntranceLiImg"><i className={item.icon}></i></div>
                    <div className="indexEntranceTitle">{item.key}</div>
                </a>
            </li>
        ))
        return(
            <div className="indexN_CBox indexBox">
                <div className="indexN_CTop">
                    <div className="indexN_CTitleBox">
                        <div className="indexN_CTitle">便捷入口</div>
                    </div>
                    <div className="indexN_CIntro">
                        如果你无法简洁的表达你的想法，那只说明你还不够了解它。-- 阿尔伯特·爱因斯坦
                    </div>
                </div>
                <div className="indexN_CList">
                    <ul>
                        {ListData}
                        {/*<li className="indexN_CLi EntranceLi">*/}
                            {/*<div className="indexN_CLiImg EntranceLiImg"><img /></div>*/}
                            {/*<div className="indexEntranceTitle">枪支管控</div>*/}
                        {/*</li>*/}
                        {/*<li className="indexN_CLi EntranceLi">*/}
                            {/*<div className="indexN_CLiImg EntranceLiImg"><img /></div>*/}
                            {/*<div className="indexEntranceTitle">车辆定位</div>*/}
                        {/*</li>*/}
                        {/*<li className="indexN_CLi EntranceLi">*/}
                            {/*<div className="indexN_CLiImg EntranceLiImg"><img /></div>*/}
                            {/*<div className="indexEntranceTitle">环境监测</div>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}

export default {
    Slider,
    IndexAbout,
    IndexNews,
    IndexCase,
    IndexEntrance
}