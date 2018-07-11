import $ from 'jquery';
import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {Slider,IndexAbout,IndexNews,IndexCase,IndexEntrance} from './home/index';

import '../../less/Content.less';
import {APIURL,IMG} from './api'
export default class IndexBody extends React.Component{
    constructor(props){
        super(props);
        this.state={
            IndexNewsData:[],
            IndexProductData:[]
        }
    }
    loadIndexNews(){
        let _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"mainGetNews",
            dataType:"JSON",
            success:function(data){
                _this.setState({
                    IndexNewsData: data.data
                });
            }
        })
    }
    loadIndexProduct(){
        let _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"mainGetProduct",
            dataType:"JSON",
            success:function(data){
                _this.setState({
                    IndexProductData: data.data
                });
            }
        })
    }
    componentDidMount(){
        this.loadIndexNews();
        this.loadIndexProduct();
    }
    render(){
        return(
            <div className="allwidth">
                <div className="indexSlider">
                    <Slider/>
                </div>
                <div className="indexAbout">
                    <IndexAbout/>
                </div>
                <div className="indexNews">
                    <IndexNews newslist={this.state.IndexNewsData}/>
                </div>
                <div className="indexCase">
                    <IndexCase caselist={this.state.IndexProductData}/>
                </div>
                <div className="indexEntrance">
                    <IndexEntrance/>
                </div>
            </div>
        )
    }
}