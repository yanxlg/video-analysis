/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import VideoAnalysis from "../src/VideoAnalysis";
import flvjs from "flv.js";

class VideoAnalysisDemo extends React.Component<any,any>{
    constructor(props:any){
        super(props);
    }
    private video:HTMLVideoElement;
    private flvPlayer:any;
    private url:string="https://xaidc002.9itest.com/dms/ttt.flv";
    private videoAnalysis:VideoAnalysis;
    private destroy(){
        if(this.flvPlayer){
            this.flvPlayer.pause();
            this.flvPlayer.unload();
            this.flvPlayer.detachMediaElement();
            this.flvPlayer.destroy();
            this.flvPlayer=null;
        }
    }
    private play(){
        if(!this.video){
            this.video=document.createElement("video");
            this.video.autoplay=true;
        }
        if(this.flvPlayer){
            this.destroy();
        }
        //判断是否需要跨域
        this.flvPlayer = flvjs.createPlayer({
            type: "flv",
            url: this.url,
            cors:true,
        });
        this.flvPlayer.on("Exception",(error:any)=>{
            //404
            this.play();
        });
        this.flvPlayer.on("HttpStatusCodeInvalid",(error:any)=>{
            //invalid
            this.play();
        });
        this.flvPlayer.on("ConnectingTimeout",(error:any)=>{
            //timeout
            this.play();
        });
        this.flvPlayer.on(flvjs.Events.ERROR,(error:any)=>{
            //报错需要重启
            this.play();
        });
        this.flvPlayer.attachMediaElement(this.video);
        this.flvPlayer.load();
    }
    componentDidMount(){
        this.play();
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
                <video ref={(ref:HTMLVideoElement)=>this.video=ref}/>
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