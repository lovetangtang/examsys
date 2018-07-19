<style lang="less">
    @import '../../styles/common.less';
    @import "./subject.less";
</style>
<template>
    <div>
        <Card>
            <div class="box-head">
                <div class="head-btn">
                    <Button @click="subjectmodal=true" type="primary" icon="android-add">手动录入</Button>
                    <Button @click="subjectmodal=true" type="primary" icon="android-add">批量录入</Button>
                    <Button type="warning" icon="android-delete">删除试题</Button>
                    <Modal v-model="subjectmodal" :styles="{top: '20px'}" width="900" @on-ok="handleSaveSubject">
                        <div class="model-subject">
                            <div class="subject-head">
                                <Row :gutter="5">
                                    <Col span="12">
                                    <Form :model="formItem" :label-width="80">
                                        <FormItem label="试题类型：">
                                            <RadioGroup v-model="subjectType">
                                                <Radio label="0">模拟试题</Radio>
                                                <Radio label="1">正式试题</Radio>
                                            </RadioGroup>
                                        </FormItem>
                                    </Form>
                                    </Col>
                                </Row>
                                <Row :gutter="5" class="sb-top1">
                                    <Col span="6">
                                    <label for="">试题难度：</label>
                                    <Select size="small" v-model="DegreeMode" style="width:110px">
                                        <Option v-for="item in DegreeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    </Col>
                                    <Col span="6">
                                    <label for="">试题题型：</label>
                                    <Select @on-change="onsbclasschange" size="small" v-model="SubjectClassMode" style="width:110px">
                                        <Option v-for="item in SubjectClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    </Col>
                                    <Col span="6">
                                    <label for="">知识分类：</label>
                                    <Select size="small" v-model="SubjectTypeMode" style="width:110px">
                                        <Option v-for="item in SubjectTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    </Col>
                                    <Col span="6">
                                    <label for="">关联业务：</label>
                                    <Select size="small" v-model="AboutBllMode" style="width:110px">
                                        <Option v-for="item in AboutBllList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    </Col>
                                </Row>
                            </div>
                            <div class="question-content">
                                <!-- 问答题 -->
                                <div v-bind:style="{ display:showStauts.iinShow}" class="">
                                    <div class="margin-top-10">
                                        <div>
                                            <span>题干</span>
                                            <span>这里填写题目描述</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>默认分值</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <InputNumber v-model="Interlocution.DefaultScore"></InputNumber>
                                        </div>
                                    </div>
                                    <div v-for="ia in Interlocution.CdeAnswerList" class="margin-top-10">
                                        <div>
                                            <span>{{ia.lable}}</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input :ref="ia.val" :name="ia.val" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <Button @click="handleAddCde" type="info">添加候选答案</Button>
                                    </div>
                                </div>
                                <!-- 单选 -->
                                <div v-bind:style="{ display:showStauts.oneSeShow}" class="">
                                    <div class="margin-top-10">
                                        <div>
                                            <span>题干单</span>
                                            <span>这里填写题目描述</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 多选 -->
                                <div v-bind:style="{ display:showStauts.moreSeShow}" class="">
                                    <div class="margin-top-10">
                                        <div>
                                            <span>题干</span>
                                            <span>这里填写题目描述</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 填空 -->
                                <div v-bind:style="{ display:showStauts.judShow}" class="">
                                    <div class="margin-top-10">
                                        <div>
                                            <span>题干</span>
                                            <span>这里填写题目描述</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 判断 -->
                                <div v-bind:style="{ display:showStauts.filShow}" class="">
                                    <div class="margin-top-10">
                                        <div>
                                            <span>题干</span>
                                            <span>这里填写题目描述</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
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
                                <FormItem label="试题题型" :label-width="80">
                                    <Select v-model="SubjectClassMode" style="width:110px">
                                        <Option v-for="item in SubjectClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="5">
                                <FormItem label="试题难度" :label-width="80">
                                    <Select v-model="DegreeMode" style="width:110px">
                                        <Option v-for="item in DegreeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
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
                    <Table size="small" :loading="loading" highlight-row border :columns="columns" :data="data" ref="table" :height="tableHeight"></Table>
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
        getList
    } from '@/api/subject';
    import util from '@/libs/util';
    export default {
        name: 'exam',
        components: {},
        data () {
            return {
                loading: true,
                tableHeight: 450,
                subjectmodal: false,
                SubjectClassMode: true,
                total: null,
                subjectType: 0,
                SubjectTypeMode: 1,
                AboutBllMode: 0,
                DegreeMode: '0',
                formItem: {},
                showStauts: {
                    iinShow: 'block',
                    oneSeShow: 'none',
                    moreSeShow: 'none',
                    judShow: 'none',
                    filShow: 'none'
                },
                Interlocution: {
                    Stem: '',
                    CdeAnswerList: [{
                        lable: '候选答案1',
                        val: 'CdeAnswer1'
                    }],
                    DefaultScore: 0,
                    RightAnswer: '',
                    Analysis: ''
                },
                listQuery: {
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    action: 'getsubjectlist',
                    keyword: '',
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    exportTime: '',
                    state: ''
                },
                DegreeList: [{
                    value: 0,
                    label: '简单'
                },
                {
                    value: 1,
                    label: '普通'
                },
                {
                    value: 2,
                    label: '困难'
                }
                ],
                SubjectClassList: [{
                    value: 11,
                    label: '单选题'
                },
                {
                    value: 12,
                    label: '多选题'
                },
                {
                    value: 20,
                    label: '判断题'
                },
                {
                    value: 30,
                    label: '填空题'
                },
                {
                    value: 40,
                    label: '问答题'
                }
                ],
                SubjectTypeList: [{
                    value: 0,
                    label: '简单'
                },
                {
                    value: 1,
                    label: '普通'
                },
                {
                    value: 2,
                    label: '困难'
                }
                ],
                AboutBllList: [{
                    value: 'GN',
                    label: '国内机票'
                }, {
                    value: 'GJ',
                    label: '国际机票'
                }, {
                    value: 'JD',
                    label: '酒店'
                }, {
                    value: 'LY',
                    label: '旅游'
                }, {
                    value: 'CL',
                    label: '差旅'
                }, {
                    value: 'RS',
                    label: '人事'
                }, {
                    value: 'XZ',
                    label: '行政'
                }, {
                    value: 'JS',
                    label: '技术'
                }, {
                    value: 'CW',
                    label: '财务'
                }],
                formSearch: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '试题分类',
                    width: 110,
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
                    width: '78',
                    sortable: true,
                    key: 'SubjecSubClass',
                    render: (h, params) => {
                        let sc = params.row.SubjecSubClass;
                        let v = util.getSubjectTypeName(sc);
                        return v;
                    }
                }, {
                    title: '题目内容',
                    width: '260',
                    sortable: true,
                    key: 'Stem'
                }, {
                    title: '难度',
                    sortable: true,
                    width: '78',
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
                        let v = util.getAboutBll(sc);
                        return v;
                    }
                }, {
                    title: '创建人工号',
                    sortable: true,
                    key: 'InsertID'
                }, {
                    title: '创建时间',
                    sortable: true,
                    width: '135',
                    key: 'InsertTime',
                    render: (h, params) => {
                        let it = params.row.InsertTime;
                        it = it.substring(it, it.length - 3);
                        return it;
                    }
                },
                {
                    title: '操作',
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
                                        this.showEdit(params.index);
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
                data: []
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
        created () {
            this.fetchData();
        },
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
                    this.loading = true;
                    getList(this.listQuery).then(response => {
                        this.data = response.data;
                        this.loading = false;
                        this.total = response.count;
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            scrollHeightResize () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
            },
            // 编辑题目监听题型变化
            onsbclasschange (v) {
                switch (v) {
                    case 11:
                        this.showStauts.oneSeShow = 'block';
                        this.showStauts.iinShow = 'none';
                        this.showStauts.moreSeShow = 'none';
                        this.showStauts.judShow = 'none';
                        this.showStauts.filShow = 'none';
                        break;
                    case 12:
                        this.showStauts.oneSeShow = 'none';
                        this.showStauts.iinShow = 'none';
                        this.showStauts.moreSeShow = 'block';
                        this.showStauts.judShow = 'none';
                        this.showStauts.filShow = 'none';
                        break;
                    case 20:
                        this.showStauts.oneSeShow = 'none';
                        this.showStauts.iinShow = 'none';
                        this.showStauts.moreSeShow = 'none';
                        this.showStauts.judShow = 'block';
                        this.showStauts.filShow = 'none';
                        break;
                    case 30:
                        this.showStauts.oneSeShow = 'none';
                        this.showStauts.iinShow = 'none';
                        this.showStauts.moreSeShow = 'none';
                        this.showStauts.judShow = 'none';
                        this.showStauts.filShow = 'block';
                        break;
                    case 40:
                        this.showStauts.oneSeShow = 'none';
                        this.showStauts.iinShow = 'block';
                        this.showStauts.moreSeShow = 'none';
                        this.showStauts.judShow = 'none';
                        this.showStauts.filShow = 'none';
                        break;
                    default:
                        break;
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
            // 编辑闭幕
            showEdit (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
                });
            },
            // 保存题目
            handleSaveSubject () {
                this.$Modal.remove();
                // this.Interlocution.CdeAnswerList = [{
                //     val: ''
                // },
                // {
                //     val: ''
                // }];
            },
            // 添加候选答案
            handleAddCde () {
                let cdeAnsarr = this.Interlocution.CdeAnswerList;
                if (cdeAnsarr.length >= 10) { return; };
                let nowi = cdeAnsarr.length - 1;
                let maxi = cdeAnsarr[nowi].lable;
                let maxv = parseInt(maxi.substring(maxi.length - 1, maxi.length));
                let maxName = '候选答案' + (maxv + 1);
                let cdeArrAddJson = {
                    'lable': maxName,
                    'val': 'CdeAnswer' + (maxv + 1)
                };
                cdeAnsarr.push(cdeArrAddJson);
                this.Interlocution.CdeAnswerList = cdeAnsarr;
                // console.log(this.$refs.CdeAnswer2[0].$el.firstChild.value);
            }, // 移除数据
            remove (index) {
                this.data.splice(index, 1);
            }
        }
    
    };
</script>