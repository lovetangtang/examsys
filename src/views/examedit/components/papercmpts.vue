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
                                <FormItem label="试卷名称" :label-width="60">
                                    <Input @on-enter="fetchData" v-model="listQuery.Stem"></Input>
                                </FormItem>
                                </Col>
                                <Col span="4">
                                <FormItem label="试卷分类" :label-width="70">
                                    <Select @on-change="fetchData" v-model="listQuery.PaperType" style="width:110px">
                                        <Option v-for="item in PaperTypeList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="11">
                                <FormItem label="试卷类型" :label-width="120">
                                    <RadioGroup @on-change="fetchData" v-model="listQuery.PaperMode">
                                        <Radio label="-1">全部</Radio>
                                        <Radio label="0">模拟试卷</Radio>
                                        <Radio label="1">正式试卷</Radio>
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
                                <DropdownMenu style="width:640px;" slot="list">
                                    <Form style="margin:20px" :model="formItem" :label-width="100">
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
                    <Table @on-current-change="handleRowChange" size="small" :loading="loading" highlight-row border :columns="columns" :data="data"
                        ref="table" :height="tableHeight"></Table>
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
    } from '@/api/paper';
    import util from '@/libs/util';
    export default {
        name: 'papercmpts',
        data () {
            return {
                loading: true, // 表格加载状态
                tableHeight: 450, // 表格高度
                chekcData: [], // 表格选中项
                PaperTypeList: [], // 试卷分类集合
                total: null, // 表格数据总条数
                formItem: {}, // 表单数据源
                listQuery: { // 查询条件
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    PaperType: -1,
                    PaperMode: -1,
                    Status: -1,
                    action: 'getpapelist',
                    PaperName: ''
                },
                columns: [{
                    title: '试卷名称',
                    sortable: true,
                    width: 155,
                    key: 'PaperName'
                }, {
                    title: '试卷分类',
                    key: 'PaperType',
                    render: (h, params) => {
                        let sc = params.row.PaperType;
                        return util.GetItemValue(this, '100001', sc);
                    }
                }, {
                    title: '试卷类型',
                    sortable: true,
                    width: 110,
                    key: 'PaperMode',
                    render: (h, params) => {
                        let sc = params.row.PaperMode;
                        let v = util.getPaperModeName(parseInt(sc));
                        return v;
                    }
                }, {
                    title: '组卷方式',
                    sortable: true,
                    width: 110,
                    key: 'AssemblyType',
                    render: (h, params) => {
                        let sc = params.row.AssemblyType;
                        let v = util.getAssemblyType(sc);
                        return v;
                    }
                }, {
                    title: '总分',
                    sortable: true,
                    key: 'TotalScore'
                }, {
                    title: '创建人',
                    sortable: true,
                    width: 90,
                    key: 'InsertID'
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
                // 下拉数据源赋值
                util.GetItemList('100001', '', true).then(dt => {
                    this.PaperTypeList = dt;
                });
                // 设置表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 185;
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
            scrollHeightResize () {
                if (this.$refs.table && this.$refs.table.$el) {
                    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
                }
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
            },
            // 重置数据
            clearData () {
                this.listQuery = this.$options.data().listQuery;
            },
            // 取消
            handlecancel () {}
        }
    };
</script>