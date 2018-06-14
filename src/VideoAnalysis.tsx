import * as React from "react";

export declare interface IVideoAnalysisProps{
    isLive:boolean;
    vodeo:HTMLVideoElement;
    poster:string;
}

class VideoAnalysis extends React.Component<IVideoAnalysisProps>{
    constructor(props:IVideoAnalysisProps){
        super(props);

    }
    shouldComponentUpdate(){
        return false;//不支持更新属性
    }
    render(){

    }
}

export default VideoAnalysis;