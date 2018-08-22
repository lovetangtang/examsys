<template>
    <div>
        <Card>
            <div class="head-btn">
                <Button @click="handleExport" type="primary" icon="ios-upload-outline">导出信息</Button>
                 <Button type="primary" icon="ios-search" @click="fetchData">刷新</Button>
            </div>
            <div class="box-content margin-top-20">
                <div class="tab-content">
                    <Table size="small" :loading="loading" highlight-row border :columns="columns" :data="data" ref="table" ></Table>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import {
        GetExamScoreAlys
    } from '@/api/examalys';
    import util from '@/libs/util';
    export default {
        name: 'exam_paper',
        data () {
            return {
                EditModeloading: true,
                autMode: false,
                loading: true, // 表格加载状态
                tableHeight: 120, // 表格高度
                total: null, // 表格数据总条数
                listQuery: { // 查询条件
                    ExamName: '',
                    action: 'GetWrongSubject'
                },
                rules: {
                    UserID: [{
                        required: true,
                        message: '用户工号不能为空',
                        trigger: 'blur'
                    }]
                },
                columns: [ {
                    title: '题目ID',
                    width: 80,
                    key: 'sujectId'
                },
                {
                    title: '题型',
                    width: 78,
                    sortable: true,
                    key: 'SubjecSubClass',
                    render: (h, params) => {
                        let sc = params.row.SubjecSubClass;
                        let v = util.getSubjectTypeName(sc);
                        return v;
                    }
                }, {
                    title: '题干',
                    key: 'Stem'
                }, {
                    title: '难度',
                    sortable: true,
                    width: 78,
                    key: 'Degree',
                    render: (h, params) => {
                        let sc = params.row.Degree;
                        let v = util.getSubjectDegree(sc);
                        return v;
                    }
                }, {
                    title: '错误次数',
                    width: 110,
                    sortable: true,
                    key: 'wrongSum'
                }],
                data: []
            };
        },
        // 在模板渲染成html后调用,对html操作
        mounted () {
            this.init();
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
            // 刷新数据
            fetchData () {
                try {
                    this.loading = true;
                    GetExamScoreAlys(this.listQuery).then(response => {
                        this.data = response.data;
                        this.loading = false;
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            // 导出信息
            handleExport () {
                this.$refs.table.exportCsv({
                    filename: this.listQuery.ExamName + '-统计信息',
                    original: false
                });
            }
        }
    };
</script>