<template>
  <Row :gutter="50" style="margin:20px">
    <Col span="12">
    <Form :model="subjectComSaveList" :label-width="80">
      <FormItem label="考试名称：">
        <Input placeholder=""></Input>
      </FormItem>
      <FormItem label="考试分类：">
        <Input placeholder=""></Input>
      </FormItem>
      <FormItem label="考试时间：">
        <Input placeholder=""></Input>
      </FormItem>
      <FormItem label="考试时间：">
        <Input placeholder=""></Input>
      </FormItem>
    </Form>
    </Col>
    <Col span="12">试卷名称</Col>
  </Row>
</template>
<script>
  import {
      GetDegreeSum
  } from '@/api/subject';
  import util from '@/libs/util';
  export default {
      name: 'examcmpts',
      props: {

      },
      data () {
          return {
              LoreTypeList: [], // 试题分类集合
              AboutBllList: [], // 关联业务集合
              SimpleMaxSum: 0,
              UsualMaxSum: 0,
              HardMaxSum: 0,
              subjectComSaveList: { // 编辑录入后台的通用参数
                  SubjectType: 0, // 试题分类绑定值
                  LoreType: '-1', // 知识分类绑定值
                  AboutBllMode: '-1', // 关联业务下拉框绑定值
                  action: 'getdegreesum',
                  SubjecSubClass: -1,
                  SimpleTkSum: 0,
                  UsualTkSum: 0,
                  HardTkSum: 0
              }
          };
      },
      // 在模板渲染成html后调用,对html操作
      mounted () {
          this.init();
          this.$nextTick(() => {});
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
              // 下拉数据源赋值
              util.GetItemList('100002', '', true).then(dt => {
                  this.AboutBllList = dt;
                  return util.GetItemList('100003', '', true);
              }).then(dt4 => {
                  this.LoreTypeList = dt4;
              });
              this.fetchData();
              this.$nextTick(() => {});
          },
          // 设置表单数据
          setsubjectComSaveList (data) {
              console.log(data);
              this.subjectComSaveList = data;
          },
          // 刷新数据
          fetchData () {
              try {
                  GetDegreeSum(this.subjectComSaveList).then(response => {
                      this.SimpleMaxSum = response.data.simple;
                      this.UsualMaxSum = response.data.usual;
                      this.HardMaxSum = response.data.hard;
                  });
              } catch (error) {
                  console.log(error);
              }
          },
          setSumData (v) {
              this.subjectComSaveList.SubjecSubClass = v;
              this.fetchData();
          },
          refresh (v, d) {
              this.listQuery.SubjecSubClass = v;
              this.listQuery.debarIds = d;
              this.fetchData();
          },
          // 获取题目数据
          getSubjectData () {

          },
          // 重置数据
          clearData () {
              console.log('清空');
              this.subjectComSaveList = this.$options.data().subjectComSaveList;
          }

      }
  };
</script>