## Video Analysis
[![npm](https://img.shields.io/npm/v/video-analysis.svg?style=flat-square)](https://www.npmjs.com/package/video-analysis)
[![npm](https://img.shields.io/npm/l/video-analysis.svg?style=flat-square)](https://www.npmjs.com/package/video-analysis)
[![npm](https://img.shields.io/npm/dm/video-analysis.svg?style=flat-square)](https://www.npmjs.com/package/video-analysis)

* video -> canvas ->canvas
* 黑屏屏蔽：
    - 画布getImageData()计算rgba颜色值，通过算法比较
    - ImageData 全黑状态[0,0,0,255];
    - 过滤算法：
        * Uint8ClampedArray.prototype.findIndex()全部匹配，时间测试（500X300画布）
            - 实现：
            ```javascript
                  data.findIndex((val,index)=>index%4===3?val!==255:val!==0)
           ```
            - 无黑色：[0-6]ms
            - 全黑色：[14-20]ms
        * 抽样点匹配，时间测试（基础5点+抽样频率50像素一个点）（500X300画布） 50个点
            ```javascript
              const point1=context.getImageData(0,0,1,1).data;
              if("0,0,0,255"!==point1.toString()){
                  return true;
              }
              const point2=context.getImageData(canvas.width/2-1,canvas.height/2-1,1,1).data;
              if("0,0,0,255"!==point2.toString()){
                  return true;
              }
              
              const point3=context.getImageData(canvas.width-1,0,1,1).data;
              if("0,0,0,255"!==point3.toString()){
                  return true;
              }
              const point4=context.getImageData(0,canvas.height-1,1,1).data;
              if("0,0,0,255"!==point4.toString()){
                  return true;
              }
              const point5=context.getImageData(canvas.width-1,canvas.height-1,1,1).data;
              //[0,0,0,255]
              if("0,0,0,255"!==point5.toString()){
                  return true;
              }
              
              //采样
              const length=Math.floor(canvas.width/50);
              const depth=Math.floor(canvas.height/50);
              for(let i =1;i<length;i++){
                  for(let j =1;j<depth;j++){
                      const point = context.getImageData(50*i-1,50*j-1,1,1).data;
                      if("0,0,0,255"!==point.toString()){
                          return true;
                      }
                  }
              }
              return false;
            ```
            - 无黑色：[0-2]ms
            - 全黑色：[0-2]ms
    - 通过比较验证，抽样算法更优，50分辨率几乎能够确保有光源即可检测到，光源抽样范围足够小，可调节
    
   * 透明屏蔽：等同于黑屏屏蔽
   * 使用requestAnimationFrame 每一帧执行时间是在27-40ms左右，1s中帧率低于60fps,会出现视屏卡顿，采用setTimeout 0 替代