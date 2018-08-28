<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import "./mypapermark.less";
</style>
<template>
    <div >
        <Row class="mg-top20" id="print" type="flex" justify="center">
            <Col span="22">
            <Row :gutter="50">
                <Col span="20">
                <div class="box">
                    <template v-for="ck in subjectData">
                        <!-- 单选题 -->
                        <template v-if="ck.SubjecSubClass===11">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="20">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Form class="examline-bottom" :model="formItem" :label-width="80">
                                                <RadioGroup v-model="sb.ExamAnswer">
                                                    <template v-for=" (op,oi) in sb.SelectionOption.split('|')">
                                                        <Radio disabled class="ft-nm margin-top-5 exam-answer" :label="oi+1">{{Letter[oi+1]}}. {{op}} </Radio>
                                                        </br>
                                                    </template>
                                                </RadioGroup>
                                                <div class="analysis">
                                                    <div class="analysis-row word-wrap">
                                                        <p class="margin-top-20">答案：{{Letter[sb.RightAnswer]}}</p>
                                                        <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                    </div>
                                                </div>
                                            </Form>

                                            </Col>
                                            <Col span="4">
                                            <RadioGroup v-model="sb.RightStatus" type="button">
                                                <Radio :label="parseInt(0)">正确</Radio>
                                                <Radio :label="parseInt(1)">错误</Radio>
                                            </RadioGroup>
                                            <div class="margin-top-10">
                                                <InputNumber :min="0" :max="sb.DefaultScore" v-model="sb.MyScore"></InputNumber> 分
                                            </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                        <!-- 多选题 -->
                        <template v-else-if="ck.SubjecSubClass===12">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="20">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Form class="examline-bottom" :model="formItem" :label-width="80">
                                                <CheckboxGroup v-model="sb.ExamAnswer">
                                                    <template v-for="(op,oi) in sb.SelectionOption.split('|')">
                                                        <Checkbox disabled class="ft-nm margin-top-5 exam-answer" :label="oi+1+''">{{Letter[oi+1]}}. {{op}}
                                                        </Checkbox>
                                                        </br>
                                                    </template>
                                                </CheckboxGroup>
                                                <div class="analysis">
                                                    <div class="analysis-row word-wrap">
                                                        <p class="margin-top-20">答案：{{sb.RightAnswer}}</p>
                                                        <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                    </div>
                                                </div>
                                            </Form>
                                            </Col>
                                            <Col span="4">
                                            <RadioGroup v-model="sb.RightStatus" type="button">
                                                <Radio :label="parseInt(0)">正确</Radio>
                                                <Radio :label="parseInt(1)">错误</Radio>
                                            </RadioGroup>
                                            <div class="margin-top-10">
                                                <InputNumber :min="0" :max="sb.DefaultScore" v-model="sb.MyScore"></InputNumber> 分
                                            </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                        <!-- 判断题 -->
                        <template v-else-if="ck.SubjecSubClass===20">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="20">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Form class="examline-bottom" :model="formItem" :label-width="80">
                                                <RadioGroup v-model="sb.ExamAnswer">
                                                    <Radio disabled class="ft-nm margin-top-5 exam-answer" label="true">正确 </Radio>
                                                    </br>
                                                    <Radio disabled class="ft-nm margin-top-5 exam-answer" label="false">错误</Radio>
                                                    </br>
                                                </RadioGroup>
                                                <div class="analysis">
                                                    <div class="analysis-row word-wrap">
                                                        <p class="margin-top-20">答案：{{sb.RightAnswer}}</p>
                                                        <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                    </div>
                                                </div>
                                            </Form>
                                            </Col>
                                            <Col span="4">
                                            <RadioGroup v-model="sb.RightStatus" type="button">
                                                <Radio :label="parseInt(0)">正确</Radio>
                                                <Radio :label="parseInt(1)">错误</Radio>
                                            </RadioGroup>
                                            <div class="margin-top-10">
                                                <InputNumber :min="0" :max="sb.DefaultScore" v-model="sb.MyScore"></InputNumber> 分
                                            </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                        <!-- 填空题 -->
                        <template v-else-if="ck.SubjecSubClass===30">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="20">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>
                                                <span v-html="fun_cltkstemstyle(sb.Stem)"></span>
                                                <span>({{sb.DefaultScore}}分)</span>
                                            </p>
                                            <Form class="examline-bottom" ref="formInline" :label-width="30">
                                                <template v-for="(tk,ti) in sb.Stem.split('()').length-1">
                                                    <div class="margin-bottom-10 margin-top-10">
                                                        <Input disabled v-model="sb.tkanswer[ti].value">
                                                        <span slot="prepend">
                                                          <span>&nbsp;{{fun_tknrfh(ti+1)}}&nbsp;</span>
                                                        </span>
                                                        </Input>
                                                    </div>
                                                </template>
                                                <div class="analysis">
                                                    <div class="analysis-row word-wrap">
                                                        <p class="margin-top-20">答案： {{sb.CdeAnswer1}} {{sb.CdeAnswer2}} {{sb.CdeAnswer3}} {{sb.CdeAnswer4}}
                                                            {{sb.CdeAnswer5}} {{sb.CdeAnswer6}} {{sb.CdeAnswer7}} {{sb.CdeAnswer8}}
                                                            {{sb.CdeAnswer9}} {{sb.CdeAnswer10}}
                                                            <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                    </div>
                                                </div>
                                            </Form>

                                            </Col>
                                            <Col span="4">
                                            <RadioGroup v-model="sb.RightStatus" type="button">
                                                <Radio :label="parseInt(0)">正确</Radio>
                                                <Radio :label="parseInt(1)">错误</Radio>
                                            </RadioGroup>
                                            <div class="margin-top-10">
                                                <InputNumber :min="0" :max="sb.DefaultScore" v-model="sb.MyScore"></InputNumber> 分
                                            </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                        <!-- 问答题 -->
                        <template v-else-if="ck.SubjecSubClass===40">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="20">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Row class="examline-bottom">
                                                <Col span="11" class="margin-top-10">
                                                <textarea v-model="sb.RightAnswer" class='tinymce-textarea' :id="'tinymceEditer'+(si+1)"></textarea>
                                                </Col>
                                            </Row>
                                            </Col>
                                            <Col span="4">
                                            <RadioGroup v-model="sb.RightStatus" type="button">
                                                <Radio :label="parseInt(0)">正确</Radio>
                                                <Radio :label="parseInt(1)">错误</Radio>
                                            </RadioGroup>
                                            <div class="margin-top-10">
                                                <InputNumber :min="0" :max="sb.DefaultScore" v-model="sb.MyScore"></InputNumber> 分
                                            </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                    </template>
                </div>
                </Col>
                <Col :md="4" style="padding-left:39px">
                <div :class="[!btnshow ? ratePosClass : '', rateClass]"  style="-webkit-transform: translateZ(0)">
                    <div class="box-exame">
                        <div class="emrate-time">
                            <p class="item-lable"> 用户名</p>
                            <p class="emrate-tmv">
                                {{myInfo.UserName}}
                            </p>
                        </div>
                        <div class="emrate-time">
                            <p class="item-lable"> 总分</p>
                            <p class="emrate-tmv">
                                {{myInfo.Score}}
                            </p>
                        </div>
                        <div class="emrate-time">
                            <p class="item-lable"> 及格状态</p>
                            <p class="emrate-tmv">
                                {{fun_getispass(myInfo.IsPass)}}
                            </p>
                        </div>
                    </div>
                    <Button v-show="btnshow" type="primary" @click="handlersubmit" style="width:100%">保存</Button>
                    <Button v-show="btnshow" type="primary" @click="doPrint" style="width:100%;margin-top:10px">打印</Button>
                </div>
                </Col>
            </Row>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {
        GetAwExamList,
        SaveJudgmentList
    } from '@/api/exam_mark';
    import util from '@/libs/util';
    export default {
        name: 'exam',
        components: {

        },
        data () {
            return {
                ansmodal: false, // 未知
                pageSpinShow: true, // 加载状态
                rateClass: 'box-rate-top',
                ratePosClass: 'pos-abs',
                Letter: util.Letter, // 大小写字母
                btnshow: true,
                subjectData: [], // 题库数据源
                answerCardlist: [], // 答题卡数据列表
                listQuery: {// 查询后台传递参数
                    action: 'getuserpapermark',
                    UserID: 0,
                    ExamID: 0
                },
                saveData: {// 保存后台传递参数

                },
                Examinfo: {},
                formItem: {
                    radio: 'male',
                    checkbox: []
                },
                myInfo: {}// 用户信息
            };
        },
        watch: {
            'subjectData': {
                // 深度监听，可监听到对象、数组分值，总题数的变化
                handler (val, oldVal) {
                    let allScore = 0;
                    for (let i = 0; i < val.length; i++) {
                        for (let j = 0; j < val[i].subjectlist.length; j++) {
                            let onescore = val[i].subjectlist[j].MyScore;
                            allScore += onescore;
                        }
                    }
                    this.myInfo.Score = allScore;
                },
                deep: true
            }
        },
        created () {
            this.fetchData();
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.handleExitScree);
            setTimeout(() => {
                this.pageSpinShow = false;
            }, 2000);
            this.$nextTick(() => {

            });
        },
        beforeDestroy () {},
        destroyed () {},
        computed: {
            avatorPath () {
                return localStorage.avatorImgPath;
            }
        },
        methods: {
            init () {
                this.$nextTick(() => {

                });
            },
            // 获取答题状态
            fun_getispass (v) {
                switch (v) {
                    case false:
                        return '未及格';
                        break;
                    case true:
                        return '及格';
                        break;
                    default:
                        break;
                }
            },
            // 处理填空题的题干填空显示样式
            fun_cltkstemstyle (str) {
                let arrystr = str.split('()');
                let stem = '';
                stem = str;
                for (let i = 0; i < arrystr.length; i++) {
                    let fh = this.fun_tknrfh(i + 1);
                    let tkdiv = '<span style="border-bottom:1px #000 solid; padding-left:20px;  padding-right:20px;">' +
                        fh + '</span>';
                    stem = stem.replace(/\(\)/, tkdiv);
                }
                return stem;
                console.log(stem);
            },
            // 填空符号
            fun_tknrfh (v) {
                switch (v) {
                    case 1:
                        return '①';
                        break;
                    case 2:
                        return '②';
                        break;
                    case 3:
                        return '③';
                        break;
                    case 4:
                        return '④';
                        break;
                    case 5:
                        return '⑤';
                        break;
                    case 6:
                        return '⑥';
                        break;
                    case 7:
                        return '⑦';
                        break;
                    case 8:
                        return '⑧';
                        break;
                    case 9:
                        return '⑨';
                        break;
                    case 10:
                        return '⑩';
                        break;
                    default:
                        break;
                }
            },
            // 刷新数据
            fetchData () {
                try {
                    let UserID = this.$route.query.UserID;
                    let ExamID = this.$route.query.ExamID;
                    this.listQuery.UserID = UserID;
                    this.listQuery.ExamID = ExamID;
                    this.myInfo.UserName = this.$route.query.UserName;
                    this.myInfo.IsPass = this.$route.query.IsPass;
                    this.myInfo.Score = this.$route.query.Score;
                    GetAwExamList(this.listQuery).then(response => {
                        this.subjectData = response.data;
                        this.Examinfo = response.data1;
                        for (let i = 0; i < this.subjectData.length; i++) {
                            let scls = this.subjectData[i].SubjecSubClass;
                            switch (scls) {
                                case 11:
                                    for (let j = 0; j < this.subjectData[i].subjectlist.length; j++) {
                                        let json = this.subjectData[i].subjectlist[j];
                                        let ExamAnswer = parseInt(json.ExamAnswer);
                                        json.ExamAnswer = ExamAnswer;
                                    }
                                    break;
                                case 12:
                                    for (let j = 0; j < this.subjectData[i].subjectlist.length; j++) {
                                        let json = this.subjectData[i].subjectlist[j];
                                        let examtkAnswer = json.ExamAnswer.split('|');
                                        json.ExamAnswer = examtkAnswer;
                                    }
                                    break;
                                case 20:

                                    break;
                                case 30:
                                    for (let j = 0; j < this.subjectData[i].subjectlist.length; j++) {
                                        let json = this.subjectData[i].subjectlist[j];
                                        json['tkanswer'] = [];
                                        let len = json.Stem.split('()').length - 1;
                                        let examtkAnswer = JSON.parse(json.ExamAnswer);
                                        for (let h = 0; h < len; h++) {
                                            json.tkanswer.push({
                                                value: examtkAnswer[h].value
                                            });
                                        }
                                        this.subjectData[i].subjectlist[j] = json;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        this.init();
                    }).catch(ex => {
                        console.log(ex);
                        this.$Spin.hide();
                        // this.$router.push({
                        //     name: 'examresindex',
                        //     query: []
                        // });
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            handlersubmit () {
                this.$Modal.confirm({
                    title: '提示',
                    'mask-closable': 'false',
                    content: '<p style="font-size:18px">确定要保存判分结果嘛</p>',
                    onOk: () => {
                        this.fun_submitscore();
                    },
                    onCancel: () => {}
                });
            },
            doPrint () {
                // let newWindow = window.open(); //  打开新窗口
                // let codestr = document.getElementById('print').innerHTML; //  获取需要生成pdf页面的div代码
                // console.log(codestr);
                // newWindow.document.write(codestr); //  向文档写入HTML表达式或者JavaScript代码
                // newWindow.document.close(); //  关闭document的输出流, 显示选定的数据
                // newWindow.print(); //  打印当前窗口
                // return true;
                this.btnshow = false;
                this.rate_style = this.rate_print;
                setTimeout(() => {
                    let subOutputRankPrint = document.getElementById('print');
                    var elements = subOutputRankPrint.getElementsByTagName('input');
                    for (let i = 0; i < elements.length; i++) {
                        if (elements[i].type === 'text') {
                            elements[i].setAttribute('value', elements[i].value);
                        }
                    }
                    let newContent = subOutputRankPrint.innerHTML;
                    let oldContent = document.body.innerHTML;
                    document.body.innerHTML = newContent;
                    document.body.style.height = 'auto';
                    window.print();
                    window.location.reload();
                    document.body.innerHTML = oldContent;
                    this.btnshow = true;
                    this.rate_style = this.rate_normal;
                }, 500);
    
                return false;
            },
            // pdf打印
            handlepdfPrint () {
    
            },
            fun_submitscore () {
                let arrysb = [];
                for (let i = 0; i < this.subjectData.length; i++) {
                    for (let j = 0; j < this.subjectData[i].subjectlist.length; j++) {
                        let now = this.subjectData[i].subjectlist[j];
                        let json = {};
                        json['MyScore'] = now.MyScore;
                        json['RightStatus'] = now.RightStatus;
                        json['SubjectID'] = now.KeyID;
                        json['AnswerKeyID'] = now.AnswerKeyID;
                        arrysb.push(json);
                    }
                }
                this.saveData = {
                    action: 'JudgmentMyscore',
                    ExamID: this.listQuery.ExamID,
                    UserID: this.listQuery.UserID,
                    allScore: this.myInfo.Score,
                    subjectlist: JSON.stringify(arrysb)
                };
                SaveJudgmentList(this.saveData).then(response => {
                    this.$Notice.success({
                        title: response.msg,
                        desc: '',
                        duration: 2
                    });
                    this.$store.commit('removeTag', 'mypaper');
                    this.$store.commit('closePage', 'mypaper');
                    this.$router.push({
                        name: 'exam_mark'
                    });
                });
            }
        }
    };
</script>