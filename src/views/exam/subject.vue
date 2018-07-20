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
                    <Button type="warning" @click="handleDelSubject" icon="android-delete">删除试题</Button>
                    <Modal :loading="true" @on-cancel="handlecancel" ok-text="保存" v-model="subjectmodal" :styles="{top: '20px'}" width="900"
                        @on-ok="handleSaveSubject">
                        <div class="model-subject">
                            <div class="subject-head">
                                <Row :gutter="5">
                                    <Col span="12">
                                    <Form :model="formItem" :label-width="80">
                                        <FormItem label="试题类型：">
                                            <RadioGroup v-model="subjectComSaveList.SubjectType">
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
                                    <Select size="small" v-model="subjectComSaveList.DegreeMode" style="width:110px">
                                        <Option v-for="item in DegreeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    </Col>
                                    <Col span="6">
                                    <label for="">试题题型：</label>
                                    <Select @on-change="onsbclasschange" size="small" v-model="subjectComSaveList.SubjectClassMode" style="width:110px">
                                        <Option v-for="item in SubjectClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    </Col>
                                    <Col span="6">
                                    <label for="">知识分类：</label>
                                    <Input size="small" v-model="subjectComSaveList.LoreType" placeholder="如生活、天文、地理。" style="width:110px"></Input>
                                    </Col>
                                    <Col span="6">
                                    <label for="">关联业务：</label>
                                    <Select size="small" v-model="subjectComSaveList.AboutBllMode" style="width:110px">
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
                                            <Input v-model="SubjectParam.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>默认分值</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <InputNumber v-model="SubjectParam.DefaultScore"></InputNumber>
                                        </div>
                                    </div>
                                    <div v-for="ia in CdeAnswerList" class="margin-top-10">
                                        <div>
                                            <span>{{ia.lable}}</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input :ref="ia.val" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                                            <span>题干</span>
                                            <span>这里填写题目描述</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>选项 单/多选题的选项范围从 2 到 8 </span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <RadioGroup class="width96-input" vertical v-model="SubjectParam.RightAnswer">
                                                <template v-for="sv in selectOptionList">
                                                    <Radio class="margin-top-10" :label="sv.lable">
                                                        <Input :ref="sv.val" :name="sv.val"></Input>
                                                    </Radio>
                                                </template>
                                            </RadioGroup>
                                        </div>
                                        <div class="margin-top-10">
                                            <Button @click="handleAddSelectOption" type="info">添加一个选项</Button>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                                            <Input v-model="SubjectParam.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                                            <Input v-model="SubjectParam.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                                            <Input v-model="SubjectParam.Stem" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>答案</span>
                                            <span>这里填写答案</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.RightAnswer" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                                        </div>
                                    </div>
                                    <div class="margin-top-10">
                                        <div>
                                            <span>解析</span>
                                            <span>这里填写该问题对应的答案解释</span>
                                        </div>
                                        <div class="margin-top-4 width96-input">
                                            <Input v-model="SubjectParam.Analysis" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
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
                        <Form :model="listQuery" label-position="right">
                            <Row>
                                <Col span="5">
                                <FormItem label="试题内容" :label-width="60">
                                    <Input @on-enter="fetchData" v-model="listQuery.Stem"></Input>
                                </FormItem>
                                </Col>
                                <Col span="5">
                                <FormItem label="试题题型" :label-width="80">
                                    <Select @on-change="handleTypeSearch" v-model="listQuery.SubjecSubClass" style="width:110px">
                                        <Option v-for="item in sCSearchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="5">
                                <FormItem label="试题难度" :label-width="80">
                                    <Select @on-change="handleDegreeSearch" v-model="listQuery.Degree" style="width:110px">
                                        <Option v-for="item in SubjectTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="5">
                                <Button type="primary" icon="ios-search" @click="fetchData">搜索</Button>
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
                    <Table @on-selection-change="handleRowChange" size="small" :loading="loading" highlight-row border :columns="columns" :data="data"
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
        GetList,
        SaveSubjectList,
        DelSubjectList
    } from '@/api/subject';
    import util from '@/libs/util';
    export default {
        name: 'exam',
        components: {},
        data () {
            return {
                loading: true, // 表格加载状态
                tableHeight: 450, // 表格高度
                chekcData: [],
                subjectmodal: false, // 题库窗口打开状态
                Modeloading: true,
                total: null, // 表格数据总条数
                subjectComSaveList: { // 编辑录入后台的通用参数
                    SubjectClassMode: 11, // 题型下拉框绑定值
                    SubjectType: 0, // 试题分类绑定值
                    LoreType: '', // 知识分类绑定值
                    AboutBllMode: 'GN', // 关联业务下拉框绑定值
                    action: 'save',
                    DegreeMode: 0 // 试题难度下拉框绑定值
                },
                formItem: {}, // 表单数据源
                showStauts: { // 题型内容显示状态
                    iinShow: 'none', // 问答题型
                    oneSeShow: 'block', // 单选题型
                    moreSeShow: 'none', // 多选题型
                    judShow: 'none', // 填空题型
                    filShow: 'none' // 判断题型
                },
                CdeAnswerList: [{ // 候选答案组件，支持动态添加
                    lable: '候选答案1',
                    val: 'CdeAnswer1'
                }],
                selectOptionList: [ // 选项参数，支持动态添加
                    {
                        lable: '1',
                        val: 'selval1'
                    },
                    {
                        lable: '2',
                        val: 'selval2'
                    },
                    {
                        lable: '3',
                        val: 'selval3'
                    }, {
                        lable: '4',
                        val: 'selval4'
                    }
                ],
                CdeAnswerParam: { // 候选答案后台录入参数
                    CdeAnswer1: '', // 候选答案1
                    CdeAnswer2: '', // 候选答案2
                    CdeAnswer3: '', // 候选答案3
                    CdeAnswer4: '', // 候选答案4
                    CdeAnswer5: '', // 候选答案5
                    CdeAnswer6: '', // 候选答案6
                    CdeAnswer7: '', // 候选答案7
                    CdeAnswer8: '', // 候选答案8
                    CdeAnswer9: '', // 候选答案9
                    CdeAnswer10: '' // 候选答案10
                },
                SubjectParam: { // 试题录入后台的参数
                    Stem: '', // 题干
                    SelectionOption: '', // 单选
                    DefaultScore: 0, // 默认分值
                    RightAnswer: '', // 正确答案
                    Analysis: '' // 答案解析
                },
                listQuery: { // 查询条件
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    action: 'getsubjectlist',
                    Stem: '',
                    SubjecSubClass: '',
                    Degree: ''
                },
                DegreeList: util.DegreeList, // 难度集合
                SubjectClassList: util.SubjectClassList, // 题型集合
                sCSearchList: util.sCSearchList, // 题型查询集合
                SubjectTypeList: util.SubjectTypeList, // 试题分类集合
                AboutBllList: util.AboutBllList, // 关联业务集合
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
                    title: '创建人',
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
                                        this.showEdit(params);
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
                                        this.remove(params);
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
                let data = params.row;
                let subjectComSaveList = { // 编辑录入后台的通用参数
                    SubjectClassMode: data.SubjecSubClass, // 题型下拉框绑定值
                    SubjectType: data.SubjectType, // 试题分类绑定值
                    LoreType: data.LoreType, // 知识分类绑定值
                    AboutBllMode: data.AboutBll, // 关联业务下拉框绑定值
                    action: 'save',
                    KeyID: data.KeyID,
                    DegreeMode: data.Degree // 试题难度下拉框绑定值
                };
                let CdeAnswerList = [{ // 候选答案组件，支持动态添加
                    lable: '候选答案1',
                    val: 'CdeAnswer1'
                }];

                let CdeAnswerParam = { // 候选答案后台录入参数
                    CdeAnswer1: data.CdeAnswer1, // 候选答案1
                    CdeAnswer2: data.CdeAnswer2, // 候选答案2
                    CdeAnswer3: data.CdeAnswer3, // 候选答案3
                    CdeAnswer4: data.CdeAnswer4, // 候选答案4
                    CdeAnswer5: data.CdeAnswer5, // 候选答案5
                    CdeAnswer6: data.CdeAnswer6, // 候选答案6
                    CdeAnswer7: data.CdeAnswer7, // 候选答案7
                    CdeAnswer8: data.CdeAnswer8, // 候选答案8
                    CdeAnswer9: data.CdeAnswer9, // 候选答案9
                    CdeAnswer10: data.CdeAnswer10 // 候选答案10
                };
                if (data.SubjecSubClass === 11 || data.SubjecSubClass === 12) {
                    let selectOptionList = [];
                    let arryEditSelop = data.SelectionOption;
                    arryEditSelop = arryEditSelop.split('|');
                    for (let i = 0; i < arryEditSelop.length; i++) {
                        let json = {
                            lable: (i + 1),
                            val: 'selval' + (i + 1)
                        };
                        selectOptionList.push(json);
                    }
                    this.selectOptionList = selectOptionList;
                }

                if (data.SubjecSubClass === 40) {
                    if (data.CdeAnswer2 !== null && data.CdeAnswer2 !== '') {
                        let cdeJson = {
                            lable: '候选答案2',
                            val: 'CdeAnswer2'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                    if (data.CdeAnswer3 !== null && data.CdeAnswer3 !== '') {
                        let cdeJson = {
                            lable: '候选答案3',
                            val: 'CdeAnswer3'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                    if (data.CdeAnswer4 !== null && data.CdeAnswer4 !== '') {
                        let cdeJson = {
                            lable: '候选答案4',
                            val: 'CdeAnswer4'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                    if (data.CdeAnswer5 !== null && data.CdeAnswer5 !== '') {
                        let cdeJson = {
                            lable: '候选答案5',
                            val: 'CdeAnswer5'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                    if (data.CdeAnswer6 !== null && data.CdeAnswer6 !== '') {
                        let cdeJson = {
                            lable: '候选答案6',
                            val: 'CdeAnswer6'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                    if (data.CdeAnswer7 !== null && data.CdeAnswer7 !== '') {
                        let cdeJson = {
                            lable: '候选答案7',
                            val: 'CdeAnswer7'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                    if (data.CdeAnswer8 !== null && data.CdeAnswer8 !== '') {
                        let cdeJson = {
                            lable: '候选答案8',
                            val: 'CdeAnswer8'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                    if (data.CdeAnswer9 !== null && data.CdeAnswer9 !== '') {
                        let cdeJson = {
                            lable: '候选答案9',
                            val: 'CdeAnswer9'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                    if (data.CdeAnswer10 !== null && data.CdeAnswer10 !== '') {
                        let cdeJson = {
                            lable: '候选答案10',
                            val: 'CdeAnswer10'
                        };
                        CdeAnswerList.push(cdeJson);
                    }
                }
                let SubjectParam = { // 试题录入后台的参数
                    Stem: data.Stem, // 题干
                    DefaultScore: data.DefaultScore, // 默认分值
                    RightAnswer: data.RightAnswer, // 正确答案
                    Analysis: data.Analysis // 答案解析
                };
                this.subjectComSaveList = subjectComSaveList;
                this.CdeAnswerList = CdeAnswerList;
                this.CdeAnswerParam = CdeAnswerParam;
                this.SubjectParam = SubjectParam;
                this.subjectmodal = true;
                setTimeout(() => {
                    if (data.SubjecSubClass === 40) {
                        if (data.CdeAnswer1 !== null && data.CdeAnswer1 !== '') {
                            this.$refs['CdeAnswer1'][0].$el.firstChild.value = data.CdeAnswer1;
                        }
                        if (data.CdeAnswer2 !== null && data.CdeAnswer2 !== '') {
                            this.$refs['CdeAnswer2'][0].$el.firstChild.value = data.CdeAnswer2;
                        }
                        if (data.CdeAnswer3 !== null && data.CdeAnswer3 !== '') {
                            this.$refs['CdeAnswer3'][0].$el.firstChild.value = data.CdeAnswer3;
                        }
                        if (data.CdeAnswer4 !== null && data.CdeAnswer4 !== '') {
                            this.$refs['CdeAnswer4'][0].$el.firstChild.value = data.CdeAnswer4;
                        }
                        if (data.CdeAnswer5 !== null && data.CdeAnswer5 !== '') {
                            this.$refs['CdeAnswer5'][0].$el.firstChild.value = data.CdeAnswer5;
                        }
                        if (data.CdeAnswer6 !== null && data.CdeAnswer6 !== '') {
                            this.$refs['CdeAnswer6'][0].$el.firstChild.value = data.CdeAnswer6;
                        }
                        if (data.CdeAnswer7 !== null && data.CdeAnswer7 !== '') {
                            this.$refs['CdeAnswer7'][0].$el.firstChild.value = data.CdeAnswer7;
                        }
                        if (data.CdeAnswer8 !== null && data.CdeAnswer8 !== '') {
                            this.$refs['CdeAnswer8'][0].$el.firstChild.value = data.CdeAnswer8;
                        }
                        if (data.CdeAnswer9 !== null && data.CdeAnswer9 !== '') {
                            this.$refs['CdeAnswer9'][0].$el.firstChild.value = data.CdeAnswer9;
                        }
                        if (data.CdeAnswer10 !== null && data.CdeAnswer10 !== '') {
                            this.$refs['CdeAnswer10'][0].$el.firstChild.value = data.CdeAnswer10;
                        }
                    }
                    if (data.SubjecSubClass === 11 || data.SubjecSubClass === 12) {
                        let arryEditSelop = data.SelectionOption;
                        arryEditSelop = arryEditSelop.split('|');
                        for (let i = 0; i < arryEditSelop.length; i++) {
                            let selName = 'selval' + (i + 1);
                            this.$refs[selName][0].$el.children[1].value = arryEditSelop[i];
                        }
                    }
                }, 1000);
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
            // 删除题库的公告方法
            delSubject (keyids) {
                DelSubjectList(keyids).then(response => {
                    this.fetchData();
                    this.$Notice.success({
                        title: response.msg,
                        desc: '',
                        duration: 2
                    });
                });
            },
            // 编辑题目监听题型变化,设置对应的题库录入组件
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
            // 监听选中项
            handleRowChange (option) {
                this.chekcData = option;
            },
            // 删除题目
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
            // 保存题目
            handleSaveSubject () {
                // 问答题等题型才有候选答案
                if (this.subjectComSaveList.SubjectClassMode === 40) {
                    for (let i = 0; i < this.CdeAnswerList.length; i++) {
                        let cdName = 'CdeAnswer' + (i + 1);
                        let cdAnsVal = this.$refs[cdName][0].$el.firstChild.value;
                        switch (i + 1) {
                            case 1:
                                this.CdeAnswerParam.CdeAnswer1 = cdAnsVal;
                                break;
                            case 2:
                                this.CdeAnswerParam.CdeAnswer2 = cdAnsVal;
                                break;
                            case 3:
                                this.CdeAnswerParam.CdeAnswer3 = cdAnsVal;
                                break;
                            case 4:
                                this.CdeAnswerParam.CdeAnswer4 = cdAnsVal;
                                break;
                            case 5:
                                this.CdeAnswerParam.CdeAnswer5 = cdAnsVal;
                                break;
                            case 6:
                                this.CdeAnswerParam.CdeAnswer6 = cdAnsVal;
                                break;
                            case 7:
                                this.CdeAnswerParam.CdeAnswer7 = cdAnsVal;
                                break;
                            case 8:
                                this.CdeAnswerParam.CdeAnswer8 = cdAnsVal;
                                break;
                            case 9:
                                this.CdeAnswerParam.CdeAnswer9 = cdAnsVal;
                                break;
                            case 10:
                                this.CdeAnswerParam.CdeAnswer10 = cdAnsVal;
                                break;
                            default:
                                break;
                        }
                    }
                }

                // 单选题参数
                console.log(this.selectOptionList);
                let arrySelOpt = [];
                if (this.subjectComSaveList.SubjectClassMode === 11 || this.subjectComSaveList.SubjectClassMode === 12) {
                    for (let i = 0; i < this.selectOptionList.length; i++) {
                        let selName = 'selval' + (i + 1);
                        let selVal = this.$refs[selName][0].$el.children[1].value;
                        arrySelOpt.push(selVal);
                    }
                }
                arrySelOpt = arrySelOpt.filter(item => item);
    
                this.subjectComSaveList.SelectionOption = arrySelOpt.join('|');

                // 参数
                let subjectList = Object.assign({}, this.subjectComSaveList, this.CdeAnswerParam, this.SubjectParam);
    
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定要保存吗？',
                    okText: '确定',
                    loading: true,
                    cancelText: '取消',
                    onOk: () => {
                        SaveSubjectList(subjectList).then(response => {
                            this.$Modal.remove();
                            this.subjectmodal = false;
                            this.fetchData();
                            this.handlecancel();
                            this.$Notice.success({
                                title: response.msg,
                                desc: '',
                                duration: 2
                            });
                        });
                    },
                    onCancel: () => {}
                });
            },
            // 窗口取消监听事件 ,重置题库变量
            handlecancel () {
                let subjectComSaveList = { // 编辑录入后台的通用参数
                    SubjectClassMode: 11, // 题型下拉框绑定值
                    SubjectType: 0, // 试题分类绑定值
                    LoreType: '', // 知识分类绑定值
                    AboutBllMode: 'GN', // 关联业务下拉框绑定值
                    action: 'save',
                    DegreeMode: 0 // 试题难度下拉框绑定值
                };
                let CdeAnswerList = [{ // 候选答案组件，支持动态添加
                    lable: '候选答案1',
                    val: 'CdeAnswer1'
                }];
                let CdeAnswerParam = { // 候选答案后台录入参数
                    CdeAnswer1: '', // 候选答案1
                    CdeAnswer2: '', // 候选答案2
                    CdeAnswer3: '', // 候选答案3
                    CdeAnswer4: '', // 候选答案4
                    CdeAnswer5: '', // 候选答案5
                    CdeAnswer6: '', // 候选答案6
                    CdeAnswer7: '', // 候选答案7
                    CdeAnswer8: '', // 候选答案8
                    CdeAnswer9: '', // 候选答案9
                    CdeAnswer10: '' // 候选答案10
                };
                let SubjectParam = { // 试题录入后台的参数
                    Stem: '', // 题干
                    DefaultScore: 0, // 默认分值
                    RightAnswer: '', // 正确答案
                    Analysis: '' // 答案解析
                };
                let selectOptionList = [ // 选项参数，支持动态添加
                    {
                        lable: '1',
                        val: 'selval1'
                    },
                    {
                        lable: '2',
                        val: 'selval2'
                    },
                    {
                        lable: '3',
                        val: 'selval3'
                    }, {
                        lable: '4',
                        val: 'selval4'
                    }
                ];
                this.selectOptionList = selectOptionList;
                this.subjectComSaveList = subjectComSaveList;
                this.CdeAnswerList = CdeAnswerList;
                this.CdeAnswerParam = CdeAnswerParam;
                this.SubjectParam = SubjectParam;
                this.$refs['CdeAnswer1'][0].$el.firstChild.value = '';
                this.$refs['selval1'][0].$el.children[1].value = '';
                this.$refs['selval2'][0].$el.children[1].value = '';
                this.$refs['selval3'][0].$el.children[1].value = '';
                this.$refs['selval4'][0].$el.children[1].value = '';
            },
            // 题型下拉框查询
            handleTypeSearch (v) {
                this.fetchData();
            },
            // 难度下拉框查询
            handleDegreeSearch () {
                this.fetchData();
            },
            // 添加候选答案
            handleAddCde () {
                let cdeAnsarr = this.CdeAnswerList;
                if (cdeAnsarr.length >= 10) {
                    return;
                };
                let nowi = cdeAnsarr.length - 1;
                let maxi = cdeAnsarr[nowi].lable;
                let maxv = parseInt(maxi.substring(maxi.length - 1, maxi.length));
                let maxName = '候选答案' + (maxv + 1);
                let cdeArrAddJson = {
                    'lable': maxName,
                    'val': 'CdeAnswer' + (maxv + 1)
                };
                cdeAnsarr.push(cdeArrAddJson);
                this.CdeAnswerList = cdeAnsarr;
                // console.log(this.$refs['CdeAnswer2'][0].$el.firstChild.value);
            },
            // 添加选项
            handleAddSelectOption () {
                let selOptArr = this.selectOptionList;
                if (selOptArr.length >= 8) {
                    return;
                };
                let nowi = selOptArr.length - 1;
                let maxi = selOptArr[nowi].lable;
                let maxv = parseInt(maxi);
                let maxName = (maxv + 1);
                let selOptJson = {
                    'lable': maxName,
                    'val': 'selval' + (maxv + 1)
                };
                selOptArr.push(selOptJson);
                this.selectOptionList = selOptArr;
                // console.log(this.$refs.selval2[0].$el.children[1]);
            }
        }
    };
</script>