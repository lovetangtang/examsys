<style lang="less">
    @import '../../styles/common.less';
    @import "./syslog.less";
</style>
<style lang="less" scoped>
    .split-pane-con {
        width: 100%;
        height: 89vh;
    }

    .custom-trigger {
        position: absolute;
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        top: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 50%;
        box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, .1), 2px 2px 10px 2px rgba(0, 0, 0, .2) inset;
        border: 1px solid #c3c3c3;
        cursor: pointer;
    }

    .introduce-left-con h4 {
        margin-bottom: 20px;
    }

    .introduce-left-con h5 {
        margin-bottom: 10px;
        margin-left: 20px;
    }

    .split-pane-right-con {
        padding: 30px;
    }

    .split-pane-right-con p {
        font-size: 26px;
        font-weight: 700;
        color: white;
    }
</style>
<template>
    <div>
        <Card :padding="0">
            <div class="head-btn" style="margin-top:20px;margin-left:20px;margin-bottom:10px">
                <div class="box-head">
                    <div class="head-search">
                        <Row>
                            <Col span="22">
                            <Form :model="listQuery" label-position="right">
                                <Row :gutter="10">
                                    <Col span="8">
                                    <FormItem label="关键字" :label-width="60">
                                        <Input @on-enter="fetchData" placeholder="请输入用户工号或姓名" v-model="listQuery.keyvalue"></Input>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="业务类型" :label-width="60">
                                        <RadioGroup @on-change="fetchData" v-model="listQuery.SVC_BLLTYPE">
                                            <Radio label="-1">全部</Radio>
                                            <Radio label="sys">后端</Radio>
                                            <Radio label="front">答题端</Radio>
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
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="split-pane-con border-topline">
                <split-pane :style="{height: '100%'}" left :min="20" max="100px" direction="horizontal" v-model="triggerOffset">
                    <div slot="left" style=" height: 100%;">
                        <div class="box-content">
                            <div class="tab-content">
                                <Table @on-current-change="handeclickrow" size="small" :loading="loading" highlight-row border :columns="columns" :data="data"
                                    ref="table" :height="tableHeight"></Table>
                            </div>
                        </div>
                        <div ref="bmpage" class="box-bottom">
                            <div class="page">
                                <Page :total="total" placement="top" @on-change="changePage" @on-page-size-change="onpagesizechange" size="small" show-total
                                    show-elevator show-sizer></Page>
                            </div>
                        </div>
                    </div>
                    <div class="split-pane-right-con" slot="right" style="" >
                        <div style="white-space: pre;max-height:500px;word-wrap:break-word;word-break:break-all" class="logcontent-box"> {{logcontent}}</div>
                    </div>
                </split-pane>
            </div>
        </Card>
    </div>
</template>
<script>
    import {
        GetList
    } from '@/api/syslog';
    import splitPane from '../my-components/split-pane/split-pane/split-pane';
    import papersubject from '../examedit/components/papersubject';
    export default {
        name: 'exam_paper',
        components: {
            papersubject,
            splitPane
        },
        data () {
            return {
                triggerOffset: 65,
                loading: true, // 表格加载状态
                tableHeight: 450, // 表格高度
                total: null, // 表格数据总条数
                formItem: {}, // 表单数据源
                logcontent: '',
                listQuery: { // 查询条件
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    ItemType: '',
                    SVC_BLLTYPE: '-1',
                    keyvalue: '',
                    action: 'getsyslog'
                },
                columns: [{
                    title: '用户工号',
                    width: 85,
                    key: 'I_ID_USER'
                }, {
                    title: '用户姓名',
                    width: 85,
                    key: 'NVC_NAME'
                }, {
                    title: '操作内容',
                    key: 'NVC_TEXT'
                },
                {
                    title: '操作时间',
                    key: 'DT_DATE',
                    width: 135,
                    render: (h, params) => {
                        let it = params.row.DT_DATE;
                        it = it.substring(it, it.length - 3);
                        return it;
                    }
                },
                {
                    title: '操作模块',
                    key: 'VC_PAGE'
                },
                {
                    title: '操作行为',
                    width: 85,
                    key: 'VC_ACTION'
                }, {
                    title: '业务类型',
                    key: 'SVC_BLLTYPE',
                    width: 85,
                    render: (h, params) => {
                        let it = params.row.SVC_BLLTYPE;
                        let val = it === 'sys' ? '后端' : '答题端';
                        return val;
                    }
                }
                ],
                data: [],
                datatype: []
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
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
                this.$nextTick(() => {});
            },
            // 刷新数据
            fetchData () {
                try {
                    this.loading = true;
                    GetList(this.listQuery).then(response => {
                        this.data = response.data;
                        console.log(this.data);
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
                console.log(val);
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
            handeclickrow (now, old) {
                let str = now.NVC_TEXT;
                // str = str.replace(/\r\n/g, '<br>');
                this.logcontent = str;
            }
        }
    };
</script>