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
  <br>
  
  <center>
	<a-upload
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :headers="headers"
    @change="handleChange"
  >
    <a-button> <a-icon type="upload" /> Click to Upload File </a-button>
  </a-upload>  
  </center>
	  
  </div>
   
</template>
<script>
export default {
  data() {
    return {
	  spinning: false,
	  delayTime: 500,
      headers: {
        authorization: 'authorization-text',
      },
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
	    this.spinning = true;
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
	changeSpinning() {
	      this.spinning = !this.spinning;
	    },
  },
};
</script>

<style scoped>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}

.left{
	width: 500px;
	margin: 50px;
	float: left;
}

</style>
