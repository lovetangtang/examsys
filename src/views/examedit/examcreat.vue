<style lang="less">
    @import '../../styles/common.less';
    @import './examcreat.less';
</style>
<template>
    <div class="margin-top-30">
        <Steps :current="current">
            <Step title="第一步：创建试卷"></Step>
            <Step title="第二步：组卷方式"></Step>
            <Step title="第三部：添加试卷"></Step>
            <Step title="第四步：发布考试"></Step>
        </Steps>
        <div v-bind:style="{ display:stepsStatus.one}">
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
                            <Input style="width:260px" v-model="examrqParam.PaperType" placeholder=""></Input>
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
                        <div class="margin-top-10">
                            <Button @click="handleSelectPaper" type="ghost">选择试卷</Button>
                        </div>
                        <div class="margin-top-10">
                            <Button style="width:200px" @click="next" type="primary">下一步</Button>
                        </div>
                    </div>
                </Card>
            </RadioGroup>
        </div>
        <div v-bind:style="{ display:stepsStatus.two}">
            <RadioGroup @on-change="handleCtTypechange" style="width:100%" v-model="creatType" vertical>
                <Card class="card-usual">
                    <Radio label="0">
                        <span>从试题库中选题</span>
                    </Radio>
                    <Form class="margin-top-10" v-bind:style="{ display:showStauts.one}" :model="formItem" :label-width="80">
                        <FormItem label="组卷方式">
                            <RadioGroup vertical="false" style="width:260px" verti v-model="examrqParam.PaperName">
                                <Radio label="10"><span>定向随机</span></Radio>
                                <Radio label="20"><span>系统随机</span> </Radio>
                                <Radio label="30"><span>抽题组卷</span></Radio>
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
                        <FormItem label="试题分类">
                            <Input style="width:260px" v-model="examrqParam.PaperType" placeholder=""></Input>
                        </FormItem>
                        <div class="margin-top-10">
                            <Button style="width:200px" @click="next" type="primary">下一步</Button>
                        </div>
                    </div>
                </Card>
            </RadioGroup>
        </div>
    </div>
</template>
<script>
    import {
        GetList,
        DelPaperList
    } from '@/api/paper';
    export default {
        name: 'examedit',
        components: {},
        data () {
            return {
                current: 0,
                creatType: 0,
                formItem: {}, // 表单数据源
                data: [],
                examrqParam: {
                    PaperName: '', // 试卷名称
                    PaperType: '', // 试卷分类
                    AssemblyType: ''// 组卷方式
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
                this.$nextTick(() => {});
            },
            next () {
                if (this.current === 3) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
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

            }
        }
    };
</script>