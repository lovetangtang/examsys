<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';
import {
    GetEchartsScorAlys
} from '@/api/examalys';
export default {
    name: 'dataSourcePie',
    data () {
        return {
            listQuery: { // 查询条件
                ExamName: '',
                action: 'GetEchartsScorAlys',
                dataSourcePie: null
            }
        };
    },
    mounted () {
        this.$nextTick(() => {

        });
    },
    methods: {
        init () {
            this.dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            GetEchartsScorAlys(this.listQuery).then(response => {
                let etdata = response.data;
                const option = {
                    title: {
                        text: this.listQuery.ExamName + '-分数人数占比',
                        subtext: '',
                        x: 'center'
                    },
                    // tooltip: {
                    //    trigger: 'item',
                    //    formatter: "{a} <br/>{b}: {c} ({d}%)"
                    // },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: etdata.ScorePhaseArry
                    },
                    series: [
                        {
                            name: '人数占比',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        // abg: {
                                        //     backgroundColor: '#333',
                                        //     width: '100%',
                                        //     align: 'right',
                                        //     height: 22,
                                        //     borderRadius: [4, 4, 0, 0]
                                        // },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            data: etdata.list
                        }
                    ]
                };
                this.dataSourcePie.setOption(option);

                window.addEventListener('resize', function () {
                    this.dataSourcePie.resize();
                });
            });
        },
        disposeData () {
            this.dataSourcePie.clear();
            this.dataSourcePie.dispose();
        }
    }
};
</script>
