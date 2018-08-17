<template>
    <div>
        <Card>
            <div class="box-head">
                <div class="head-search">
                    <Row>
                        <Col span="22">
                        <Form :model="listQuery" label-position="right">
                            <Row>
                                <Col span="5">
                                <FormItem label="试题内容" :label-width="60">
                                    <Input @on-enter="fetchData" v-model="listQuery.Stem"></Input>
                                </FormItem>
                                </Col>
                                <Col span="4">
                                </Col>
                                <Col span="6">
                                <FormItem label="试题难度" :label-width="80">
                                    <Select @on-change="handleDegreeSearch" v-model="listQuery.Degree" style="width:110px">
                                        <Option v-for="item in SubjectTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10">
                                <FormItem label="试题类型" :label-width="90">
                                    <RadioGroup @on-change="fetchData" v-model="listQuery.SubjectType">
                                        <Radio label="-1">全部</Radio>
                                        <Radio label="0">模拟试题</Radio>
                                        <Radio label="1">正式试题</Radio>
                                    </RadioGroup>
                                </FormItem>
                                </Col>
                                <Col span="2">
                                <Button type="primary" icon="ios-search" @click="fetchData">搜索</Button>
                                </Col>
                            </Row>
                        </Form>
                        </Col>
                        <Col span="2" class="ft-cs">
                        <div>
                            <Dropdown>
                                <a href="javascript:void(0)">
                                    高级搜索
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu style="width:300px;" slot="list">
                                    <Form style="margin:20px" :model="formItem" :label-width="60">
                                        <FormItem label="试题分类">
                                            <Select @on-change="fetchData" v-model="listQuery.LoreType" style="width:200px">
                                                <Option v-for="item in LoreTypeSearchList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="关联业务">
                                            <Select @on-change="fetchData" v-model="listQuery.AboutBll" style="width:200px">
                                                <Option v-for="item in AboutBllSearchList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
                                            </Select>
                                        </FormItem>
                                        <Button type="primary" icon="ios-search" @click="fetchData">搜索</Button>
                                    </Form>
                                </DropdownMenu>
                            </Dropdown>
                            <!-- <a href="javascript:void(0)" class="fl-r margin-right-6">
                                高级搜索
                                <Icon type="arrow-down-b"></Icon>
                            </a> -->
                        </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="box-content">
                <div class="tab-content">
                    <Table @on-selection-change="handleRowChange" size="small" :loading="loading" highlight-row border :columns="columns" :data="data"
                        ref="table" ></Table>
                </div>
            </div>
            <div ref="bmpage" class="box-bottom">
                <div class="page">
                    <Page :total="total" placement="top" @on-change="changePage" @on-page-size-change="onpagesizechange" size="small" show-total
                        show-elevator show-sizer></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import {
        GetList
    } from '@/api/subject';
    import util from '@/libs/util';
    export default {
        name: 'subjectcmpts',
        props: {
    
        },
        data () {
            return {
                loading: true, // 表格加载状态
                EditModeloading: true, // 编辑窗口确定按钮加载状态
                chekcData: [], // 表格选中项
                total: null, // 表格数据总条数
                formItem: {}, // 表单数据源
                listQuery: { // 查询条件
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    AboutBll: -1,
                    LoreType: '-1',
                    SubjectType: -1,
                    debarIds: '',
                    action: 'getsubjectlist',
                    Stem: '',
                    SubjecSubClass: '',
                    Degree: ''
                },
                sCSearchList: util.sCSearchList, // 题型查询集合
                SubjectTypeList: util.SubjectTypeList, // 试题分类集合
                AboutBllSearchList: [],
                LoreTypeSearchList: [],
                columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '试题类型',
                    width: 105,
                    sortable: true,
                    key: 'SubjectType',
                    render: (h, params) => {
                        let sc = params.row.SubjectType;
                        let v = util.getSubjectModeName(sc);
                        return v;
                    }
                },
                {
                    title: '题型',
                    width: 78,
                    sortable: true,
                    key: 'SubjecSubClass',
                    render: (h, params) => {
                        let sc = params.row.SubjecSubClass;
                        let v = util.getSubjectTypeName(sc);
                        return v;
                    }
                }, {
                    title: '题目内容',
                    width: 260,
                    sortable: true,
                    key: 'Stem'
                }, {
                    title: '难度',
                    sortable: true,
                    width: 78,
                    key: 'Degree',
                    render: (h, params) => {
                        let sc = params.row.Degree;
                        let v = util.getSubjectDegree(sc);
                        return v;
                    }
                }, {
                    title: '关联业务',
                    sortable: true,
                    key: 'AboutBll',
                    render: (h, params) => {
                        let sc = params.row.AboutBll;
                        return util.GetItemValue(this, '100002', sc);
                    }
                }, {
                    title: '创建时间',
                    sortable: true,
                    width: 135,
                    key: 'InsertTime',
                    render: (h, params) => {
                        let it = params.row.InsertTime;
                        it = it.substring(it, it.length - 3);
                        return it;
                    }
                }
                ],
                data: []
            };
        },
        // 在模板渲染成html后调用,对html操作
        mounted () {
            this.init();
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
                // 下拉数据源赋值
                util.GetItemList('100002', '', true).then(lt => {
                    this.AboutBllSearchList = lt;
                    return util.GetItemList('100003', '', true);
                }).then(dt3 => {
                    this.LoreTypeSearchList = dt3;
                    return util.GetItemList('100003', '', false);
                });
                this.$nextTick(() => {});
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
            // 重置数据
            clearData () {
                this.listQuery = this.$options.data().listQuery;
            },
            // 监听选中项
            handleRowChange (option) {
                this.chekcData = option;
            },
            // 难度下拉框查询
            handleDegreeSearch () {
                this.fetchData();
            }
        }
    };
</script>