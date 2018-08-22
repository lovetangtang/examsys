<style lang="less">
    @import '../../styles/common.less';
    @import "./examanalysis.less";
</style>
<template>
    <div>

        <div span="12" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <div class="margin-bottom-20">
                <label for="">考试名称：</label>
                <AutoComplete v-model="ExamName" @on-select="handleselectexam" clearable :data="data" icon="ios-search" :filter-method="filterMethod"
                    placeholder="考试名称" style="width:200px">
                </AutoComplete>
            </div>
            <Tabs type="card" @on-click="handletabchange">
                <TabPane label="统计信息">
                    <examtablealys ref="examtablealys"></examtablealys>
                    <scoreecharts ref="scoreecharts" class="margin-top-20"></scoreecharts>
                </TabPane>
                <TabPane :disabled='dismyscore' label="考生信息">
                    <examalys ref="examalys">
                    </examalys>
                </TabPane>
                <TabPane :disabled='dismyscore' label="错题top榜">
                    <wrongsubject ref="wrongsubject"></wrongsubject>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import examalys from './components/examalys';
    import scoreecharts from './components/scoreecharts';
    import examtablealys from './components/examtablealys';
    import wrongsubject from './components/wrongsubject';
    import {
        GetList
    } from '@/api/examalys';
    export default {
        name: 'exam_paper',
        components: {
            examalys,
            scoreecharts,
            examtablealys,
            wrongsubject
        },
        data () {
            return {
                value3: '',
                ExamName: '',
                dismyscore: true,
                data: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive']
            };
        },
        watch: {
            'ExamName': function (to, from) {
                if (to !== '' && to !== undefined) {
                    this.dismyscore = false;
                } else {
                    this.dismyscore = true;
                    this.$refs.examalys.listQuery.ExamName = '-1';
                    this.$refs.examalys.fetchData();
                    this.$refs.scoreecharts.disposeData();
                    this.$refs.wrongsubject.listQuery.ExamName = '';
                    this.$refs.wrongsubject.fetchData();
                }
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
                // 设置表格高度
                this.$nextTick(() => {});
            },
            fetchData () {
                let rabody = {
                    action: 'GetExamComBoxList'
                };
                GetList(rabody).then(response => {
                    this.data = response.data;
                });
            },
            filterMethod (value, option) {
                return option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1;
            },
            // 选择考试
            handleselectexam (value) {
                this.$refs.examalys.listQuery.ExamName = value;
                this.$refs.examalys.fetchData();
                this.$refs.examtablealys.listQuery.ExamName = value;
                this.$refs.examtablealys.fetchData();
                this.$refs.wrongsubject.listQuery.ExamName = value;
                this.$refs.wrongsubject.fetchData();
                this.$refs.scoreecharts.listQuery.ExamName = value;
                this.$refs.scoreecharts.init();
            },
            // 切换选项卡
            handletabchange (name) {

            }
        }
    };
</script>