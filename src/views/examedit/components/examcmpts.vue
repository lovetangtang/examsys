<template>
    <div>
        <Row :gutter="50" style="margin:20px">
            <Col span="12">

            <!-- 考试信息 -->
            <Card>
                <p slot="title">考试信息</p>
                <Form :model="examrqparams" :label-width="100">
                    <Row>
                        <Col span="12" class="row-pd0">
                        <FormItem label="考试名称：">
                            <Input v-model="examrqparams.ExamName" placeholder=""></Input>
                        </FormItem>
                        </Col>
                        <Col class="row-pd0" span="12">
                        <FormItem label="考试分类：">
                            <Select v-model="examrqparams.ExamType" style="width:110px">
                                <Option v-for="item in ExamTypeList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>

                    <FormItem label="考试开始时间：">
                        <Row>
                            <Col class="row-pd0" span="11">
                            <FormItem prop="date">
                                <DatePicker v-model="examrqparams.ExamBeginDate" type="date" placeholder="Select date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col class="row-pd0" span="2" style="text-align: center">-</Col>
                            <Col class="row-pd0" span="11">
                            <FormItem prop="time">
                                <TimePicker v-model="examrqparams.ExamBeginTime" type="time" placeholder="Select time"></TimePicker>
                            </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="考试结束时间：">
                        <Row>
                            <Col class="row-pd0" span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" v-model="examrqparams.ExamEndDate" placeholder="Select date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col class="row-pd0" span="2" style="text-align: center">-</Col>
                            <Col class="row-pd0" span="11">
                            <FormItem prop="time">
                                <TimePicker v-model="examrqparams.ExamEndTime" type="time" placeholder="Select time"></TimePicker>
                            </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="最晚迟到时间：">
                        <Row>
                            <Col class="row-pd0" span="11">
                            <FormItem prop="date">
                                <DatePicker v-model="examrqparams.LateDate" type="date" placeholder="Select date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col class="row-pd0" span="2" style="text-align: center">-</Col>
                            <Col class="row-pd0" span="11">
                            <FormItem prop="time">
                                <TimePicker v-model="examrqparams.LateTime" type="time" placeholder="Select time"></TimePicker>
                            </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="提前交卷时间：">
                        <Row>
                            <Col class="row-pd0" span="11">
                            <FormItem prop="date">
                                <DatePicker v-model="examrqparams.AdHandoverDate" type="date" placeholder="Select date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col class="row-pd0" span="2" style="text-align: center">-</Col>
                            <Col class="row-pd0" span="11">
                            <FormItem prop="time">
                                <TimePicker v-model="examrqparams.AdHandoverTime" type="time" placeholder="Select time"></TimePicker>
                            </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <Row>
                        <Col class="row-pd0" span="12">
                        <FormItem label="答卷时长：">
                            <InputNumber v-model="examrqparams.AnsweTime" :min="0"></InputNumber> 分钟
                        </FormItem>
                        </Col>
                        <Col class="row-pd0" span="12">
                        <FormItem label="及格分数：">
                            <InputNumber v-model="examrqparams.PassScore" :min="0"></InputNumber>
                        </FormItem>
                        </Col>
                    </Row>

                    <FormItem label="考试模式：">
                        <RadioGroup v-model="examrqparams.ExamMode">
                            <Radio label="0">模拟考试</Radio>
                            <Radio label="1">正式考试</Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem label="答题模式：">
                        <RadioGroup v-model="examrqparams.AnsweMode">
                            <Radio label="10">练习模式</Radio>
                            <Radio label="20">逐题模式</Radio>
                            <Radio label="30">考试模式</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="考试说明：">
                        <Input v-model="examrqparams.ExamExplain" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="" :rows="4"></Input>
                    </FormItem>
                    <Row>
                        <Col class="row-pd0" span="12">

                        </Col>
                        <Col class="row-pd0" span="12">

                        </Col>
                    </Row>
                </Form>
            </Card>

            <!-- 考试限制 -->
            <Card class="margin-top-20">
                <p slot="title">考试限制</p>
                <Form :model="examrqparams" :label-width="100">
                    <Row>
                        <Col span="12" class="row-pd0">
                        <FormItem label="监考人姓名：">
                            <Input v-model="examrqparams.Invigilator" placeholder=""></Input>
                        </FormItem>
                        </Col>
                        <Col class="row-pd0" span="12">
                        <FormItem label="监考人工号：">
                            <Input v-model="examrqparams.InvigilatorID" placeholder=""></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <FormItem label="可考部门：">
                        <Input v-model="examrqparams.AllowExamDepart" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="可考人员工号：">
                        <Input v-model="examrqparams.AllowExamUser" placeholder=""></Input>
                        <Tooltip placement="bottom">
                            <Icon class="cursor" type="help-circled"></Icon>
                            <div slot="content">
                                <p>多个人员用|号隔开，否则不生效</p>
                            </div>
                        </Tooltip>
                    </FormItem>
                    <FormItem label="答题次数：">
                        <InputNumber v-model="examrqparams.AnsweNumLimit" :min="0"></InputNumber> (-1默认不限制)
                    </FormItem>
                    <FormItem label="切换页面超过：">
                        <InputNumber v-model="examrqparams.SwitchNumLimit" :min="0"></InputNumber> 次强制交卷，-1默认不限制
                    </FormItem>
                    <FormItem label="单题答题时间：">
                        <InputNumber v-model="examrqparams.OneAnsweSecond" :min="0"></InputNumber>
                        <Tooltip placement="bottom">
                            <Icon class="cursor" type="help-circled"></Icon>
                            <div slot="content">
                                <p>单题答题时间，若设置-1就不开启单题答题</p>
                                <p> 时间限制。若设置大于0就开启单题答题时间</p>
                                <p>限制,当每题的答题时间超过限制后该题将不</p>
                                <p>能作答</p>
                            </div>
                        </Tooltip>
                    </FormItem>
                    <FormItem label="考试状态：">
                        <RadioGroup v-model="examrqparams.Status">
                            <Radio label="0">启用考试</Radio>
                            <Radio label="1">禁用考试</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </Card>

            </Col>
            <Col span="12">
            <!-- 试卷信息 -->
            <Card>
                <p slot="title">试卷信息
                    <span class="span-edit-ft">编辑</span>

                </p>
                <div class="">
                    <div>
                        <label for="">试卷名称：</label>
                        <span>{{paperinfo.PaperName}}</span>
                    </div>
                    <div class="margin-top-10">
                        <label for="">总分：</label>
                        <span>{{paperinfo.TotalScore}}</span>
                    </div>
                    <div class="margin-top-10">
                        <label for="">试题数量：</label>
                        <span>{{paperinfo.SubjectNum}}</span>
                    </div>
                    <div class="margin-top-10">
                        <label for="">创建日期：</label>
                        <span>{{paperinfo.InsertTime}}</span>
                    </div>
                </div>
            </Card>
            <!-- 考试限制 -->
            <Card class="margin-top-20">
                <p slot="title">考后成绩显示设置</p>
                <Form :model="examrqparams" :label-width="100">
                    <div class="margin-top-10">
                        <Checkbox v-model="examrqparams.IsShowScore">考后是否显示成绩</Checkbox>
                    </div>
                    <div class="margin-top-10">
                        <Checkbox v-model="examrqparams.IsShowAnswer">考后是否显示答案和解析</Checkbox>
                    </div>
                    <div class="margin-top-10">
                        <Checkbox v-model="examrqparams.IsShowNum">考后是否显示名次</Checkbox>
                    </div>
                    <div class="margin-top-10">
                        <Checkbox v-model="examrqparams.IsShowComment">考后是否显示评语</Checkbox>
                    </div>
                    <div class="margin-top-10">
                        <label for="">考试结束语：</label>
                        <Input v-model="examrqparams.EndTag" class="margin-top-10" type="textarea" :autosize="{minRows: 3,maxRows: 12}" placeholder="加油，欢迎下次再来"
                            :rows="4"></Input>
                    </div>
                </Form>
            </Card>


            <Button :style="{display:showbtn}" @click="handleSaveExam" class="margin-top-20" type="success" long>发布考试</Button>
            </Col>
        </Row>

    </div>
</template>
<script>
    import {
        SaveExamList
    } from '@/api/exam';
    import util from '@/libs/util';
    export default {
        name: 'examcmpts',
        props: {},
        data () {
            return {
                ExamTypeList: [], // 关联业务集合
                SimpleMaxSum: 0,
                UsualMaxSum: 0,
                HardMaxSum: 0,
                showbtn: 'block',
                paperinfo: {
                    'KeyID': 0,
                    'PaperName': '',
                    'PaperType': '',
                    'PaperMode': '0',
                    'AssemblyType': 0,
                    'TotalScore': 0,
                    'SubjectNum': 0,
                    'InsertID': '',
                    'InsertTime': ''
                },
                examrqparams: { // 编辑录入后台的通用参数
                    ExamName: '', // 考试名称
                    ExamType: -1, // 考试分类
                    ExamBeginDate: '', // 考试开始日期
                    ExamEndDate: '', // 考试结束日期
                    ExamBeginTime: '', // 考试开始时间
                    ExamEndTime: '', // 考试结束时间
                    action: 'save',
                    LateDate: '',
                    LateTime: '',
                    AdHandoverTime: '',
                    AdHandoverDate: '',
                    AnsweTime: 0,
                    PassScore: 0,
                    ExamMode: '0',
                    PaperID: '',
                    AnsweMode: '10',
                    ExamExplain: '',
                    Invigilator: '',
                    InvigilatorID: '',
                    AllowExamDepart: '',
                    AllowExamUser: '',
                    AnsweNumLimit: -1,
                    SwitchNumLimit: -1,
                    OneAnsweSecond: -1,
                    Status: '0',
                    IsShowScore: false,
                    IsShowAnswer: false,
                    IsShowNum: false,
                    IsShowComment: false,
                    EndTag: ''
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

        },
        // 自定义方法
        methods: {
            // 初始化内容
            init () {
                // 下拉数据源赋值
                util.GetItemList('100004', '', false).then(dt => {
                    this.ExamTypeList = dt;
                    return util.GetItemList('100003', '', true);
                });
                this.$nextTick(() => {});
            },
            // 设置试卷信息
            setPaperinfo (p) {
                this.paperinfo = p;
                this.examrqparams.PaperID = p.KeyID;
            },
            // 设置考试信息
            setExaminfo (em) {
                this.examrqparams = em;
                this.examrqparams.ExamBeginDate = em.ExamBeginTime;
                this.examrqparams.ExamBeginTime = this.getTimes(em.ExamBeginTime);

                this.examrqparams.ExamEndDate = em.ExamEndTime;
                this.examrqparams.ExamEndTime = this.getTimes(em.ExamEndTime);

                this.examrqparams.LateDate = em.LateTime;
                this.examrqparams.LateTime = this.getTimes(em.LateTime);

                this.examrqparams.AdHandoverDate = em.AdHandoverTime;
                this.examrqparams.AdHandoverTime = this.getTimes(em.AdHandoverTime);

                this.examrqparams.action = 'save';
                this.paperinfo = em;

                this.showbtn = 'none';
            },
            getTimes (times) {
                let dt = new Date(times);
                let time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
                return time;
            },
            refresh (v, d) {

            },
            // 发布考试
            handleSaveExam () {
                SaveExamList(this.examrqparams).then(response => {
                    this.$Notice.success({
                        title: response.msg,
                        desc: '',
                        duration: 2
                    });
                    this.$store.commit('removeTag', 'examcreat');
                    this.$store.commit('closePage', 'examcreat');
                    this.$router.push({
                        name: 'exam_set'
                    });
                });
            },
            // 重置数据
            clearData () {
                console.log('清空');
                this.examrqparams = this.$options.data().examrqparams;
            }

        }
    };
</script>