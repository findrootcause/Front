<template>
  <div>
    <div>
      <a-spin :spinning="spinning" :delay="delayTime">
        <div class="spin-content">
          <div class="left">
            <a-progress :percent="30" />
            <a-progress :percent="50" status="active" />
            <a-progress :percent="70" status="exception" />
            <a-progress :percent="100" />
            <a-progress :percent="50" :show-info="false" />
          </div>

          <div class="left">
            <a-progress type="circle" :percent="75" />
            <a-progress type="circle" :percent="70" status="exception" />
            <a-progress type="circle" :percent="100" />
          </div>
        </div>
      </a-spin>
      <!-- Loading state：<a-switch v-model="spinning" /> -->
    </div>

    <a-divider>请上传时间片文件(.csv)以进行实时分析</a-divider>
    <br />

    <center>
      <a-upload
        name="csv"
        accept=".csv"
        :multiple="false"
        action="/input/"
        :headers="headers"
        @change="handleChange"
      >
        <a-button
          :disabled="uploadsuccess"
        >
          <a-icon type="upload" />
          <span v-if="!uploadsuccess">上传文件</span>
          <span v-else>上传成功</span>
        </a-button>
      </a-upload>
    </center>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cause : {},
      spinning: false,
      uploadsuccess: false,
      delayTime: 500,
      headers: {
        authorization: "authorization-text"
      }
    };
  },
  created: function () {
    this.findCause();
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        this.spinning = true;
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} 上传成功！`);
        this.uploadsuccess = true
      } else if (info.file.status === "error") {
        this.$message.error(
          `${info.file.name} 上传失败！原因:` + info.file.response.detail
        );
      }
    },
    changeSpinning() {
      this.spinning = !this.spinning;
    },
    findCause(){
      this.$axios
        .get("/analysis/dataclean/")
        .then((response) => {
          this.cause = response.data;
        })
        .catch((error) => {
          this.$emit("on-error", error);
        });
    },
  }
};
</script>

<style scoped>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}

.left {
  width: 500px;
  margin: 50px;
  float: left;
}
</style>
