import $ from 'jquery'
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {APIURL,IMG} from '../api'
import '../../../less/ArticleCon.less'

import '../../../less/newsArticle.less'


export default class AboutArticle extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.location.state || this.props.match) {
            console.log(this.props)
            this.state = {
                type: this.props.match.params.type || this.props.location.state.type || this.props.location.state.url.substring(17),
                article: [],
                FooterData:[]
            }
        } else {
            let type = window.location.search
            console.log(type)
        }
    }

    componentWillReceiveProps(nextProps) {
        let nextPropsType = nextProps.match.params.type || nextProps.location.state.type || nextProps.location.state.url.substring(17);
        let oldPropsType = this.props.match.params.type || this.props.location.state.type || this.props.location.state.url.substring(17);
        let nextPropsName = nextProps.match.params.type || nextProps.location.state.name;
        if (nextPropsType != oldPropsType) {
            this.setState({
                type: nextPropsType,
                name:nextPropsName
            });
            this.loadArticle(nextPropsType);
        }
    }
    loadArticle(type) {
        let _this = this;
        if(type == "公司介绍"){
            type = "introduce"
        }else if(type == "公司文化"){
            type = "culture"
        }else if(type == "资质荣誉"){
            type = "honor";
        }else if(type == "联系我们"){
            type = "contact"
        }
        $.ajax({
            type: "get",
            url: APIURL+"aboutUsGetInfo",
            dataType: "JSON",
            data: {
                type: type,
            },
            success: function (data) {
                if(type == "introduce"){
                    data.data.name = "公司介绍"
                }else if(type == "culture"){
                    data.data.name = "公司文化"
                }else if(type == "honor"){
                    data.data.name = "资质荣耀"
                }else if(type == "contact"){
                    data.data.name = "联系我们"
                }
                _this.setState({
                    article: data.data
                })
            }
        })
    }
    componentWillMount() {
        let type = this.state.type;
        this.loadArticle(type);
    }
    Back(){
        history.back()
    }
    render() {
        let article = this.state.article;
        return (
            <div className="allwidth">
                <div className="newsArticleHead"></div>
                <div className="indexBox_2">
                    <div>
                        <div className="newsArticleNavBox allwidth">
                            <div className="newsArticleNav"><Link to="/">首页></Link><span onClick={this.Back.bind(this)}>关于我们></span>{article.name}</div>
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
