<style lang="less">
    @import '../../styles/common.less';
    @import './examcreat.less';
</style>
<template>
    <div class="margin-top-30">
        <Steps :current="current">
            <Step @click.native="leapcurrent(0)" class="stepte" title="第一步：创建试卷"></Step>
            <Step @click.native="leapcurrent(1)" class="stepte" title="第二步：组卷方式"></Step>
            <Step @click.native="leapcurrent(2)" class="stepte" title="第三部：添加试卷"></Step>
            <Step @click.native="leapcurrent(3)" class="stepte" title="第四步：发布考试"></Step>
        </Steps>
        <!-- 第一步 -->
        <div :style="{ display:stepsStatus.one}">
            <RadioGroup @on-change="handleCtTypechange" style="width:100%" v-model="creatType" vertical>
                <Card class="card-usual">
                    <Radio label="0">
                        <span>创建新试卷</span>
                    </Radio>
                    <Form class="margin-top-10" v-bind:style="{ display:showStauts.one}" :model="formItem" :label-width="80">
                        <FormItem label="试卷名称">
                            <Input style="width:260px" v-model="examrqParam.PaperName" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="试卷分类">
                            <Select v-model="examrqParam.PaperType" style="width:110px">
                                <Option v-for="item in PaperTypeList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="试卷类型：">
                            <RadioGroup v-model="examrqParam.PaperMode">
                                <Radio label="0">模拟试卷</Radio>
                                <Radio label="1">正式试卷</Radio>
                            </RadioGroup>
                        </FormItem>
                        <div class="margin-top-10">
                            <Button style="width:200px" @click="next" type="primary">下一步</Button>
                        </div>
                    </Form>
                </Card>

                <Card class="card-usual">
                    <Radio label="1">
                        <span>从试卷库中选择一张试卷</span>
                    </Radio>
                    <div v-bind:style="{ display:showStauts.two}">
                        <Form class="margin-top-10" :model="formItem" :label-width="80">
                            <FormItem label="试卷类型：">
                                <RadioGroup v-model="examrqParam.PaperMode">
                                    <Radio label="0">模拟试卷</Radio>
                                    <Radio label="1">正式试卷</Radio>
                                </RadioGroup>
                            </FormItem>
                            <div class="margin-top-10">
                                <Button @click="handleSelectPaper" type="ghost">选择试卷</Button>
                            </div>
                        </Form>
                        <div class="margin-top-10">
                            <Button style="width:200px" @click="next" type="primary">下一步</Button>
                        </div>
                    </div>
                </Card>
            </RadioGroup>
        </div>
        <!-- 第二步 -->
        <div :style="{ display:stepsStatus.two}">
            <RadioGroup @on-change="handleCtTypechange" style="width:100%" v-model="creatType" vertical>
                <Card class="card-usual">
                    <Radio label="0">
                        <span>从试题库中选题</span>
                    </Radio>
                    <Form class="margin-top-10" v-bind:style="{ display:showStauts.one}" :model="formItem" :label-width="80">
                        <FormItem label="组卷方式">
                            <RadioGroup style="width:420px" verti v-model="examrqParam.AssemblyType">
                                <Tooltip placement="bottom">
                                    <Radio label="10">
                                        <span>选题组卷</span>
                                    </Radio>
                                    <div slot="content">
                                        <p>勾选想出的题生成一份试卷</p>
                                        <p>可以设置每个题目的答题顺序随机出现</p>
                                        <p>每个考生所答试卷内容一样</p>
                                    </div>
                                </Tooltip>
                                <Tooltip placement="bottom">
                                    <Radio label="20">
                                        <span>抽题组卷</span>
                                    </Radio>
                                    <div slot="content">
                                        <p>出题时只需指定题目大类和试题数量</p>
                                        <p>系统自动在题库中随机选择符合</p>
                                        <p>该大类和难度系数的题目生成试卷</p>
                                        <p>考生所答试卷内容一样</p>
                                    </div>
                                </Tooltip>
                                <Tooltip placement="bottom">
                                    <Radio label="30">
                                        <span>随机组卷</span>
                                    </Radio>
                                    <div slot="content">
                                        <p>出题时只需指定题目大类和试题数量</p>
                                        <p>系统自动在题库中随机选择符合</p>
                                        <p>该大类和难度系数的题目生成试卷</p>
                                        <p>每份试卷内容不一样</p>
                                    </div>
                                </Tooltip>
                                <Tooltip placement="bottom">
                                    <Radio label="40">
                                        <span>定向随机</span>
                                    </Radio>
                                    <div slot="content">
                                        <p>每个题目大类中由人工选定多个试题</p>
                                        <p>生成试卷时,根据每个题目大类设置的抽取数</p>
                                        <p>量随机生成试题。每个考生所答题目可能不</p>
                                        <p>一样</p>
                                    </div>
                                </Tooltip>
                            </RadioGroup>
                        </FormItem>
                        <div class="margin-top-10">
                            <Button style="width:200px" @click="next" type="primary">下一步</Button>
                        </div>
                    </Form>

                </Card>

                <Card class="card-usual">
                    <Radio label="1">
                        <span>手工录入试题</span>
                    </Radio>
                    <div v-bind:style="{ display:showStauts.two}">
                        <div class="margin-top-10">
                            <Button style="width:200px" @click="next" type="primary">下一步</Button>
                        </div>
                    </div>
                </Card>
            </RadioGroup>
        </div>
        <!-- 第三步 -->
        <div :style="{ display:stepsStatus.three}">
            <div class="margin-top-20">
                <Row :gutter="10">
                    <Col span="7">
                    <div class="threebox-left">
                        <Card class="threecard-left">
                            <p>总题数:0题</p>
                            <p class="margin-top-8">当前总分:0分</p>
                        </Card>
                    </div>
                    </Col>
                    <Col span="17">
                    <div class="threebox-right">
                        <div class="trebox-head tx-center">
                            <h1>{{examrqParam.PaperName}}</h1>
                            <div class="div_line margin-top-10"></div>
                        </div>
                        <div :style="{display:trboxStatus.show1}" class="trebox-content tx-center">
                            <div class="trebox-ct1">
                                <p>当前试卷内容为空，请点击下方添加新题型</p>
                                <Dropdown @on-click="handleTxMenu" class="margin-top-20">
                                    <Button type="ghost">
                                        添加试题
                                        <Icon type="arrow-down-b"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="11">单选题</DropdownItem>
                                        <DropdownItem name="12">多选题</DropdownItem>
                                        <DropdownItem name="20">判断题</DropdownItem>
                                        <DropdownItem name="30">填空题</DropdownItem>
                                        <DropdownItem name="40">问答题</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="div_line margin-top-10"></div>
                        </div>
                        <div :style="{display:trboxStatus.show2}" class="trebox-content">
                            <template v-for="tk in subjectTitleSel">
                                <div class="trebox-ct2">
                                    <div class="tre-title">
                                        <Row>
                                            <Col span="8">
                                            <Input size="small" placeholder="" style="width: 180px"></Input>
                                            </Col>
                                            <Col span="16">
                                            <span>每题</span>
                                            <InputNumber v-model="tk.Score" size="small" style="width: 70px;margin-left:6px"></InputNumber>
                                            <span style="margin-left:6px">分</span>
                                            <Checkbox v-model="tk.Disorder" style="margin-left:6px">试题乱序</Checkbox>
                                            <Checkbox v-model="tk.OptionOrder" v-if="tk.SubjecSubClass===11 ||tk.SubjecSubClass===12">选项乱序</Checkbox>
                                            <Icon class="cursor" type="help-circled"></Icon>
                                            <Checkbox style="margin-left:6px" v-model="tk.Isleak" v-if="tk.SubjecSubClass===30">选项乱序</Checkbox>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="tre-sel margin-top-10">
                                        <Button @click="handleSelSubject(tk.SubjecSubClass)" type="ghost">选择试题</Button>
                                    </div>
                                    <div class="tx-center">
                                        <h3>{{tk.SubjecSubClassName}}</h3>
                                    </div>

                                    <!-- 单选题 -->
                                    <template v-if="tk.SubjecSubClass===11">
                                        <template v-for="sb in examrqParam.SubjectData.danxList">
                                            <div class="tre-subject">
                                                <div class="tresbcont">
                                                    <Row class="tresbbox">
                                                        <Col span="19">
                                                        <div class="tresbleft">
                                                            <p>{{sb.Stem}}</p>
                                                            <template v-for="(se, index) in sb.SelectionOption">
                                                                <p class="margin-top-10 checkColor">{{Letter[index]}}.{{se}}</p>
                                                            </template>
                                                            <p class="margin-top-20">答案：{{sb.RightAnswer}}</p>
                                                            <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                        </div>
                                                        </Col>
                                                        <Col span="5">
                                                        <div class="tresbright">
                                                            <div>
                                                                <InputNumber v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="edit">编辑</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="trash-a">删除</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-up">上移</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-down">下移</Button>
                                                            </div>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </template>
                                    </template>

                                    <!-- 多选题 -->
                                    <template v-else-if="tk.SubjecSubClass===12">
                                        <template v-for="sb in examrqParam.SubjectData.duoxList">
                                            <div class="tre-subject">
                                                <div class="tresbcont">
                                                    <Row class="tresbbox">
                                                        <Col span="19">
                                                        <div class="tresbleft">
                                                            <p>{{sb.Stem}}</p>
                                                            <template v-for="(se, index) in sb.SelectionOption">
                                                                <p class="margin-top-10 checkColor">{{Letter[index]}}.{{se}}</p>
                                                            </template>
                                                            <p class="margin-top-20">答案：{{sb.RightAnswer}}</p>
                                                            <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                        </div>
                                                        </Col>
                                                        <Col span="5">
                                                        <div class="tresbright">
                                                            <div>
                                                                <InputNumber v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="edit">编辑</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="trash-a">删除</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-up">上移</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-down">下移</Button>
                                                            </div>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </template>
                                    </template>

                                    <!-- 判断题 -->
                                    <template v-else-if="tk.SubjecSubClass===20">
                                        <template v-for="sb in examrqParam.SubjectData.pdList">
                                            <div class="tre-subject">
                                                <div class="tresbcont">
                                                    <Row class="tresbbox">
                                                        <Col span="19">
                                                        <div class="tresbleft">
                                                            <p>{{sb.Stem}}</p>
                                                            <p class="margin-top-10 checkColor">
                                                                <Icon type="checkmark"></Icon> 正确</p>
                                                            <p class="margin-top-10">
                                                                <Icon type="close-round"></Icon> 错误</p>
                                                            <p class="margin-top-20">答案：{{sb.RightAnswer}}</p>
                                                            <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                        </div>
                                                        </Col>
                                                        <Col span="5">
                                                        <div class="tresbright">
                                                            <div>
                                                                <InputNumber v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="edit">编辑</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="trash-a">删除</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-up">上移</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-down">下移</Button>
                                                            </div>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </template>
                                    </template>

                                    <!-- 填空题 -->
                                    <template v-else-if="tk.SubjecSubClass===30">
                                        <template v-for="sb in examrqParam.SubjectData.tkList">
                                            <div class="tre-subject">
                                                <div class="tresbcont">
                                                    <Row class="tresbbox">
                                                        <Col span="19">
                                                        <div class="tresbleft">
                                                            <p>{{sb.Stem}}</p>
                                                            <p class="margin-top-20">答案： {{sb.CdeAnswer1}} {{sb.CdeAnswer2}} {{sb.CdeAnswer3}} {{sb.CdeAnswer4}}
                                                                {{sb.CdeAnswer5}} {{sb.CdeAnswer6}} {{sb.CdeAnswer7}} {{sb.CdeAnswer8}}
                                                                {{sb.CdeAnswer9}} {{sb.CdeAnswer10}}
                                                                <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                        </div>
                                                        </Col>
                                                        <Col span="5">
                                                        <div class="tresbright">
                                                            <div>
                                                                <InputNumber v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="edit">编辑</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="trash-a">删除</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-up">上移</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-down">下移</Button>
                                                            </div>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </template>
                                    </template>

                                    <!-- 问答题 -->
                                    <template v-else-if="tk.SubjecSubClass===40">
                                        <template v-for="sb in examrqParam.SubjectData.wdList">
                                            <div class="tre-subject">
                                                <div class="tresbcont">
                                                    <Row class="tresbbox">
                                                        <Col span="19">
                                                        <div class="tresbleft">
                                                            <p>{{sb.Stem}}</p>
                                                            <p class="margin-top-20">答案：{{sb.RightAnswer}}</p>
                                                            <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                        </div>
                                                        </Col>
                                                        <Col span="5">
                                                        <div class="tresbright">
                                                            <div>
                                                                <InputNumber v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="edit">编辑</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="trash-a">删除</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-up">上移</Button>
                                                            </div>
                                                            <div class="margin-top-10">
                                                                <Button type="ghost" icon="chevron-down">下移</Button>
                                                            </div>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                            </template>

                            <div class="tre-botom">
                                <Dropdown @on-click="handleTxMenu" placement="top" class="margin-top-20">
                                    <Button type="ghost">
                                        添加试题
                                        <Icon type="arrow-down-b"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="11">单选题</DropdownItem>
                                        <DropdownItem name="12">多选题</DropdownItem>
                                        <DropdownItem name="20">判断题</DropdownItem>
                                        <DropdownItem name="30">填空题</DropdownItem>
                                        <DropdownItem name="40">问答题</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="div_line margin-top-10"></div>
                        </div>
                        <div class="trebox-bom">

                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>

        <Modal @on-cancel="handlecancel" ok-text="确定" v-model="subjectmodal" :styles="{top: '20px'}" width="900" @on-ok="handleSaveSubject">
            <subjectcmpts :SubjecSubClass="SubjecSubClass" ref="subjectcmpts"></subjectcmpts>
        </Modal>
    </div>
</template>
<script>
    import {
        GetList,
        DelPaperList
    } from '@/api/paper';
    import util from '@/libs/util';
    import subjectcmpts from './components/subjectcmpts';
    export default {
        name: 'examedit',
        components: {
            subjectcmpts
        },
        data () {
            return {
                current: 2,
                creatType: 0,
                formItem: {}, // 表单数据源
                data: [],
                Letter: util.Letter,
                subjectmodal: false, // 题库窗口打开状态
                SubjecSubClass: -1,
                EditModeloading: true, // 编辑窗口确定按钮加载状态
                PaperTypeList: [], // 试卷分类集合
                checkSubjectData: [], // 所选择的试题库
                subjectTitleSel: [],
                examrqParam: {
                    PaperName: '', // 试卷名称
                    PaperType: '', // 试卷分类
                    AssemblyType: '', // 组卷方式
                    PaperMode: '', // 试卷类型
                    SubjectData: { // 题库数据
                        danxList: [], // 单选集合
                        duoxList: [], // 多选集合
                        tkList: [], // 填空集合
                        pdList: [], // 判断集合
                        wdList: [] // 问答集合
                    }
                },
                trboxStatus: { // 第三步盒子显示状态
                    show1: 'block',
                    show2: 'none'
                },
                subjectComSaveList: { // 编辑录入后台的通用参数
                    SubjectClassMode: 11 // 题型下拉框绑定值
                },
                stepsStatus: {
                    one: 'block',
                    two: 'none',
                    three: 'none',
                    four: 'none'
                },
                showStauts: {
                    one: 'block',
                    two: 'none'
                }
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
                util.GetItemList('100001', '', false).then(dt => {
                    this.PaperTypeList = dt;
                });
                this.showView();
                this.$nextTick(() => {});
            },
            // 跳转当前
            leapcurrent (v) {
                this.current = v;
                this.showView();
            },
            // 下一步
            next () {
                if (this.current === 3) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
                this.showView();
            },
            // 显示界面
            showView () {
                switch (this.current) {
                    case 0:
                        this.stepsStatus.one = 'block';
                        this.stepsStatus.two = 'none';
                        this.stepsStatus.three = 'none';
                        this.stepsStatus.four = 'none';
                        break;
                    case 1:
                        this.stepsStatus.one = 'none';
                        this.stepsStatus.two = 'block';
                        this.stepsStatus.three = 'none';
                        this.stepsStatus.four = 'none';
                        break;
                    case 2:
                        this.stepsStatus.one = 'none';
                        this.stepsStatus.two = 'none';
                        this.stepsStatus.three = 'block';
                        this.stepsStatus.four = 'none';
                        break;
                    case 3:
                        this.stepsStatus.one = 'none';
                        this.stepsStatus.two = 'none';
                        this.stepsStatus.three = 'none';
                        this.stepsStatus.four = 'block';
                        break;
                    default:
                        break;
                }
            },
            // 刷新数据
            fetchData () {
                try {
                    GetList(this.listQuery).then(response => {
                        this.data = response.data;
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            // 判断提醒菜单点击
            handleTxMenu (name) {
                let json = {
                    SubjecSubClassName: util.getSubjectTypeName(parseInt(name)),
                    Score: 0, // 分数
                    SubjecSubClass: parseInt(name), // 题型
                    Disorder: false, // 试题排序方式
                    OptionOrder: false,
                    StemRk: '', // 题干描述
                    Isleak: false // 多选题是否允许漏选
                };
                this.subjectTitleSel.push(json);
                console.log(this.subjectTitleSel);
                this.trboxStatus.show1 = 'none';
                this.trboxStatus.show2 = 'block';
                console.log(name);
            },
            // 选择试题
            handleSelSubject (v) {
                this.subjectmodal = true;
                this.SubjecSubClass = parseInt(v);
                let checkdata = this.examrqParam.SubjectData;
                let ids = '';
                let debarids = '';
                for (let i = 0; i < checkdata.danxList.length; i++) {
                    ids += checkdata.danxList[i].KeyID + ',';
                }
                for (let i = 0; i < checkdata.duoxList.length; i++) {
                    ids += checkdata.duoxList[i].KeyID + ',';
                }
                for (let i = 0; i < checkdata.pdList.length; i++) {
                    ids += checkdata.pdList[i].KeyID + ',';
                }
                for (let i = 0; i < checkdata.tkList.length; i++) {
                    ids += checkdata.tkList[i].KeyID + ',';
                }
                for (let i = 0; i < checkdata.wdList.length; i++) {
                    ids += checkdata.wdList[i].KeyID + ',';
                }
                debarids = ids.substring(0, ids.length - 1);
                setTimeout(() => {
                    this.$refs.subjectcmpts.refresh(v, debarids);
                }, 100);
            },
            scrollHeightResize () {

            },
            // 展开编辑窗体
            showEdit (params) {

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
            // 删除题库的公共方法
            delSubject (keyids) {
                DelPaperList(keyids).then(response => {
                    this.fetchData();
                    this.$Notice.success({
                        title: response.msg,
                        desc: '',
                        duration: 2
                    });
                });
            },
            // 创建方式监听
            handleCtTypechange (opt) {
                console.log(opt);
                if (opt === '0') {
                    this.showStauts.one = 'block';
                    this.showStauts.two = 'none';
                } else {
                    this.showStauts.one = 'none';
                    this.showStauts.two = 'block';
                };
            },
            // 选择试卷
            handleSelectPaper () {

            },
            // 选取题目并加载到当前页面
            handleSaveSubject () {
                console.log(this.$refs.subjectcmpts.chekcData);
                this.checkSubjectData = this.$refs.subjectcmpts.chekcData;
                let checkSubjectData = this.checkSubjectData;
                // 对选择的数据进行筛选处理
                switch (parseInt(this.SubjecSubClass)) {
                    case 11:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            checkSubjectData[i].SelectionOption = checkSubjectData[i].SelectionOption.split('|');
                            this.examrqParam.SubjectData.danxList.push(checkSubjectData[i]);
                        }
                        break;
                    case 12:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            checkSubjectData[i].SelectionOption = checkSubjectData[i].SelectionOption.split('|');
                            this.examrqParam.SubjectData.duoxList.push(checkSubjectData[i]);
                        }
                        break;
                    case 20:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            this.examrqParam.SubjectData.pdList.push(checkSubjectData[i]);
                        }
                        break;
                    case 30:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            this.examrqParam.SubjectData.tkList.push(checkSubjectData[i]);
                        }
                        break;
                    case 40:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            this.examrqParam.SubjectData.wdList.push(checkSubjectData[i]);
                        }
                        break;
                    default:
                        break;
                }
            },
            // 关闭窗口
            handlecancel () {
                this.$refs.subjectcmpts.clearData();
            }

        }
    };
</script>