import $ from 'jquery'
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {APIURL,IMG} from '../api'

import '../../../less/ArticleCon.less'
import '../../../less/newsArticle.less'


export default class NewsArticle extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.location.state || this.props.match.params.type) {
            this.state = {
                type:this.props.match.params.type || this.props.location.state.type || this.props.location.state.url.substring(18),
                article: [],
                FooterData:[],
                userName:"",
                mail:"",
                title:"",
                content:"",
                addtime:JSON.stringify(new Date())

            }
        } else {
            let type = window.location.search
        }
    }

    componentWillReceiveProps(nextProps) {
        let nextPropsType = nextProps.match.params.type ||  nextProps.location.state.type || nextProps.location.state.url.substring(18);
        let oldPropsType = this.props.match.params.type || this.props.location.state.type || this.props.location.state.url.substring(18);
        let nextPropsName = nextProps.match.params.type || nextProps.location.state.name;
        let oldPropsName = this.props.match.params.type || this.props.location.state.name;

        if (nextPropsType != oldPropsType) {
            this.setState({
                type: nextPropsType,
                name:nextPropsName
            });
            if(nextPropsType == ""){
                this.loadArticle("promise");
            }else{
                console.log(nextPropsType)
                if(nextPropsType != "意见建议"){
                    this.loadArticle(nextPropsType);
                }

            }
        }
    }
    loadArticle(type) {
        let _this = this;
        if(type == "售前服务"){
            type = "preSale"
        }else if(type == "售后服务"){
            type = "afterSale"
        }else if(type == "服务承诺"){
            type = "promise"
        }
        console.log(type)
        $.ajax({
            type: "get",
            url: APIURL+"CustomerGetInfo",
            dataType: "JSON",
            data: {
                type: type
            },
            success: function (data) {
                if (type == "preSale") {
                    data.data.name = "售前服务"
                } else if (type == "afterSale") {
                    data.data.name = "售后服务"
                } else if (type == "promise") {
                    data.data.name = "服务承诺"
                }else if(data.data == undefined){
                    data.data.name = "服务承诺"
                }
                _this.setState({
                    article: data.data
                })
            }
        })
    }

    loadFooterServer(){
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"mainGetContact",
            dataType:"JSON",
            success:function(data){
                var datas = data.data;
                _this.setState({
                    FooterData: datas,
                });
            }
        })
    }
    componentDidMount() {
        let type = this.state.type;
        this.loadFooterServer();
        if(type == ""){
            this.loadArticle("promise");
        }else{
            this.loadArticle(type);
        }

    }
    Back(){
        history.back();
    }
    InputChange(e){
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]:value
        })

    }
    inputFocus(e){
        var _this = e.currentTarget;
        _this.focus()
    }
    onSubmitPost(){
        let _this = this;
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        let reg2 = /^[\u4E00-\u9FA5A-Za-z]+$/;
        let name = this.state.userName;
        let email = this.state.mail;
        let title = this.state.title;
        let content = this.state.content;
        let addtime = this.state.addtime;
        if(this.state.userName == ""){
            alert("用户名不能为空")
        }else if(this.state.mail == ""){
            alert("邮箱不能为空")
        }else if(!reg.test(email)){
            alert("邮箱格式不正确")
        }else if(!reg2.test(name)) {
            alert("名字只能输入汉字、英文及组合")
        }else if(this.state.title == ""){
            alert("标题不能为空")
        }else if(this.state.content == ""){
            alert("内容不能为空")
        }else{
            $.ajax({
                type:"get",
                url:APIURL+"addLeaveMessage",
                dataType:"JSON",
                data:{
                    name:name,
                    email:email,
                    title:title,
                    content:content,
                    addtime:addtime
                },
                success:function(data){
                    if(data.errno == "0"){
                        alert(data.errmsg);
                        history.back()
                    }
                }
            })

        }

    }
    // componentWillUnmount(){
    //
    // }
    render() {
        if (this.state.type == "" || this.state.type == "options" || this.state.type == "意见建议") {
            let footdata = this.state.FooterData;
            let FootData = footdata.map((item,index) =>(
                <li className="opinionFoot" key={index}>{item.key}：{item.value}</li>
            ));
            return (
                <div className="allwidth">
                    <div className="newsArticleHead"></div>
                    <div className="indexBox_2">
                        <div>
                            <div className="newsArticleNavBox allwidth">
                                <div className="newsArticleNav">
                                    <Link to="/">首页></Link><span onClick={this.Back.bind(this)}>客户服务></span>意见建议
                                </div>
                            </div>
                            <div className="opinionBox">
                                <div className="opinionTitle">联系信息</div>
                                <div className="opinionLeftBox">
                                    {/*<div className="opinionLeftTitle">*/}
                                        {/*Lorem Ipsum is simply dummy text of the printing*/}
                                        {/*and typesetting Lorem Ipsum has been the industry's*/}
                                        {/*standard dummy text ever 1500s, when an unknown printer*/}
                                        {/*took a galley of type and scramb standard dummy text ever*/}
                                        {/*1500s, when an unknown printer took a galley of type and*/}
                                        {/*scramb*/}
                                    {/*</div>*/}
                                    <div className="optionFootbox">
                                        <ul>
                                            {FootData}
                                        </ul>
                                    </div>
                                </div>
                                <div className="opinionRightBox">
                                    <form>
                                        <input type="text" placeholder="姓名" name="userName" defaultValue={this.state.userName} className="Input opinionInput" minLength="2" maxLength="10" onChange={this.InputChange.bind(this)} onFocus={this.inputFocus.bind(this)}/>
                                        <input type="email" placeholder="邮箱" name="mail" defaultValue={this.state.mail} className="Input opinionInput" onChange={this.InputChange.bind(this)} onFocus={this.inputFocus.bind(this)}/>
                                        <br/>
                                        <input type="text" placeholder="标题" name="title" defaultValue={this.state.title} className="Input opinionTitleIn" minLength="5" maxLength="30" onChange={this.InputChange.bind(this)} onFocus={this.inputFocus.bind(this)}/>
                                        <br/>
                                        <textarea type="text" placeholder="内容" name="content" defaultValue={this.state.content} className="opinionCon"  maxLength="200" onChange={this.InputChange.bind(this)} onFocus={this.inputFocus.bind(this)}/>
                                        <div className="opinionBtn" value=""  onClick={this.onSubmitPost.bind(this)}>提交建议</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            let article = this.state.article;
            return (
                <div className="allwidth">
                    <div className="newsArticleHead"></div>
                    <div className="indexBox_2">
                        <div>
                            <div className="newsArticleNavBox allwidth">
                                <div className="newsArticleNav"><Link to="/">首页></Link><span onClick={this.Back.bind(this)}>客户服务></span>{article.name}</div>
                            </div>
                            <div className="ArticleBox">
                                <div className="ArticleTitle">{article.name}</div>
                                <div className="ContentBox">
                                    <div dangerouslySetInnerHTML={{__html: article.text}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}