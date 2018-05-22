import $ from 'jquery'
import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'

import {APIURL,IMG} from '../api'
//
import '../../../less/ArticleCon.less'
import '../../../less/ServerBody.less'
import '../../../less/newsArticle.less'



export default class ArticleCon extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            listId:this.props.match.params.id || this.props.location.state.id ,
            type:this.props.match.params.type || this.props.location.state.type,
            pName:this.props.match.params.pName || this.props.location.state.pName,
            name:this.props.match.params.name || this.props.location.state.name,
            article:[]
        }
    }
    loadArticle(type,id){
        let _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"getNewsContent",
            dataType:"JSON",
            data:{
                type:type,
                id:id
            },
            success:function(data){
                _this.setState({
                    article:data.data
                })
            }
        })
    }
    goBack(){
        history.back();
    }
    // componentWillReceiveProps(nextProps){
    //     let nextPropsId = nextProps.location.state.id;
    //     let oldPropsId = this.props.location.state.id;
    //     let nextPropsType = nextProps.location.state.type;
    //     let oldPropsType = this.props.location.state.type;
    //     if(nextPropsId != oldPropsId || nextPropsType != oldPropsType){
    //         this.setState({
    //             listId:nextPropsId,
    //             type:nextPropsType
    //         })
    //         this.loadArticle(nextPropsType,nextPropsId)
    //     }
    // }

    componentDidMount(){
        let listId = this.state.listId;
        let type = this.state.type
        this.loadArticle(type,listId);
    }
    render(){
        return(
            <div className="allwidth">
                <div className="newsArticleHead"></div>
                <div className="indexBox_2">
                    <div className="newsArticleNavBox allwidth">
                        <div className="newsArticleNav"><Link to="/">首页</Link>><span onClick={this.goBack.bind(this)}>新闻中心></span><span onClick={this.goBack.bind(this)}>{this.state.pName}></span>{this.state.name}</div>
                    </div>
                    <div className="ArticleBox">
                        <div className="ArticleTitle">{this.state.article.title}</div>
                        <div className="ContentBox">
                            <div dangerouslySetInnerHTML={{__html: this.state.article.content}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}