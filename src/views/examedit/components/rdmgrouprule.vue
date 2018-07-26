<template>
  <div>
    <Form :model="subjectComSaveList" :label-width="80">
      <FormItem label="试题类型：">
        <RadioGroup v-model="subjectComSaveList.SubjectType">
          <Radio label="0">模拟试题</Radio>
          <Radio label="1">正式试题</Radio>
        </RadioGroup>
      </FormItem>

      <Row :gutter="5">
        <Col span="8">
        <FormItem label="试题分类：">
          <Select size="small" v-model="subjectComSaveList.LoreType" style="width:110px">
            <Option v-for="item in LoreTypeList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="关联业务：">
          <Select size="small" v-model="subjectComSaveList.AboutBllMode" style="width:110px">
            <Option v-for="item in AboutBllList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>

      <FormItem label="简单：">
        <InputNumber v-model="subjectComSaveList.SimpleTkSum" placeholder=""></InputNumber>
        <label for=""> /10</label>
      </FormItem>
      <FormItem label="普通：">
        <InputNumber v-model="subjectComSaveList.UsualTkSum" placeholder=""></InputNumber>
        <label for=""> /10</label>
      </FormItem>
      <FormItem label="困难：">
        <InputNumber v-model="subjectComSaveList.HardTkSum" placeholder=""></InputNumber>
        <label for=""> /10</label>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import {
      GetList
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
              subjectComSaveList: { // 编辑录入后台的通用参数
                  SubjectType: 0, // 试题分类绑定值
                  LoreType: '-1', // 知识分类绑定值
                  AboutBllMode: '-1', // 关联业务下拉框绑定值
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
              this.$nextTick(() => {});
          },
          // 设置表单数据
          setsubjectComSaveList (data) {
              this.subjectComSaveList = data;
          },
          // 刷新数据
          fetchData () {
              try {
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
              this.subjectComSaveList = this.$options.data().subjectComSaveList;
          }

      }
  };
</script>