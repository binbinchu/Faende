import $ from 'jquery'
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {APIURL,IMG} from '../api'

//
import '../../../less/ArticleCon.less'
import '../../../less/newsArticle.less'


export default class PartnerArticle extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.location.state || this.props.match) {
            this.state = {
                type: this.props.match.params.type || this.props.location.state.type || this.props.location.state.url.substring(21),
                article: [],
                FooterData:[]
            }
        } else {
            let type = window.location.search
            console.log(type)
        }
    }

    componentWillReceiveProps(nextProps) {
        let nextPropsType = nextProps.match.params.type || nextProps.location.state.type || nextProps.location.state.url.substring(21);
        let oldPropsType = this.props.match.params.type || this.props.location.state.type || this.props.location.state.url.substring(21);
        let nextPropsName = nextProps.match.params.type || nextProps.location.state.name;
        let oldPropsName = this.props.match.params.type || this.props.location.state.name;

        if (nextPropsType != oldPropsType) {
            this.setState({
                type: nextPropsType,
                name:nextPropsName
            });
            this.loadArticle(nextPropsType);
        }
    }
    loadArticle(type) {
        if(type == "合作同盟"){
            type = "alliance"
        }else if(type == "招贤纳士"){
            type = "strategic"
        }
        let _this = this;
        $.ajax({
            type: "get",
            url: APIURL+"CooperationmainGetInfo",
            dataType: "JSON",
            data: {
                type: type
            },
            success: function (data) {
                if (type == "alliance") {
                    data.data.name = "合作同盟"
                } else if (type == "strategic") {
                    data.data.name = "招贤纳士"
                }
                _this.setState({
                    article: data.data
                })
            }
        })
    }
    Back(){
        history.back();
    }
    componentDidMount() {
        let type = this.state.type;
        this.loadArticle(type);
    }

    render() {
        let article = this.state.article;
        return (
            <div className="allwidth">
                <div className="newsArticleHead"></div>
                <div className="indexBox_2">
                    <div>
                        <div className="newsArticleNavBox allwidth">
                            <div className="newsArticleNav"><Link to="/">首页></Link><span onClick={this.Back.bind(this)}>战略合作></span>{article.name}</div>
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