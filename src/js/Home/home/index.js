import $ from 'jquery'
import React from 'react'
import Swiper from 'swiper'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {APIURL, IMG} from '../api'

import '../../../less/swiper.less'
import '../../../less/less/bootstrap.less'

//Slider
class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageData: []
        }
    }

    InitSwiper() {
        const mySwiper = new Swiper('.swiper-container', {
            observer: true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable :true
            },
        })
    }

    loadIndexSlider() {
        var _this = this;
        $.ajax({
            type: "get",
            url: APIURL + "mainGetImg",
            dataType: "JSON",
            success: function (data) {
                _this.setState({
                    imageData: data.data
                })
            }
        })
    }

    componentDidMount() {
        this.InitSwiper();
        this.loadIndexSlider();

    }

    render() {
        let _imagedata = this.state.imageData;
        let ImageData = _imagedata.map((item, index) => (
            <div className="swiper-slide" key={index}>
                <img src={IMG + "Public/Upload/Pictures/" + item.file}/>
                <div className="SliderIntro">{item.desc}</div>
            </div>
        ))
        return (
            <div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {ImageData}
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div>
            </div>
        );
    }
}

//IndexAbout
class IndexAbout extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const aboutData = this.props.aboutData;
        return (
            <div className="indexAboutBox indexBox">
                <div className="aboutTitle">关于我们<span></span></div>
                <div className="aboutContent">
                    {aboutData.text}
                </div>
                <div className="aboutBtnBox">
                    <div className="aboutBtn"><Link to={{
                        pathname: "/about"
                    }}>了解详情</Link></div>
                </div>
            </div>
        )
    }
}

//IndexNews
class IndexNews extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let newslist = this.props.newslist;
        let IndexNewsList = newslist.map((item, index) => (
            <li className="indexN_CLi" key={index}>
                <Link to={{
                    pathname: "/newsArticle/详情/" + item.title + "/news/" + item.id,
                    query: {
                        // type:this.state.type,
                        id: item.id,
                        pName: item.title,
                        name: "详情",
                        type: "news"
                    },
                    state: {
                        // type:this.state.type,
                        id: item.id,
                        pName: item.title,
                        name: "详情",
                        type: "news"
                    }
                }}>
                    <div className="indexN_CLiImg"><img src={IMG + "Public/Upload/Article/" + item.cover} alt={item.title} title="图片尺寸:362x252"/></div>
                    <div className="indexN_CLiTitleBox">
                        <span className="indexN_CLiTitle">{item.title}</span>
                        <div className="indexN_CLiIntro">{item.descr}</div>
                    </div>
                </Link>
            </li>
        ))
        return (
            <div className="indexN_CBox indexBox">
                <div className="indexN_CTop">
                    <div className="indexN_CTitleBox">
                        <div className="indexN_CTitle">新闻动态</div>
                        <div className="indexMoreN_C"><Link to={{
                            pathname: "/news"
                        }}>更多>></Link></div>
                    </div>
                    <div className="indexN_CIntro">
                        如果你无法简洁的表达你的想法，那只说明你还不够了解它。
                    </div>
                </div>
                <div className="indexN_CList">
                    <ul>
                        {IndexNewsList}
                    </ul>
                </div>
            </div>
        )
    }
}


//IndexCase
class IndexCase extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let _caseData = this.props.caselist;
        let CaseData = _caseData.map((item, index) => (
            <li className="indexN_CLi CaseHover" key={index}>
                <div className="indexN_CLiImg"><img src={IMG + "Public/Upload/Article/" + item.cover} alt="" title="362X252"/></div>
                <div className="indexN_CLiTitleBox">
                    <span className="indexN_CLiTitle">{item.title}</span>
                    <div className="indexN_CLiIntro">{item.descr}</div>
                </div>
                <div className="indexN_CLiWrapper">
                    <div className="indexN_CWrapperBox">
                        <div className="IndexN_CLiCaseTitle">{item.title}</div>
                        <div className="indexN_CLiCaseIntro">{item.descr}</div>
                        <div className="indexN_CLiCaseMore"><Link to={{
                            pathname: "/product/list/article/" + item.id,
                            query: {
                                id: item.id,
                                listId: item.id,
                                type: "product"
                            },
                            search: "id=" + item.id + "&type=product",
                            state: {
                                id: item.id,
                                listId: item.id,
                                type: "product"
                            }
                        }}>READMORE</Link></div>
                    </div>
                </div>
            </li>
        ))
        return (
            <div className="indexN_CBox indexBox">
                <div className="indexN_CTop">
                    <div className="indexN_CTitleBox">
                        <div className="indexN_CTitle">主打产品</div>
                        <div className="indexMoreN_C"><Link to={{
                            pathname: "/product/list",
                            query: {
                                listId: "4"
                            },
                            state: {
                                listId: "4"
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
                    </ul>
                </div>
            </div>
        )
    }
}

//IndexEntrance
class IndexEntrance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: []
        }
    }

    loadEntrance() {
        var _this = this;
        $.ajax({
            type: "get",
            url: APIURL + "mainGetConvenient",
            dataType: "JSON",
            success: function (data) {
                console.log(data)
                _this.setState({
                    listData: data.data
                })
            }
        })
    }

    componentDidMount() {
        this.loadEntrance()
    }

    render() {
        let _listdata = this.state.listData;
        let ListData = _listdata.map((item, index) => (
            <li className="indexN_CLi EntranceLi" key={index}>
                <a href={item.value} target="_blank">
                    {/*<i className={item.icon}></i>*/}

                    <div className="indexN_CLiImg EntranceLiImg"><img className="EntranceImg" src={IMG + "Public/Upload/Icon/" + item.file} /></div>
                    <div className="indexEntranceTitle">{item.key}</div>
                </a>
            </li>
        ))
        return (
            <div className="indexN_CBox indexBox">
                <div className="indexN_CTop">
                    <div className="indexN_CTitleBox">
                        <div className="indexN_CTitle">快捷入口</div>
                    </div>
                    <div className="indexN_CIntro">
                        如果你无法简洁的表达你的想法，那只说明你还不够了解它。-- 阿尔伯特·爱因斯坦
                    </div>
                </div>
                <div className="indexN_CList">
                    <ul>
                        {ListData}
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