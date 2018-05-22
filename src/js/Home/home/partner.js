import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'

import {APIURL,IMG} from '../api'

class PartnerMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listData:[]
        }
    }
    loadServerList(){
        let _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"Cooperationmain",
            dataType:"JSON",
            success:function(data){
                console.log(data)
                _this.setState({
                    listData:data.data
                })
            }
        })
    }
    componentDidMount(){
        this.loadServerList()
    }
    render(){
        let _listdata = this.state.listData;
        let ListData = _listdata.map((item,index) =>(
            <li className="serverMenuListLi" key={index}>
                <Link to={{
                    pathname:"/partnerArticle/"+item.type,
                    query:{
                        type:item.type,
                        name:item.descr
                    },
                    state:{
                        type:item.type,
                        name:item.descr
                    }
                }}>
                    <div className="serverMenuLiImg"><img src={IMG+"Public/Upload/Customer/"+item.img} /></div>
                    <div className="serverMenuLiIntro">
                        {item.descr}
                    </div>
                </Link>
            </li>
        ))
        return(
            <div className="serverMenu">
                <div className="serverMenuTitle">
                    战略合作
                </div>
                <div className="serverMenuList">
                    <ul>
                        {ListData}
                        {/*<li className="serverMenuListLi">*/}
                            {/*<div className="serverMenuLiImg"><img /></div>*/}
                            {/*<div className="serverMenuLiIntro">*/}
                                {/*我们为您提供完善的售后保障和优质的售后服务*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="serverMenuListLi">*/}
                            {/*<div className="serverMenuLiImg"><img /></div>*/}
                            {/*<div className="serverMenuLiIntro">*/}
                                {/*我们为您提供完善的售后保障和优质的售后服务*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="serverMenuListLi">*/}
                            {/*<div className="serverMenuLiImg"><img /></div>*/}
                            {/*<div className="serverMenuLiIntro">*/}
                                {/*我们为您提供完善的售后保障和优质的售后服务*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="serverMenuListLi">*/}
                            {/*<div className="serverMenuLiImg"><img /></div>*/}
                            {/*<div className="serverMenuLiIntro">*/}
                                {/*我们为您提供完善的售后保障和优质的售后服务*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
            // {/*<div className="serverMenu">*/}
            //     {/*<div className="serverMenuTitle">*/}
            //         {/*战略合作*/}
            //     {/*</div>*/}
            //     {/*<div className="serverMenuList">*/}
            //         {/*<ul>*/}
            //             {/*<li className="serverMenuListLi partnerMenuListLi">*/}
            //                 {/*<div className="partnerTitleBox">*/}
            //                     {/*<div className="partnerTitle">*/}
            //                         {/*合作同盟*/}
            //                     {/*</div>*/}
            //                 {/*</div>*/}
            //                 {/*<div className="partnerIntro">*/}
            //                     {/*战略伙伴关系，是一种不针对第三国、不搞对抗，推动平等*/}
            //                     {/*合作的正常国家关系，是对话关系，而不是传统意义上的结盟关系。*/}
            //                 {/*</div>*/}
            //                 {/*<div className="partnerTag">*/}
            //                     {/*<span>资源共享</span>*/}
            //                     {/*<span>互利共赢</span>*/}
            //                     {/*<span>合作同盟</span>*/}
            //                 {/*</div>*/}
            //             {/*</li>*/}
            //         {/*</ul>*/}
            //     {/*</div>*/}
            // {/*</div>*/}
        )
    }
}
export default PartnerMenu