<style lang="less">
  @import '../../styles/common.less';
  @import './examedit.less';
</style>
<template>
  <div>
    slot-scope=""
  </div>
</template>
<script>
  import {
      GetList,
      DelPaperList
  } from '@/api/paper';
  export default {
      name: 'examedit',
      components: {},
      data () {
          return {
              data: []
          };
      },
      // 在模板渲染成html后调用,对html操作
      mounted () {
          this.init();
          window.addEventListener('resize', this.scrollHeightResize);
          this.$nextTick(() => {

          });
      },
      // 组件销毁后调用
      destroyed () {},
      // 实时监听属性值变化，并对其进行操作
      computed: {
          avatorPath () {

          }
      },
      // 模板渲染成html前调用，初始化属性
      created () {
          this.fetchData();
      },
      // 自定义方法
      methods: {
      // 初始化内容
          init () {
              // 设置表格高度
              this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 185;
              this.$nextTick(() => {});
          },
          // 刷新数据
          fetchData () {
              try {
                  this.disable = true;
                  this.loading = true;
                  GetList(this.listQuery).then(response => {
                      this.data = response.data;
                      this.loading = false;
                      this.total = response.count;
                  });
              } catch (error) {
                  console.log(error);
              }
          },
          scrollHeightResize () {
              if (this.$refs.table && this.$refs.table.$el) {
                  this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
              }
          },
          // 展开编辑窗体
          showEdit (params) {

          },
          // 移除数据
          remove (params) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '确定要删除吗？',
                  loading: true,
                  onOk: () => {
                      this.data.splice(params.index, 1);
                      this.delSubject(params.row.KeyID);
                      this.$Modal.remove();
                  },
                  onCancel: () => {}
              });
          },
          // 删除题库的公共方法
          delSubject (keyids) {
              DelPaperList(keyids).then(response => {
                  this.fetchData();
                  this.$Notice.success({
                      title: response.msg,
                      desc: '',
                      duration: 2
                  });
              });
          },
          // 页面跳转
          changePage (val) {
              this.listQuery.start = this.listQuery.limit * (val - 1);
              this.fetchData();
          },
          // 分页数量
          onpagesizechange (val) {
              if (this.listQuery.limit === val) {
                  return;
              }
              this.listQuery.limit = val;
              this.fetchData();
          },
          // 监听选中项
          handleRowChange (option) {
              this.chekcData = option;
              if (option.length > 0) {
                  this.disable = false;
              } else {
                  this.disable = true;
              }
          },
          // 删除考试信息
          handleDelSubject () {
              this.$Modal.confirm({
                  title: '提示',
                  content: '确定要删除吗？',
                  loading: true,
                  onOk: () => {
                      let keyids = '';
                      for (let i = 0; i < this.chekcData.length; i++) {
                          keyids += this.chekcData[i].KeyID + ',';
                      }
                      keyids = keyids.substring(0, keyids.length - 1);
                      this.delSubject(keyids);
                      this.$Modal.remove();
                  }
              });
          },
          // 创建考试
          handleCreatExam () {

          },
          // 导出信息
          handleExport () {
              this.$Modal.info({
                  content: '正在开发...'
              });
          }
      }
  };
</script>