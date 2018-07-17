<style lang="less">
    @import '../../styles/common.less';
    @import "./subject.less";
</style>
<template>
    <div>
        <Card>
            <div class="box-head">
                <div class="head-btn">
                    <Button @click="subjectmodal=true" type="primary" icon="android-add">添加试题</Button>
                    <Button type="warning" icon="android-delete">删除试题</Button>
                    <Modal v-model="subjectmodal" width="900">
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
                                            <Input v-model="Interlocution.StemVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.rightVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.analysisVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
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
                                            <Input v-model="Interlocution.StemVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.rightVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.analysisVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                                            <Input v-model="Interlocution.StemVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.rightVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.analysisVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                                            <Input v-model="Interlocution.StemVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.rightVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.analysisVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                                            <Input v-model="Interlocution.StemVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.rightVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="Interlocution.analysisVal" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                    <Table highlight-row border :columns="columns1" :data="data1" ref="table" :height="tableHeight"></Table>
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
                subjectmodal: true,
                SubjectClassMode: true,
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
                    StemVal: '',
                    rightVal: '',
                    analysisVal: ''
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
                columns1: [{
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
            changePage () {},
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