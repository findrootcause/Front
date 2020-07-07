<template>
  <div>
    <span>批量处理:</span>
    <a-switch checked-children="开启" un-checked-children="关闭" default-checked @change="onChange" />
    <a-button type="primary" @click="refresh" class="new">
      <span>新的分析</span>
    </a-button>
    <div v-if="!batch">
      <center>
        <span class="uptext">请上传时间片文件(.csv)以进行实时分析</span>
        <a-upload
          name="csv"
          accept=".csv"
          :multiple="false"
          action="/input/"
          :headers="headers"
          @change="handleChange"
        >
          <a-button :disabled="uploadsuccess">
            <a-icon type="upload" />
            <span v-if="!uploadsuccess">上传文件</span>
            <span v-else>上传成功</span>
          </a-button>
        </a-upload>
      </center>
      <div>
        <br />
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div v-if="uploadsuccess" class="steps-content">
          <a-row>
            <a-col v-if="!this.cause_view" :span="4">
              <span>缩放:</span>
              <a-switch
                checked-children="开启"
                un-checked-children="关闭"
                default-checked
                @change="onChangeZoom"
              />
              <br><br>
              <span>移动:</span>
              <a-switch
                checked-children="开启"
                un-checked-children="关闭"
                default-checked
                @change="onChangeMove"
              />
            </a-col>
            <a-col v-if="!this.cause_view" :span="8">
              <a-spin v-if="loading" tip="结果分析中..." />
              <NodeRelationship
                v-else-if="!loading && !this.sys_view"
                :appear="false"
                :options="this.options"
                :noderelat="this.dataclean_json[0]['node_detail']"
              />
              <CommonDraw
                v-else-if="!loading && this.sys_view"
                :options="this.options"
                :thenode="this.sysanalysis_json['0'][1]"
                :theedge="this.sysanalysis_json['0'][0]"
              />
            </a-col>
            <a-col v-else>
              <a-table :loading="loading" :columns="columns" :data-source="info">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="customTitle">filename</span>
              </a-table>
            </a-col>
          </a-row>
        </div>
        <div class="steps-action">
          <a-button v-if="current < steps.length - 1" type="primary" @click="next" class="new">Next</a-button>
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="$message.success('分析结果成功！')"
			class="new"
          >Done</a-button>
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
        </div>
      </div>
    </div>
    <div v-else>
      <a-divider>请上传时间片文件(.csv)以进行实时分析</a-divider>
      <br />
      <center>
        <a-upload
          name="csv"
          accept=".csv"
          :multiple="true"
          action="/input/"
          :file-list="fileList"
          :headers="headers"
          @change="handleChanges"
        >
          <a-button :disabled="start">
            <a-icon type="upload" />
            <span>批量上传文件</span>
          </a-button>
        </a-upload>
        <br>
        <a-button v-if="!start" type="primary" @click="startanalysis">开始分析</a-button>
        <a-table :loading="!havedata" v-else :columns="columns" :data-source="info">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle">filename</span>
        </a-table>
      </center>
    </div>
  </div>
</template>
<script>
import NodeRelationship from "../../components/NodeRelationship";
import CommonDraw from "../../components/CommonDraw";
import { DataSet, Network } from "vis/index-network";
const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "customTitle" ,
    align: "center"
  },
  {
    title: "rootnode",
    dataIndex: "rootnode",
    key: "rootnode",
    align: "center"
  },
  {
    title: "rootcause",
    dataIndex: "rootcause",
    key: "rootcause",
    align: "center"
  }
];
export default {
  name: "analyze",
  components: {
    NodeRelationship,
    CommonDraw
  },
  data() {
    return {
      info: [],
      columns,
      havedata: false,
      batch: true,
      loading: true,
      start: false,
      sys_view:false,
      cause_view : false,
      current: 0,
      fileList: [],
      csv_name: undefined,
      datacleandata: undefined,
      dataclean_json: undefined,
      sysanalysis_json: undefined,
      findrootnode_json: undefined,
      findcause_json: undefined,
      uploadsuccess: false,
      steps: [
        {
          title: "初始数据可视化"
        },
        {
          title: "相关sys数据可视化"
        },
        {
          title: "输出结果"
        }
      ],
      delayTime: 500,
      headers: {
        authorization: "authorization-text"
      },
      options: {
        autoResize: false,
        height: "400px",
        width: "900px",
        edges: {
          arrows: {
            to: {
              enabled: true,
              scaleFactor: 0.5,
              type: "arrow"
            }
          },
          chosen: false,
          labelHighlightBold: false,
          smooth: {
            enabled: true,
            type: "straightCross",
            roundness: 1
          }
        },
        interaction: {
          dragNodes: false,
          dragView: true,
          hover: true,
          selectable: false,
          selectConnectedEdges: false,
          tooltipDelay: 300,
          zoomView: true
        },
        layout: {
          randomSeed: undefined,
          hierarchical: {
            enabled: true,
            parentCentralization: true,
            treeSpacing:40,
            direction: "LR",
            sortMethod: "directed"
          }
        },
        physics: {
          enabled: false
        }
      }
    };
  },
  created: function() {},
  methods: {
    handleChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} 上传成功！`);
        this.uploadsuccess = true;
        this.dataclean();
      } else if (info.file.status === "error") {
        this.$message.error(
          `${info.file.name} 上传失败！原因:` + info.file.response.detail
        );
      }
    },
    handleChanges(info) {
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} 上传成功！`);
        //this.findrootnode();
        //console.log(JSON.parse(findcause_json));
      } else if (info.file.status === "error") {
        this.$message.error(
          `${info.file.name} 上传失败！原因:` + info.file.response.detail
        );
      }
      let fileList = [...info.fileList];
      fileList = fileList.slice(-5);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      this.fileList = fileList;
    },
    onChange(checked) {
      this.info = [],
      this.havedata = false;
      this.batch = checked;
      this.loading = true;
      this.start = false;
      this.sys_view = false;
      this.cause_view = false;
      this.current = 0;
      this.fileList = [];
      this.csv_name = undefined;
      this.datacleandata = undefined;
      this.dataclean_json = undefined;
      this.sysanalysis_json = undefined;
      this.findrootnode_json = undefined;
      this.findcause_json = undefined;
      this.uploadsuccess = false;
    },
    onChangeZoom(checked) {
      this.$set(this.options.interaction, "zoomView", checked);
      this.loading = true;
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    onChangeMove(checked){
      this.$set(this.options.interaction, "dragView", checked);
      this.loading = true;
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    refresh() {
      this.info = [], 
      this.havedata = false;
      this.loading = true;
      this.start = false;
      this.sys_view = false;
      this.cause_view = false;
      this.current = 0;
      this.fileList = [];
      this.csv_name = undefined;
      this.datacleandata = undefined;
      this.dataclean_json = undefined;
      this.sysanalysis_json = undefined;
      this.findrootnode_json = undefined;
      this.findcause_json = undefined;
      this.uploadsuccess = false;
    },
    next() {
      this.current++;
      if(this.current === 1){
        this.sys_view = true
      }
      else{
        this.sys_view = false
      }
      if(this.current === 2){
        this.cause_view = true
      }
      else{
        this.cause_view = false
      }
    },
    prev() {
      this.current--;
      if(this.current === 1){
        this.sys_view = true
      }
      else{
        this.sys_view = false
      }
      if(this.current === 2){
        this.cause_view = true
      }
      else{
        this.cause_view = false
      }
    },
    dataclean() {
      this.$axios
        .get("/analysis/dataclean/")
        .then(response => {
          this.datacleandata = response.data["datacleandata"];
          this.dataclean_json = response.data["dataclean_json"];
          this.csv_name = response.data["csv_name"];
          this.sysanalysis();
        })
        .catch(error => {
          this.$emit("on-error", error);
        });
    },
    sysanalysis() {
      this.$axios
        .post("/analysis/sysanalysis/", {
          datacleandata: this.datacleandata,
          dataclean_json: this.dataclean_json
        })
        .then(response => {
          this.sysanalysis_json = response.data;
          this.findrootnode();
        })
        .catch(error => {
          this.$emit("on-error", error);
        });
    },
    findrootnode() {
      this.$axios
        .post("/analysis/findrootnode/", {
          dataclean_json: this.dataclean_json,
          sysanalysis_json: this.sysanalysis_json
        })
        .then(response => {
          this.findrootnode_json = response.data;
          this.findrootcause();
        })
        .catch(error => {
          this.$emit("on-error", error);
        });
    },
    findrootcause() {
      this.$axios
        .post("/analysis/findrootcause/", {
          datacleandata: this.datacleandata,
          findrootnode_json: this.findrootnode_json
        })
        .then(response => {
          this.findcause_json = response.data;
          if (this.findrootnode_json[0] == "0") {
              this.findrootnode_json[0] = "无";
            }
          this.info.push({
              key: 0,
              name: this.csv_name[0],
              rootnode: this.findrootnode_json[0],
              rootcause: this.findcause_json[0]
            });
          this.loading = false;
        })
        .catch(error => {
          this.$emit("on-error", error);
        });
    },
    startanalysis() {
      this.start = true;
      this.moreanalysis();
    },
    moreanalysis() {
      this.$axios
        .get("/analysis/moreanalysis/")
        .then(response => {
          this.findcause_json = response.data["findcause_json"];
          this.findrootnode_json = response.data["findrootnode_json"];
          this.csv_name = response.data["csv_name"];
          for (var i = 0; i < this.csv_name.length; i++) {
            if (this.findrootnode_json[i] == "0") {
              this.findrootnode_json[i] = "无";
            }
            this.info.push({
              key: "" + i,
              name: this.csv_name[i],
              rootnode: this.findrootnode_json[i],
              rootcause: this.findcause_json[i]
            });
          }
          this.havedata = true;
        })
        .catch(error => {
          this.$emit("on-error", error);
        });
    }
  }
};
</script>

<style scoped>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}

.steps-content {
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 20px;
}

.steps-action {
  margin-top: 24px;
}

.left {
  width: 500px;
  margin: 50px;
  float: left;
}
.uptext {
  margin: 0 25px;
}
.new{
  float: right;
}
</style>
