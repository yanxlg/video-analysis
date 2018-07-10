/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import VideoAnalysis from "../src/VideoAnalysis";

class VideoAnalysisDemo extends React.Component<any,any>{
    constructor(props:any){
        super(props);
    }
    private video:HTMLVideoElement;
    private videoAnalysis:VideoAnalysis;
    componentDidMount(){
    }
    private getClipVideo=()=>{
        return {
            video:this.video,
        }
    };
    private start=()=>{
        this.videoAnalysis.startPlay();
    };
    render(){
        return (
            <div>
                <button key={"2"} onClick={this.start}>开始复制</button>
                <video autoPlay={true} id="leftVideo" ref={(ref:HTMLVideoElement)=>this.video=ref}>
                    <source src="./test.mp4" type="video/mp4"/>
                    <p>This browser does not support the video element.</p>
                </video>
                <VideoAnalysis ref={(ref:VideoAnalysis)=>this.videoAnalysis=ref} clipVideo={this.getClipVideo} poster={"https://res2dev.9itest.com/resource2/1000/image/20180615/b9e099374b9f4d6ab725c1aa2c1814b8.jpeg"} style={{width:"16rem",height:"9rem"}}/>
            </div>
        )
    }
}


ReactDOM.render(
    <div>
        <VideoAnalysisDemo />
    </div>,
    document.getElementById('__react-content'),
);

export default VideoAnalysisDemo;