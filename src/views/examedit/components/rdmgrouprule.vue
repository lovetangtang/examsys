<template>
  <div>
    <Form :model="subjectComSaveList" :label-width="80">
      <FormItem label="试题类型：">
        <RadioGroup @on-change="fetchData" v-model="subjectComSaveList.SubjectType">
          <Radio :label="0">模拟试题</Radio>
          <Radio :label="1">正式试题</Radio>
        </RadioGroup>
      </FormItem>

      <Row :gutter="5">
        <Col span="8">
        <FormItem label="试题分类：">
          <Select @on-change="fetchData" size="small" v-model="subjectComSaveList.LoreType" style="width:110px">
            <Option v-for="item in LoreTypeList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="关联业务：">
          <Select @on-change="fetchData"  size="small" v-model="subjectComSaveList.AboutBll" style="width:110px">
            <Option v-for="item in AboutBllList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>

      <FormItem label="简单：">
        <InputNumber v-model="subjectComSaveList.SimpleTkSum" :min="0" :max="SimpleMaxSum" placeholder=""></InputNumber>
        <label for=""> /{{SimpleMaxSum}}</label>
      </FormItem>
      <FormItem label="普通：">
        <InputNumber v-model="subjectComSaveList.UsualTkSum" :min="0" :max="UsualMaxSum" placeholder=""></InputNumber>
        <label for=""> /{{UsualMaxSum}}</label>
      </FormItem>
      <FormItem label="困难：">
        <InputNumber v-model="subjectComSaveList.HardTkSum" :min="0" :max="HardMaxSum" placeholder=""></InputNumber>
        <label for=""> /{{HardMaxSum}}</label>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import {
      GetDegreeSum
  } from '@/api/subject';
  import util from '@/libs/util';
  export default {
      name: 'rdmgrouprule',
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
                  SubjectType: '0', // 试题分类绑定值
                  LoreType: '-1', // 知识分类绑定值
                  AboutBll: '-1', // 关联业务下拉框绑定值
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
              this.subjectComSaveList = data;
              this.subjectComSaveList.action = 'getdegreesum';
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
              console.log(JSON.stringify(v));
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