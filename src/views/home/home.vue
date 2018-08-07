<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main mg-top">
        <Row>
            <Col span="20" class="ft-lg">正在进行</Col>
            <Col span="4" class="ft-cs">
            <div class="fl-right" @click="handleOpenExam">
                <a href="javascript:void(0)">
                    全部考试>
                </a>
            </div>
            </Col>
        </Row>
        <div class="divide_line1"></div>
        <Row :gutter="12">
            <Col :xs="24">
            <Row class-name="home-page-row1" :gutter="10">
                <template v-for="item in examnowlist">
                    <Col :md="11" :style="{marginBottom: '10px'}">
                    <Card class="bd-left-true box-amt paper-bg">
                        <b class="card-user-infor-name">{{item.ExamName}}</b>
                        <div class="divide_line"></div>
                        <div class="pd-home-sj">
                            <Row>
                                <Col span="24">
                                <div>
                                    考试时间：{{fun_gettimev(item.ExamBeginTime)}}到{{fun_gettimev(item.ExamEndTime)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    总分：{{item.TotalScore}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    及格分数：{{item.PassScore}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    组卷方式：{{fun_getassemblytype(item.AssemblyType)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    考试分类：{{fun_getexamtype(item.ExamType)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    考试模式：{{fun_getexammode(item.ExamMode)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    提前交卷时间：{{fun_gettimev(item.AdHandoverTime)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    最晚迟到时间：{{fun_gettimev(item.LateTime)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    考试时长：{{item.AnsweTime}}分钟
                                </div>
                                </Col>
                                <Col span="12" class="tx-r">
                                   <span>{{item.ExamNum}}人已考</span>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    </Col>
                </template>
            </Row>
            </Col>
            </Col>
        </Row>

        <Row class="mg-top">
            <Col span="20" class="ft-lg">最近添加</Col>
            <Col span="4" class="ft-cs">
            <div class="fl-right" @click="handleOpenExam">
                <a href="javascript:void(0)">
                    全部考试>
                </a>
            </div>
            </Col>
        </Row>
        <div class="divide_line1"></div>
        <Row :gutter="12">
            <Col :xs="24">
            <Row class-name="home-page-row1" :gutter="10">
                <template v-for="item in examlately">
                    <Col :md="11" :style="{marginBottom: '10px'}">
                    <Card class="bd-left-true box-amt paper-bg">
                        <b class="card-user-infor-name">{{item.ExamName}}</b>
                        <div class="divide_line"></div>
                        <div class="pd-home-sj">
                            <Row>
                                <Col span="24">
                                <div>
                                    考试时间：{{fun_gettimev(item.ExamBeginTime)}}到{{fun_gettimev(item.ExamEndTime)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    总分：{{item.TotalScore}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    及格分数：{{item.PassScore}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    组卷方式：{{fun_getassemblytype(item.AssemblyType)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    考试分类：{{fun_getexamtype(item.ExamType)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    考试模式：{{fun_getexammode(item.ExamMode)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    提前交卷时间：{{fun_gettimev(item.AdHandoverTime)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    最晚迟到时间：{{fun_gettimev(item.LateTime)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    考试时长：{{item.AnsweTime}}分钟
                                </div>
                                </Col>
                                <Col span="12" class="tx-r">
                                <span>{{item.ExamNum}}人已考</span>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    </Col>
                </template>
            </Row>
            </Col>
            </Col>
        </Row>


    </div>
</template>

<script>
    import {
        GetHomeExam,
        ExecExam
    } from '@/api/home';
    import util from '@/libs/util';
    export default {
        name: 'home',
        data () {
            return {
                listQuery: { // 查询条件
                    ExamType: -1,
                    Status: -1,
                    ExamMode: -1,
                    action: 'gethomeexamlist',
                    type: 'now',
                    ExamName: ''
                },
                examnowlist: [],
                examlately: []
            };
        },
        // 模板渲染成html前调用，初始化属性
        created () {
            this.fetchData();
        },
        mounted () {
            this.$nextTick(() => {
                // $('.box-amt').hover(function () {
                //     $('.ivu-card-body').animate({top: '200px', right: '600px'}, 1000);
                // }, function () {
                //     $('.user-infor').removeClass('bounce animated infinite');
                // });
            });
        },
        computed: {
            avatorPath () {
                return localStorage.avatorImgPath;
            }
        },
        methods: {
            fun_gettimev (v) {
                return v.substring(v, v.length - 3);
            },
            fun_getexamtype (v) {
                return util.GetItemValue(this, '100004', v); ;
            },
            fun_getassemblytype (v) {
                return util.getAssemblyType(v);
            },
            fun_getexammode (v) {
                return util.getExamModeName(v);
            },
            fun_startexam (item) {
                let rq = {
                    action: 'execexam',
                    KeyID: item.KeyID
                };
                ExecExam(rq).then(response => {
                    let routeData = this.$router.resolve({
                        name: 'graduallyem', // graduallyem
                        query: item,
                        params: {}
                    });
                    window.open(routeData.href, '_blank');
                });
            },
            // 打开考试信息
            handleOpenExam () {
                this.$router.push({
                    name: 'exam_set'
                });
            },
            // 刷新数据
            fetchData () {
                try {
                    this.listQuery.type = 'lately';
                    GetHomeExam(this.listQuery).then(response => {
                        this.examlately = response.data;
                        this.listQuery.type = 'now';
                        return GetHomeExam(this.listQuery);
                    }).then(response => {
                        this.examnowlist = response.data;
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>