import $ from 'jquery'
import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {APIURL,IMG} from '../api'

export default class ArticleList extends React.Component{
    constructor(props){
        super(props);
        // console.log(this.props.location.search.split("=")[1][0]);
        // console.log(this.props.location.search.split("type=")[1]);
        this.state = {
            listId: this.props.location.search.split("=")[1][0] || this.props.location.state.listId,
            type: this.props.location.search.split("type=")[1] || this.props.location.state.type,
            listData:[]
        }
    }
    loadRightList(type,listId){
        let _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"getNewsListByCateId",
            dataType:"JSON",
            data:{
                type:type,
                cateid:listId
            },
            success:function(data){
                _this.setState({
                    listData:data.data
                })
            }
        })
    }
    componentWillReceiveProps(nextProps){
        let nextPropsId = nextProps.location.search.split("=")[1][0] || nextProps.location.state.listId,
            oldPropsId = this.props.location.search.split("=")[1][0] ||this.props.location.state.listId,
            nextPropsType = nextProps.location.search.split("type=")[1] || nextProps.location.state.type,
            oldPropsType = this.props.location.search.split("type=")[1] || this.props.location.state.type
        if(nextPropsId != oldPropsId || nextPropsType != oldPropsType){
            this.loadRightList(nextPropsType,nextPropsId)
            this.setState({
                type:nextPropsType
            })
        }
    }

    componentDidMount(){
        let listId = this.state.listId;
        let type = this.state.type;
        this.loadRightList(type,listId);
    }
    render(){
        let _listData = this.state.listData;
        let ListData = _listData.map((item,index) =>(
            <li className="productArticleLi" key={index}>
                <Link to={{
                    pathname:"/"+this.state.type+"/list/article/"+item.id,
                    query:{
                        id:item.id,
                        type:this.state.type
                    },
                    search:"id="+item.id+"&type="+this.state.type,
                    state:{
                        id:item.id,
                        type:this.state.type
                    }
                }}>
                    <div className="productArticleLiImg"><img src={IMG+item.cover} /></div>
                    <div className="productArticleLiCon">
                        <div className="productArticleLiTitle">{item.title}</div>
                        <div className="productArticleLiIntro">{item.descr}</div>
                    </div>
                </Link>
            </li>
        ))
        return(
            <div className="allwidth">
                <div className="productArticleList">
                    <ul>
                        {ListData}
                        {/*<li className="productArticleLi">*/}
                            {/*<Link to="/">*/}
                                {/*<div className="productArticleLiImg"><img src={require('../../../images/article/article1(1).png')} /></div>*/}
                                {/*<div className="productArticleLiCon">*/}
                                    {/*<div className="productArticleLiTitle">车辆安全监控系统{this.props.match.params.id}</div>*/}
                                    {/*<div className="productArticleLiIntro"></div>*/}
                                {/*</div>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                        {/*<li className="productArticleLi">*/}
                            {/*<Link to="/">*/}
                                {/*<div className="productArticleLiImg"><img src={require('../../../images/article/article1(2).png')} /></div>*/}
                                {/*<div className="productArticleLiCon">*/}
                                    {/*<div className="productArticleLiTitle">车辆安全监控系统{this.props.match.params.id}</div>*/}
                                    {/*<div className="productArticleLiIntro">实时记录车辆的运行轨迹、方向速度</div>*/}
                                {/*</div>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                        {/*<li className="productArticleLi">*/}
                            {/*<Link to="/">*/}
                                {/*<div className="productArticleLiImg"><img src={require('../../../images/article/article1(3).png')} /></div>*/}
                                {/*<div className="productArticleLiCon">*/}
                                    {/*<div className="productArticleLiTitle">车辆安全监控系统{this.props.match.params.id}</div>*/}
                                    {/*<div className="productArticleLiIntro">实时记录车辆的运行轨迹、方向速度</div>*/}
                                {/*</div>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}