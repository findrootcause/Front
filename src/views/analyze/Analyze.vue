<template>
  <div>
    <span>批量处理:</span>
    <a-switch checked-children="开启" un-checked-children="关闭" default-checked @change="onChange" />
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
        <div class="steps-content">
          <a-spin v-if="loading" tip="结果分析中..."/>
          <NodeRelationship
            v-else
            :appear="false"
            :options="this.options"
            :noderelat="this.dataclean_json[0]['node_detail']"
          />
        </div>
        <div class="steps-action">
          <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="$message.success('分析结果成功！')"
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
        <a-button type="primary" @click="startanalysis">开始分析</a-button>
       <a-table :columns="columns" :data-source="info">
       <a slot="name" slot-scope="text">{{ text }}</a>
       <span slot="customTitle">filename</span>
       </a-table>
      </center>
    </div>
  </div>
</template>
<script>
import NodeRelationship from "../../components/NodeRelationship";
import { DataSet, Network } from "vis/index-network";
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
    align: 'center'
  },
  {
    title: 'rootnode',
    dataIndex: 'rootnode',
    key: 'rootnode',
    align: 'center'
  },
  {
    title: 'rootcause',
    dataIndex: 'rootcause',
    key: 'rootcause',
    align: 'center'
  },
];
var info = [];
export default {
  name: "analyze",
  components: {
    NodeRelationship
  },
  // computed:{
  //   info() {
  //     var list = [];
  //     for(let i = 0; i < this.csv_name.length; i++){
  //       list.push({
  //         key: i,
  //         name: this.csv_name[i],
  //         rootnode: findrootnode[i],
  //         rootcause: findcause_json[i]
  //       })
  //     }

  //   }
  // },

  data() {
    return {
      info,
      columns,
      cause: {},
      batch: true,
      loading: true,
      index: 0,
      start: false,
      current: 0,
      fileList: [],
      csv_name: undefined,
      datacleandata: undefined,
      dataclean_json: undefined,
      sysanalysis_json: undefined,
      findrootnode_json: undefined,
      findcause_json: undefined,
      steps: [
        {
          title: "初始数据可视化",
          content: "First-content"
        },
        {
          title: "相关sys数据可视化",
          content: "Second-content"
        },
        {
          title: "输出结果",
          content: "Last-content"
        }
      ],
      uploadsuccess: false,
      delayTime: 500,
      headers: {
        authorization: "authorization-text"
      },
      options : {
        autoResize: false,
        height: "400px",
        width: "600px",
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
          dragView: false,
          hover:true,
          selectable: false,
          selectConnectedEdges: false,
          tooltipDelay: 300,
          zoomView: false
        },
        layout: {
          randomSeed: undefined,
          hover: true,
          hierarchical: {
            enabled: true,
            parentCentralization: true,
            direction: "LR", 
            sortMethod: "directed",
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
        console.log(info.file, info.fileList);
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
      fileList = fileList.slice(-20);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      this.fileList = fileList;
    },
    onChange(checked) {
      console.log(`a-switch to ${checked}`);
      this.batch = checked;
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
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
          this.loading = false
        })
        .catch(error => {
          this.$emit("on-error", error);
        });
    },
    startanalysis() {
      this.start = true;
      this.moreanalysis();
      //this.findrootnode();
    },
    moreanalysis() {
      this.$axios
        .get("/analysis/moreanalysis/")
        .then(response => {
          this.findcause_json = response.data["findcause_json"];
          this.findrootnode_json = response.data["findrootnode_json"];
          this.csv_name = response.data["csv_name"];
          for(var i = 0; i < this.csv_name.length; i++){
            if(this.findrootnode_json[i]=='0') {this.findrootnode_json[i] = '无'}
            this.info.push({
            key: ''+i,
            name: this.csv_name[i],
            rootnode: this.findrootnode_json[i],
            rootcause: this.findcause_json[i]
         })
        };
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
</style>