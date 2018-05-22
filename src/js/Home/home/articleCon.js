import $ from 'jquery'
import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import '../../../less/ArticleCon.less'
import {APIURL,IMG} from '../api'
export default class ArticleCon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listId: this.props.location.search.split("=")[1][0] || this.props.location.state.id,
            type: this.props.location.search.split("type=")[1] || this.props.location.state.type,
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
    componentWillReceiveProps(nextProps){
        let nextPropsId = nextProps.location.search.split("=")[1][0] || nextProps.location.state.id;
        let oldPropsId = this.props.location.search.split("=")[1][0] || this.props.location.state.id;
        let nextPropsType = nextProps.location.search.split("type=")[1] || nextProps.location.state.type;
        let oldPropsType = this.props.location.search.split("type=")[1] || this.props.location.state.type;
        if(nextPropsId != oldPropsId || nextPropsType != oldPropsType){
            this.setState({
                listId:nextPropsId,
                type:nextPropsType
            })
            this.loadArticle(nextPropsType,nextPropsId)
        }
    }

    componentDidMount(){
        let listId = this.state.listId;
        let type = this.state.type;
        this.loadArticle(type,listId);
    }
    render(){
        return(
            <div className="allwidth">
                <div className="ArticleBox">
                    <div className="ArticleTitle">{this.state.article.title}</div>
                    <div className="ContentBox">
                        <div dangerouslySetInnerHTML={{__html: this.state.article.content}}></div>
                        {/*<div className="allwidth">*/}
                            {/*<div className="TagTitle">系统简介</div>*/}
                            {/**/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }

}