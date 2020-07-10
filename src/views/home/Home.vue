<template>
  <div>
    <div class="body">
      <h1>网络拓扑故障根因定位系统</h1>
      <h3>满足故障根因定位实时性的要求</h3>
      <h3>可视化展现根因信息及根因关联的局部拓扑图</h3>
      <div class="blank"></div>
      <span id="1" />
      <a-affix :offset-top="top">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="mail">
            <a href="#1">
              <a-icon type="line-chart" />赛题分析
            </a>
          </a-menu-item>
          <a-menu-item key="app">
            <a href="#2">
              <a-icon type="read" />使用说明
            </a>
          </a-menu-item>
          <a-menu-item key="alipay">
            <a href="#us">
              <a-icon type="smile" />关于我们
            </a>
          </a-menu-item>
        </a-menu>
      </a-affix>
      <div class="content">
        <div id="question">
          <h2>赛题分析</h2>

          <p>
            赛题背景为大型电商平台内部大量系统之间的互相调用时会产生大量告警数据，
            <br />我们需要找出有效告警以及疑似根因的告警，解决网络运维面临的主要难题。
            <br />赛题主要涉及数据分析、图论、信息论、自然语言处理、神经网络等技术，
            <br />要求队员掌握相关的基础知识，具有python数据分析、处理及功能开发能力。
            <br />合作完成的系统应准确、快速的定位网络故障，提升一线网络运维的效率，降低网络故障产生的损失。
          </p>
          <p>
            <b>赛题要求实现以下各部分功能:</b>
            <br />1、过滤无效告警，即做到对告警数据进行去噪
            <br />2、挖掘不同告警信息之间的关系，即做到对告警信息聚类
            <br />3、对类内告警信息进行因果关系匹配，进一步缩小范围，确定根因。
          </p>
          <p>
            <b>系统设计及功能要求如下：</b>
            <br />1、要求能可视化展现根因信息及根因关联的局部拓扑图。
            <br />2、要求系统运行稳定、可靠、流畅。
            <br />3、系统设计要求目录结构设计合理
            <br />4、功能模块划分合理。
            <br />
            <span id="2" />
            5、代码要求整洁，易读，符合程序编码规范，命名规范，注释清楚。
            <br />
          </p>
        </div>
        <hr />
        <div id="use">
          <h2>使用说明</h2>
        </div>
        <hr />
        <div id="us">
          <div class="right">
            <h2>关于我们</h2>
            <p>
              <b>Turing Wisper 图灵耳语</b>团队三名成员均为本科生，分别来自于哈尔滨工程大学不同院系。
              <br />指导老师从事神经网络方面研究多年，着眼于前沿算法，学术成果颇丰。
            </p>
            <p>
              团队内部采用目前互联网公司内部流行的前后端分离的工作流。
              <br />前期进行密集讨论确定算法部分方案，通过团队成员协作分工，
              <br />将根因可能出现的情况根据前后影响因素，时间序列，出现数量分布，拓扑结构分为四大部分，
              <br />后细分为十种可能情况逐个突破。
              <br />算法部分确定之后团队成员立刻投入各部分代码的编写，并且相互间提要求，找问题，做优化，
              <br />每个成员做到对项目有完整，全面，准确的理解，取长补短，互帮互助。
              <br />
            </p>
            <p>
              疫情期间团队成员分布于全国各地，通过视频会议，协同办公，代码托管等方式
              <br />无缝衔接提升工作效率，确保项目如期完美完成。
            </p>
            <p>
              我们目标找到根因与其他原因间，网络故障与时间序列之间的相互联系，
              <br />挖掘三者之间的共同特点，力争实现
              <br />速度最快，算法最准，运行最稳定，使用最方便，可视化效果最好，可移植性最高的
              <br />基于网络拓扑及告警的故障根因定位系统。
            </p>
          </div>
        </div>
      </div>
      <a-back-top />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: [""],
      top: -5,
      bottom: 10
    };
  }
};
</script>
<style>
.body {
  background: #fff url(./img/cop.png) no-repeat top right;
  background-size: 600px 596px;
  height: 4680px;
}
.body h1 {
  font-size: 36px;
  position: relative;
  top: 168px;
  left: 50px;
}
.body h3 {
  position: relative;
  left: 70px;
  top: 180px;
}
.blank {
  height: 400px;
}
.content {
  position: relative;
  top: 10px;
  letter-spacing: 3px;
}
.right {
  float: right;
}
hr {
  color: rgba(0, 0, 0, 0.5);
}
#question {
  background: #fff url(./img/1.png) no-repeat top right;
  height: 400px;
  background-size: 1000px 500px;
}
#use {
  background: #fff url(./img/foruse.png) no-repeat top center;
  height: 3000px;
  background-size: cover;
}
#us {
  background: #fff url(./img/big.png) no-repeat left;
  height: 365px;
  background-size: 380px 380px;
}
</style>