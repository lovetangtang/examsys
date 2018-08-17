<style lang="less">
    @import '../../styles/common.less';
    @import './examcreat.less';
</style>
<template>
    <div class="margin-top-20">
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
                    <template v-for="(tv,tk) in subjectTitleSel">
                        <div class="threebox-left margin-top-10">
                            <Card class="threecard-left">
                                <Row>
                                    <Col span="20">
                                    <p>{{tv.SubjecSubClassName}}</p>
                                    <p class="margin-top-10">共
                                        <span>{{tv.sTSelSum}}</span> 题</p>
                                    <p class="margin-top-10">每题
                                        <InputNumber :min="0" v-model="tv.Score" style="width: 70px;margin-left:6px"></InputNumber> 分</p>
                                    </Col>
                                    <Col span="4">
                                    <div class="margin-top-10" @click="removeSbTSel(tk)">
                                        <Icon class="normal-icon" type="trash-a"></Icon>
                                    </div>
                                    <div class="margin-top-10" @click="upmoveSbTSel(tk)">
                                        <Icon class="normal-icon" type="chevron-up"></Icon>
                                    </div>
                                    <div class="margin-top-10" @click="downmoveSbTSel(tk)">
                                        <Icon class="normal-icon " type="chevron-down"></Icon>
                                    </div>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </template>


                    <div class="threebox-left margin-top-20">
                        <Card class="threecard-left">
                            <p>总题数:{{examrqParam.SubjectNum}}题</p>
                            <p class="margin-top-8">当前总分:{{examrqParam.TotalScore}}分</p>
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
                            <template v-for="(tk,tkkey) in subjectTitleSel">
                                <div class="trebox-ct2">
                                    <div class="tre-title">
                                        <Row>
                                            <Col span="8">
                                            <Input v-model="tk.StemRk" size="small" placeholder="" style="width: 180px"></Input>
                                            <Tooltip placement="bottom">
                                                <Icon class="cursor" type="help-circled"></Icon>
                                                <div slot="content">
                                                    <p>题型描述。例如：单选题，只能选择一个答案</p>
                                                    <p>，请谨慎作答(含2题，总计10分)。注:括号内</p>
                                                    <p>容由系统自动生成，只需填写括号前内容即可</p>
                                                </div>
                                            </Tooltip>
                                            </Col>
                                            <Col span="16">
                                            <span>每题</span>
                                            <InputNumber :min="0" v-model="tk.Score" size="small" style="width: 70px;margin-left:6px"></InputNumber>
                                            <span style="margin-left:6px">分</span>
                                            <Checkbox v-model="tk.Disorder" style="margin-left:6px">试题乱序</Checkbox>
                                            <template v-if="tk.SubjecSubClass===11 ||tk.SubjecSubClass===12">
                                                <Tooltip placement="bottom">
                                                    <Checkbox v-model="tk.OptionOrder">选项乱序</Checkbox>
                                                    <Icon class="cursor" type="help-circled"></Icon>
                                                    <div slot="content">
                                                        <p>打开选项乱序后，每个考生的选项排序均不</p>
                                                        <p>完全相同，减少抄袭可能性(该功能暂未开发)</p>
                                                    </div>
                                                </Tooltip>
                                            </template>
                                            <Checkbox style="margin-left:6px" v-model="tk.Isleak" v-if="tk.SubjecSubClass===12">允许漏选</Checkbox>
                                            </Col>
                                        </Row>
                                    </div>
                                    <!-- 选题组卷 -->
                                    <div :style="{display:groupStatus.xzStatus}">
                                        <div class="tre-sel margin-top-10">
                                            <Button @click="handleSelSubject(tk.SubjecSubClass,tkkey)" type="ghost">选择试题</Button>
                                        </div>
                                        <div class="tx-center">
                                            <h3>{{tk.SubjecSubClassName}}</h3>
                                        </div>

                                        <!-- 单选题 -->
                                        <template v-if="tk.SubjecSubClass===11">
                                            <template v-for="(sb,sbkey) in subjectTitleSel[tkkey].danxList">
                                                <div class="tre-subject">
                                                    <div class="tresbcont">
                                                        <Row class="tresbbox">
                                                            <Col span="19">
                                                            <div class="tresbleft">
                                                                <p>{{sb.Stem}}</p>
                                                                <template v-for="(se, index) in sb.SelectionOption">
                                                                    <p v-if="sb.RightAnswer==(index+1)" class="margin-top-10 checkColor">{{Letter[index+1]}}.{{se}}</p>
                                                                    <p v-else class="margin-top-10">{{Letter[index+1]}}.{{se}}</p>
                                                                </template>
                                                                <p class="margin-top-20">答案：{{Letter[sb.RightAnswer]}}</p>
                                                                <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                            </div>
                                                            </Col>
                                                            <Col span="5">
                                                            <div class="tresbright">
                                                                <div>
                                                                    <InputNumber :min="0" v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="edit">编辑</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="trash-a" @click="remove(sbkey,11,tkkey)">删除</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-up" @click="upMove(sbkey,11,tkkey)">上移</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-down" @click="downMove(sbkey,11,tkkey)">下移</Button>
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
                                            <template v-for="(sb,sbkey) in subjectTitleSel[tkkey].duoxList">
                                                <div class="tre-subject">
                                                    <div class="tresbcont">
                                                        <Row class="tresbbox">
                                                            <Col span="19">
                                                            <div class="tresbleft">
                                                                <p>{{sb.Stem}}</p>
                                                                <template v-for="(se, index) in sb.SelectionOption">
                                                                    <p v-if="sb.RightAnswer.split('|').indexOf(index+1+'')>-1" class="margin-top-10 checkColor">{{Letter[index+1]}}.{{se}}</p>
                                                                    <p v-else class="margin-top-10">{{Letter[index+1]}}.{{se}}</p>
                                                                </template>
                                                                <p class="margin-top-20">答案：{{sb.RightAnswer}}</p>
                                                                <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                            </div>
                                                            </Col>
                                                            <Col span="5">
                                                            <div class="tresbright">
                                                                <div>
                                                                    <InputNumber :min="0" v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="edit">编辑</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="trash-a" @click="remove(sbkey,12,tkkey)">删除</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-up" @click="upMove(sbkey,12,tkkey)">上移</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-down" @click="downMove(sbkey,12,tkkey)">下移</Button>
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
                                            <template v-for="(sb,sbkey) in subjectTitleSel[tkkey].pdList">
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
                                                                    <InputNumber :min="0" v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="edit">编辑</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="trash-a" @click="remove(sbkey,20,tkkey)">删除</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-up" @click="upMove(sbkey,20,tkkey)">上移</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-down" @click="downMove(sbkey,20,tkkey)">下移</Button>
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
                                            <template v-for="(sb,sbkey) in subjectTitleSel[tkkey].tkList">
                                                <div class="tre-subject">
                                                    <div class="tresbcont">
                                                        <Row class="tresbbox">
                                                            <Col span="19">
                                                            <div class="tresbleft">
                                                                <p>{{sb.Stem}}</p>
                                                                <p class="margin-top-20">答案： {{sb.CdeAnswer1}} {{sb.CdeAnswer2}} {{sb.CdeAnswer3}}
                                                                    {{sb.CdeAnswer4}} {{sb.CdeAnswer5}} {{sb.CdeAnswer6}}
                                                                    {{sb.CdeAnswer7}} {{sb.CdeAnswer8}} {{sb.CdeAnswer9}}
                                                                    {{sb.CdeAnswer10}}
                                                                    <p class="margin-top-10">解析：{{sb.Analysis}}</p>
                                                            </div>
                                                            </Col>
                                                            <Col span="5">
                                                            <div class="tresbright">
                                                                <div>
                                                                    <InputNumber :min="0" v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="edit">编辑</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="trash-a" @click="remove(sbkey,30,tkkey)">删除</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-up" @click="upMove(sbkey,30,tkkey)">上移</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-down" @click="downMove(sbkey,30,tkkey)">下移</Button>
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
                                            <template v-for="(sb,sbkey) in subjectTitleSel[tkkey].wdList">
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
                                                                    <InputNumber :min="0" v-model="sb.DefaultScore" size="small" style="width: 70px;"></InputNumber>分</div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="edit">编辑</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="trash-a" @click="remove(sbkey,40,tkkey)">删除</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-up" @click="upMove(sbkey,40,tkkey)">上移</Button>
                                                                </div>
                                                                <div class="margin-top-10">
                                                                    <Button type="ghost" icon="chevron-down" @click="downMove(sbkey,40,tkkey)">下移</Button>
                                                                </div>
                                                            </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </template>
                                        </template>
                                    </div>
                                    <!-- 随机组卷 -->
                                    <div :style="{display:groupStatus.sjStatus}">
                                        <div class="tx-center margin-top-10">
                                            <h3>{{tk.SubjecSubClassName}}</h3>
                                        </div>
                                        <div class="tre-sel margin-top-10">
                                            <Button @click="handleSelSubjectRule(tk.SubjecSubClass,tkkey)" type="ghost">选择试题</Button>
                                        </div>
                                        <div v-if="tk.sbgroupList&&tk.sbgroupList.SimpleTkSum" class=" margin-top-20">
                                            <p>简单：{{tk.sbgroupList.SimpleTkSum}} 普通：{{tk.sbgroupList.UsualTkSum}} 困难：{{tk.sbgroupList.HardTkSum}}</p>
                                        </div>
                                    </div>
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
                            <div class="margin-top-10">
                                <Button style="width:200px" @click="handlepapersave" type="primary">下一步</Button>
                            </div>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
        <!-- 第四步 -->
        <div :style="{ display:stepsStatus.four}">
            <examcmpts ref="examcmpts"></examcmpts>
        </div>
        <!-- 题库选择窗口 -->
        <Modal :mask-closable="false" @on-cancel="handlecancel" ok-text="确定" v-model="subjectmodal" :styles="{top: '20px'}" width="900"
            @on-ok="handleSaveSubject">
            <subjectcmpts :SubjecSubClass="SubjecSubClass" ref="subjectcmpts"></subjectcmpts>
        </Modal>
        <!-- 组卷方式窗口 -->
        <Modal :mask-closable="false" @on-cancel="handlecancelGroup" ok-text="确定" v-model="rdmmodal" width="600" @on-ok="handleSaveSubjectRule">
            <rdmgrouprule class="margin-top-20" ref="rdmgrouprule"></rdmgrouprule>
        </Modal>
    </div>
</template>
<script>
    import {
        DelPaperList,
        SavePaperList
    } from '@/api/paper';
    import util from '@/libs/util';
    import subjectcmpts from './components/subjectcmpts';
    import rdmgrouprule from './components/rdmgrouprule';
    import examcmpts from './components/examcmpts';
    export default {
        name: 'examedit',
        components: {
            subjectcmpts,
            rdmgrouprule,
            examcmpts
        },
        data () {
            return {
                current: 0,
                creatType: 0,
                tkkey: -1,
                formItem: {}, // 表单数据源
                data: [],
                Letter: util.Letter,
                subjectmodal: false, // 题库窗口打开状态
                rdmmodal: false, // 随机组卷窗口
                SubjecSubClass: -1,
                EditModeloading: true, // 编辑窗口确定按钮加载状态
                PaperTypeList: [], // 试卷分类集合
                checkSubjectData: [], // 所选择的试题库
                subjectTitleSel: [], // 题库(需要传入后台)
                paperinfo: [],
                groupStatus: {
                    xzStatus: 'none',
                    sjStatus: 'none'
                },
                examrqParam: { // 需要传入后台的参数
                    KeyID: 0,
                    PaperName: '', // 试卷名称
                    action: 'SavePaperList',
                    PaperType: '', // 试卷分类
                    TotalScore: 0, // 总分
                    SubjectNum: 0, // 总题数
                    AssemblyType: -1, // 组卷方式
                    PaperMode: '0', // 试卷类型
                    SubjectData: [] // 题库数据
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
        watch: {
            '$route': function (to, from) {
                console.log(to);
            },
            'subjectTitleSel': {
                // 深度监听，可监听到对象、数组分值，总题数的变化
                handler (val, oldVal) {
                    let score = 0; // 总分数
                    let sbsum = 0; // 总题数
                    let rdmscore = 0; //
                    for (let k = 0; k < val.length; k++) {
                        let sum = val[k].danxList.length + val[k].duoxList.length + val[k].pdList.length + val[k].tkList
                            .length + val[k].wdList.length;
                        sbsum += sum;
                        val[k].sTSelSum = sum;
                        if (val[k].sbgroupList && val[k].sbgroupList.SimpleTkSum) {
                            rdmscore += (val[k].Score * val[k].sbgroupList.SimpleTkSum) + (val[k].Score * val[k].sbgroupList
                                .UsualTkSum) + (val[k].Score * val[k].sbgroupList.HardTkSum);
                        }
                        for (let i = 0; i < val[k].danxList.length; i++) {
                            score += val[k].danxList[i].DefaultScore;
                            if (val[k].Score > 0) {
                                for (let j = 0; j < val[k].danxList.length; j++) {
                                    val[k].danxList[j].DefaultScore = val[k].Score;
                                }
                            }
                        }
                        for (let i = 0; i < val[k].duoxList.length; i++) {
                            score += val[k].duoxList[i].DefaultScore;
                            if (val[k].Score > 0) {
                                for (let j = 0; j < val[k].duoxList.length; j++) {
                                    val[k].duoxList[j].DefaultScore = val[k].Score;
                                }
                            }
                        }
                        for (let i = 0; i < val[k].pdList.length; i++) {
                            score += val[k].pdList[i].DefaultScore;
                            if (val[k].Score > 0) {
                                for (let j = 0; j < val[k].pdList.length; j++) {
                                    val[k].pdList[j].DefaultScore = val[k].Score;
                                }
                            }
                        }
                        for (let i = 0; i < val[k].tkList.length; i++) {
                            score += val[k].tkList[i].DefaultScore;
                            if (val[k].Score > 0) {
                                for (let j = 0; j < val[k].tkList.length; j++) {
                                    val[k].tkList[j].DefaultScore = val[k].Score;
                                }
                            }
                        }
                        for (let i = 0; i < val[k].wdList.length; i++) {
                            score += val[k].wdList[i].DefaultScore;
                            if (val[k].Score > 0) {
                                for (let j = 0; j < val[k].wdList.length; j++) {
                                    val[k].wdList[j].DefaultScore = val[k].Score;
                                }
                            }
                        }
                    }
                    this.subjectTitleSel = val;
                    // 设置总分数
                    this.examrqParam.TotalScore = score;
                    if (this.examrqParam.AssemblyType !== '10') {
                        this.examrqParam.TotalScore = rdmscore;
                    }
                    this.examrqParam.SubjectNum = sbsum;
                },
                deep: true
            }
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
                if (v >= this.current) return;
                if (this.validcontent(v)) {
                    return;
                };
                this.current = v;
                this.showView();
            },
            // 验证表单
            validcontent (val) {
                switch (val) {
                    case 0:
                        if (this.examrqParam.PaperName === '') {
                            this.$Message.error('请填写试卷名称');
                            return true;
                        }
                        if (this.examrqParam.PaperType === '') {
                            this.$Message.error('请选择试卷分类');
                            return true;
                        }
                        break;
                    case 1:
                        if (this.examrqParam.AssemblyType === -1) {
                            this.$Message.error('请选择组卷方式');
                            return true;
                        }
                        break;
                    case 2:
                        if (this.subjectTitleSel.length === 0 || (this.subjectTitleSel[0].danxList.length === 0 &&
                                this.subjectTitleSel[0].duoxList.length === 0 &&
                                this.subjectTitleSel[0].tkList.length === 0 &&
                                this.subjectTitleSel[0].pdList.length === 0 &&
                                !(this.subjectTitleSel[0].sbgroupList && this.subjectTitleSel[0].sbgroupList.SimpleTkSum)
                        )) {
                            this.$Message.error('请选择题库');
                            return true;
                        }
                        break;
                    case 3:

                        break;
                    default:
                        break;
                }
                return false;
            },
            // 下一步
            next () {
                if (this.validcontent(this.current)) {
                    return;
                };
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

            },
            // 判断提醒菜单点击
            handleTxMenu (name) {
                if (this.examrqParam.AssemblyType === '10') {
                    this.groupStatus.xzStatus = 'block';
                    this.groupStatus.sjStatus = 'none';
                } else {
                    this.groupStatus.xzStatus = 'none';
                    this.groupStatus.sjStatus = 'block';
                }
                let json = {
                    SubjecSubClassName: util.getSubjectTypeName(parseInt(name)),
                    Score: 0, // 分数
                    SubjecSubClass: parseInt(name), // 题型
                    Disorder: false, // 试题排序方式
                    OptionOrder: false, // 选项排序
                    sTSelSum: 0, // 每个大类题型有好多题
                    StemRk: util.getSubjectTypeName(parseInt(name)), // 题干描述
                    Isleak: false // 多选题是否允许漏选
                };
                json['danxList'] = [];
                json['duoxList'] = [];
                json['tkList'] = [];
                json['pdList'] = [];
                json['wdList'] = [];
                json['sbgroupList'] = {}; // 随机组卷题库全部数据
                this.subjectTitleSel.push(json);
                this.trboxStatus.show1 = 'none';
                this.trboxStatus.show2 = 'block';
            },
            // 选题组卷模式选择试题
            handleSelSubject (v, tkkey) {
                this.subjectmodal = true;
                this.SubjecSubClass = parseInt(v);
                this.tkkey = tkkey;
                let ids = '';
                let debarids = '';
                for (let k = 0; k < this.subjectTitleSel.length; k++) {
                    let checkdata = this.subjectTitleSel[k];
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
            // 删除试题大类
            removeSbTSel (key) {
                if (this.subjectTitleSel.length === 1) {
                    this.trboxStatus.show1 = 'block';
                    this.trboxStatus.show2 = 'none';
                }
                this.subjectTitleSel.splice(key, 1);
            },
            // 上移
            upmoveSbTSel (key) {
                if (key === 0) {
                    return;
                }
                this.subjectTitleSel = this.swapItems(this.subjectTitleSel, key, key - 1);
            },
            // 下移
            downmoveSbTSel (key) {
                if (key === this.subjectTitleSel.length - 1) {
                    return;
                }
                this.subjectTitleSel = this.swapItems(this.subjectTitleSel, key, key + 1);
            },
            // 移除数据
            remove (key, type, tkkey) {
                switch (type) {
                    case 11:
                        this.subjectTitleSel[tkkey].danxList.splice(key, 1);
                        break;
                    case 12:
                        this.subjectTitleSel[tkkey].duoxList.splice(key, 1);
                        break;
                    case 20:
                        this.subjectTitleSel[tkkey].pdList.splice(key, 1);
                        break;
                    case 30:
                        this.subjectTitleSel[tkkey].tkList.splice(key, 1);
                        break;
                    case 40:
                        this.subjectTitleSel[tkkey].wdList.splice(key, 1);
                        break;
                    default:
                        break;
                }
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
            // 上移
            upMove (key, type, tkkey) {
                if (key === 0) {
                    return;
                }
                let checkData = this.subjectTitleSel[tkkey];
                switch (type) {
                    case 11:
                        this.subjectTitleSel[tkkey].danxList = this.swapItems(checkData.danxList, key, key - 1);
                        break;
                    case 12:
                        this.subjectTitleSel[tkkey].duoxList = this.swapItems(checkData.duoxList, key, key - 1);
                        break;
                    case 20:
                        this.subjectTitleSel[tkkey].pdList = this.swapItems(checkData.pdList, key, key - 1);
                        break;
                    case 30:
                        this.subjectTitleSel[tkkey].tkList = this.swapItems(checkData.tkList, key, key - 1);
                        break;
                    case 40:
                        this.subjectTitleSel[tkkey].wdList = this.swapItems(checkData.wdList, key, key - 1);
                        break;
                    default:
                        break;
                }
            },
            // 下移
            downMove (key, type, tkkey) {
                let checkData = this.subjectTitleSel[tkkey];
                switch (type) {
                    case 11:
                        if (key === checkData.danxList.length - 1) {
                            return;
                        }
                        this.subjectTitleSel[tkkey].danxList = this.swapItems(checkData.danxList, key, key + 1);
                        break;
                    case 12:
                        if (key === checkData.duoxList.length - 1) {
                            return;
                        }
                        this.subjectTitleSel[tkkey].duoxList = this.swapItems(checkData.duoxList, key, key + 1);
                        break;
                    case 20:
                        if (key === checkData.pdList.length - 1) {
                            return;
                        }
                        this.subjectTitleSel[tkkey].pdList = this.swapItems(checkData.pdList, key, key + 1);
                        break;
                    case 30:
                        if (key === checkData.tkList.length - 1) {
                            return;
                        }
                        this.subjectTitleSel[tkkey].tkList = this.swapItems(checkData.tkList, key, key + 1);
                        break;
                    case 40:
                        if (key === checkData.wdList.length - 1) {
                            return;
                        }
                        this.subjectTitleSel[tkkey].wdList = this.swapItems(checkData.wdList, key, key + 1);
                        break;
                    default:
                        break;
                }
            },
            swapItems (arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            },
            // 创建方式监听
            handleCtTypechange (opt) {
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
                this.checkSubjectData = this.$refs.subjectcmpts.chekcData;
                let checkSubjectData = this.checkSubjectData;
                // 对选择的数据进行筛选处理
                switch (parseInt(this.SubjecSubClass)) {
                    case 11:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            checkSubjectData[i].SelectionOption = checkSubjectData[i].SelectionOption.split('|');
                            this.subjectTitleSel[this.tkkey].danxList.push(checkSubjectData[i]);
                        }
                        break;
                    case 12:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            checkSubjectData[i].SelectionOption = checkSubjectData[i].SelectionOption.split('|');
                            this.subjectTitleSel[this.tkkey].duoxList.push(checkSubjectData[i]);
                        }
                        break;
                    case 20:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            this.subjectTitleSel[this.tkkey].pdList.push(checkSubjectData[i]);
                        }
                        break;
                    case 30:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            this.subjectTitleSel[this.tkkey].tkList.push(checkSubjectData[i]);
                        }
                        break;
                    case 40:
                        for (let i = 0; i < checkSubjectData.length; i++) {
                            this.subjectTitleSel[this.tkkey].wdList.push(checkSubjectData[i]);
                        }
                        break;
                    default:
                        break;
                }
            },
            // 关闭窗口
            handlecancel () {
                this.$refs.subjectcmpts.clearData();
            },
            /** ********************************随机组卷方法**********************************************/
            // 随机组卷模式选择试题
            handleSelSubjectRule (v, tkkey) {
                this.rdmmodal = true;
                this.tkkey = tkkey;
                this.SubjecSubClass = parseInt(v);
                this.$refs.rdmgrouprule.setSumData(this.SubjecSubClass);
                if (this.subjectTitleSel[tkkey].sbgroupList && this.subjectTitleSel[tkkey].sbgroupList.SimpleTkSum) {
                    setTimeout(() => {
                        this.$refs.rdmgrouprule.setsubjectComSaveList(this.subjectTitleSel[tkkey].sbgroupList);
                    }, 100);
                }
            },
            // 关闭窗口
            handlecancelGroup () {
                this.$refs.rdmgrouprule.clearData();
            },
            // 随机组卷保存
            handleSaveSubjectRule () {
                let rdmgroupdata = this.$refs.rdmgrouprule.subjectComSaveList;
                this.subjectTitleSel[this.tkkey].sbgroupList = rdmgroupdata;
                this.$refs.rdmgrouprule.clearData();
            },
            // 试卷保存
            handlepapersave () {
                for (let i = 0; i < this.subjectTitleSel.length; i++) {
                    for (let j = 0; j < this.subjectTitleSel[i].danxList.length; j++) {
                        let json = {
                            KeyID: this.subjectTitleSel[i].danxList[j].KeyID,
                            DefaultScore: this.subjectTitleSel[i].danxList[j].DefaultScore
                        };
                        this.subjectTitleSel[i].danxList[j] = json;
                    }
                    for (let j = 0; j < this.subjectTitleSel[i].duoxList.length; j++) {
                        let json = {
                            KeyID: this.subjectTitleSel[i].duoxList[j].KeyID,
                            DefaultScore: this.subjectTitleSel[i].duoxList[j].DefaultScore
                        };
                        this.subjectTitleSel[i].duoxList[j] = json;
                    }
                    for (let j = 0; j < this.subjectTitleSel[i].pdList.length; j++) {
                        let json = {
                            KeyID: this.subjectTitleSel[i].pdList[j].KeyID,
                            DefaultScore: this.subjectTitleSel[i].pdList[j].DefaultScore
                        };
                        this.subjectTitleSel[i].pdList[j] = json;
                    }
                    for (let j = 0; j < this.subjectTitleSel[i].tkList.length; j++) {
                        let json = {
                            KeyID: this.subjectTitleSel[i].tkList[j].KeyID,
                            DefaultScore: this.subjectTitleSel[i].tkList[j].DefaultScore
                        };
                        this.subjectTitleSel[i].tkList[j] = json;
                    }
                    for (let j = 0; j < this.subjectTitleSel[i].wdList.length; j++) {
                        let json = {
                            KeyID: this.subjectTitleSel[i].wdList[j].KeyID,
                            DefaultScore: this.subjectTitleSel[i].wdList[j].DefaultScore
                        };
                        this.subjectTitleSel[i].wdList[j] = json;
                    }
                }
                this.examrqParam.SubjectData = JSON.stringify(this.subjectTitleSel);
                if (this.validcontent(this.current)) {
                    return;
                }
                SavePaperList(this.examrqParam).then(response => {
                    this.$Notice.success({
                        title: response.msg,
                        desc: '',
                        duration: 2
                    });
                    this.examrqParam.KeyID = response.value;
                    this.$refs.examcmpts.setPaperinfo(response.data);
                    this.next();
                });
            }
        }
    };
</script>