import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import {
    getProductDetail,
} from '../../actions';

import ResponsiveLineChart from "../ui/chart-line";


class ProductDetails extends Component {

    static defaultProps = {
        label: 'default',
        productDetailData: [],
        productChartData: [],
    };

    state = {
        partItem: [],
        chartData: [],
        chartDataCurrentMonth: [],
        chartDataDayCnt: 0,
        chartDataRollingAverage: 0,
        hasChartData: false,
        monthDate: 'No Date',
    };


    constructor(props) {
        super(props);
        this.updateChartData = this.updateChartData.bind(this);
        this.calculateRollingAverage = this.calculateRollingAverage.bind(this);
        this.movingAvg = this.movingAvg.bind(this);
        this.props.getProductDetail(this.props.partId);
    }

    componentWillMount() {
        // console.log('--=componentWillMount');
    }


    componentDidMount() {
        // console.log('--=componentDidMount');
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.productDetailData !== this.props.productDetailData) {
            this.getChartData();
        }
    }


    movingAvg = (salesData, averageDays) => {
        let moveMean = [];

        for (let i = 0; i < salesData.length; i++) {

            let end = (i === 0) ? ((i + averageDays) -1) : (i + averageDays);
            let start = i + 1;
            let range = _.slice(salesData, start, end);
            let tail = _.reduce(range, function (total, n) {
                return total + n;
            });

            let mean = (salesData[i] + tail) / averageDays;
            moveMean.push(mean);

            console.log('---sum', `${salesData[i]} + ${tail} / ${averageDays} = ${mean}`);
        }

        return moveMean;
    };



    calculateRollingAverage = (chartDataCurrentMonthCurrent, averageDays) => {
        console.log('=--+calculateRollingAverage', chartDataCurrentMonthCurrent, averageDays);

        const flat = _.map(chartDataCurrentMonthCurrent, function (item) {
            return item.y;
        });

        const xAxis = _.map(chartDataCurrentMonthCurrent, function (item) {
            return item.x;
        });

        const monthTotal = _.reduce(flat, function (total, n) {
            return total + n;
        });

        const monthlyAverage = monthTotal / flat.length;
        const movingAvgData = this.movingAvg(flat, averageDays);


        const averageChartData = xAxis.map((day, i) => {
            return {"x": day, "y": (movingAvgData[i] || 0)}
        });


        // console.log('=--+flat', flat);
        // console.log('=--+xAxis', xAxis);
        // console.log('=--+monthTotal', monthTotal);
        // console.log('=--+monthlyAverage', monthlyAverage);
        // console.log('=--+averageChartData', averageChartData);

        return averageChartData;
    };


    updateChartData = (chartDataCurrentMonthCurrent, monthDate, part) => {

        const av3days = this.calculateRollingAverage(chartDataCurrentMonthCurrent, 3);
        const av5days = this.calculateRollingAverage(chartDataCurrentMonthCurrent, 5);
        const av7days = this.calculateRollingAverage(chartDataCurrentMonthCurrent, 7);


        this.setState({
            chartDataCurrentMonth: [...chartDataCurrentMonthCurrent],
            monthDate: monthDate,
            chartDataDayCnt: chartDataCurrentMonthCurrent.length,
            partItem: [
                {
                    id: part.part_description,
                    data: chartDataCurrentMonthCurrent,
                },
                {
                    id: '3 Day Rolling Average',
                    data: av3days,
                },
                {
                    id: '5 Day Rolling Average',
                    data: av5days,
                },
                {
                    id: '7 Day Rolling Average',
                    data: av7days,
                },
            ],
        });
    };


    getChartData() {
        const {productDetailData, part, partId} = this.props;
        const today = moment().add(1, 'day').format('YYYY-MM-DD');
        const lastMonth = moment().subtract(1, 'month').add(1, 'day').format('YYYY-MM-DD');

        let chartDataCurrentMonthCurrent = [];
        let monthDate = moment(productDetailData[partId][0].transactionDate).format('ll').toString();


        Object.keys(productDetailData[partId]).map((items, i) => {
            const partItem = productDetailData[partId][items];

            let transactionDate = moment(partItem.TransactionDate).format('YYYY-MM-DD');
            let afterLastMonth = moment(transactionDate).isAfter(lastMonth, 'day');
            let beforeTomorrow = moment(transactionDate).isBefore(today, 'day');
            let day = moment(transactionDate).format('D');
            let data = {"x": day, "y": partItem.Sales};


            if (afterLastMonth && beforeTomorrow) {
                chartDataCurrentMonthCurrent = [...chartDataCurrentMonthCurrent, data];
            }

            return (data);
        });


        this.updateChartData(chartDataCurrentMonthCurrent, monthDate, part);
        this.setState({hasChartData: true});

    };


    renderDetails() {
        const {productDetailData, partId} = this.props;
        const {chartDataCurrentMonth, partItem, monthDate} = this.state;
        const hasSalesData = !!(productDetailData[partId] && chartDataCurrentMonth);
        const loaderStyle = {
            marginBottom: '1rem',
        };
        const graphStyle = {
            paddingBottom: '10px',
            height: '350px',
        };

        if (hasSalesData) {
           return (
                <div className="row">
                    <div className="fifteen wide column" style={graphStyle}>
                        <ResponsiveLineChart data={partItem} monthDate={monthDate}/>
                        {/*<ResponsiveBarChart data={barData}/>*/}
                    </div>
                    {/*<div className="two wide column" style={graphStyle}>Side-bar</div>*/}
                </div>
            );
        } else {
            return (
                <div className="ui centered active inline loader" style={loaderStyle}></div>
            )
        }

    }


    render() {

        const listStyle = {
            paddingBottom: '10px',
        };

        return (
            <div className="ui container five column grid vertically divided" style={listStyle}>
                {/*<div className="row">*/}
                {/*    <div className="two wide column" style={rowStyle}>PartId</div>*/}
                {/*    <div className="five wide column" style={rowStyle}>Sales</div>*/}
                {/*    <div className="five wide column" style={rowStyle}>Transaction Date</div>*/}
                {/*</div>*/}

                {this.renderDetails()}
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        productDetailData: state.product.productDetailData,
    };
};


export default connect(
    mapStateToProps,
    {getProductDetail}
)(ProductDetails);

