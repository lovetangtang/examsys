<style lang="less">
  @import '../../styles/common.less';
  @import "../../commtable.less";
</style>
<template>
  <div>
    <Card>
      <div class="box-head">
        <div class="head-btn">
          <Button type="primary" icon="android-add">添加试题</Button>
          <Button type="warning" icon="android-delete">删除试题</Button>
        </div>
        <div class="head-search">
          <Row>
            <Col span="22">
            <Form :model="formSearch" label-position="right">
              <Row>
                <Col span="5">
                <FormItem label="试题内容" :label-width="60">
                  <Input v-model="formSearch.input1"></Input>
                </FormItem>
                </Col>
                <Col span="5">
                <FormItem label="题型" :label-width="60">
                  <Input v-model="formSearch.input2"></Input>
                </FormItem>
                </Col>
                <Col span="5">
                <FormItem label="难度" :label-width="60">
                  <Input v-model="formSearch.input3"></Input>
                </FormItem>
                </Col>
              </Row>
            </Form>
            </Col>
            <Col span="2" class="ft-cs">
            <div>
              <a href="javascript:void(0)" class="fl-r margin-right-6">
                高级搜索
                <Icon type="arrow-down-b"></Icon>
              </a>
            </div>
            </Col>
          </Row>
        </div>
      </div>
      <div class="box-content">
        <div class="tab-content">
          <Table  highlight-row border :columns="columns1" :data="data1" ref="table" :height="tableHeight"></Table>
        </div>
      </div>
      <div class="box-bottom">
        <div class="page">
           <Page :total="40" @on-change="changePage" size="small" show-elevator show-sizer></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  export default {
      name: 'exam',
      components: {},
      data () {
          return {
              tableHeight: 450,
              formSearch: {
                  input1: '',
                  input2: '',
                  input3: ''
              },
              columns1: [ {
                  type: 'selection',
                  width: 60,
                  align: 'center'
              }, {
                  title: 'Name',
                  sortable: true,
                  key: 'name'
              },
              {
                  title: 'Age',
                  sortable: true,
                  key: 'age'
              },
              {
                  title: 'Address',
                  sortable: true,
                  key: 'address'
              },
              {
                  title: 'Action',
                  key: 'action',
                  width: 150,
                  align: 'center',
                  render: (h, params) => {
                      return h('div', [
                          h('Button', {
                              props: {
                                  type: 'primary',
                                  size: 'small'
                              },
                              style: {
                                  marginRight: '5px'
                              },
                              on: {
                                  click: () => {
                                      this.show(params.index);
                                  }
                              }
                          }, '编辑'),
                          h('Button', {
                              props: {
                                  type: 'error',
                                  size: 'small'
                              },
                              on: {
                                  click: () => {
                                      this.remove(params.index);
                                  }
                              }
                          }, '删除')
                      ]);
                  }
              }
              ],
              data1: [{
                  name: 'John Brown',
                  age: 18,
                  address: 'New York No. 1 Lake Park',
                  date: '2016-10-03'
              },
              {
                  name: 'Jim Green',
                  age: 24,
                  address: 'London No. 1 Lake Park',
                  date: '2016-10-01'
              },
              {
                  name: 'Joe Black',
                  age: 30,
                  address: 'Sydney No. 1 Lake Park',
                  date: '2016-10-02'
              },
              {
                  name: 'Jon Snow',
                  age: 26,
                  address: 'Ottawa No. 2 Lake Park',
                  date: '2016-10-04'
              }
              ]
          };
      },
      mounted () {
          this.init();
          window.addEventListener('resize', this.scrollHeightResize);
          this.$nextTick(() => {

          });
      },
      destroyed () {},
      computed: {
          avatorPath () {

          }
      },
      methods: {
          init () {
              // 设置表格高度
              this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
              this.$nextTick(() => {

              });
          },
          scrollHeightResize () {
              this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
          },
          changePage () {
          },
          show (index) {
              this.$Modal.info({
                  title: 'User Info',
                  content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
              });
          },
          remove (index) {
              this.data1.splice(index, 1);
          }
      }
  };
</script>