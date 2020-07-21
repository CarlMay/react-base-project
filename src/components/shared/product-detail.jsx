import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {
    getProductDetail,
} from '../../actions';

import ResponsiveLineChart from "../ui/chart-line";
// import ResponsiveBarChart from "../ui/chart-bar";
// import ProductItem from "../content/productList";


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
        // console.log('--=constructor');
        super(props);
        this.updateChartData = this.updateChartData.bind(this);
        this.props.getProductDetail(this.props.partId);
    }

    componentWillMount() {
        // console.log('--=componentWillMount');
        // if (this.props.productDetailData[this.props.partId]) {
        //     this.getChartData();
        // }
    }


    componentDidMount() {
        // console.log('--=componentDidMount');
        // if (this.props.productDetailData[this.props.partId]) {
        //     this.getChartData();
        // }
        // console.log('--=componentDidMount::partId', this.props.partId);
        // this.props.getProductDetail(this.props.partId);
        // this.getChartData();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('--=componentDidUpdate');
        // only update chart if the data has changed
        if (prevProps.productDetailData !== this.props.productDetailData) {
            // console.log('--=updated props productDetailData', this.props.productDetailData);
            this.getChartData();
            this.calculateRollingAverage();
        }
        // if (prevState.chartDataCurrentMonth !== this.state.chartDataCurrentMonth) {
        //     // console.log('--=updated state chartDataCurrentMonth', this.state.chartDataCurrentMonth);
        //     // this.getChartData();
        //     this.calculateRollingAverage();
        // }
    }


    updateChartData = (chartDataCurrentMonthCurrent, monthDate, part) => {
        // console.log('=--+updateChartData', chartDataCurrentMonthCurrent, monthDate, part);
        this.setState({
            chartDataCurrentMonth: [...chartDataCurrentMonthCurrent],
            monthDate: monthDate,
            chartDataDayCnt: chartDataCurrentMonthCurrent.length,
            partItem: [{
                id: part.part_description,
                color: 'hsl(296, 70%, 50%)',          // update value of specific key
                data: chartDataCurrentMonthCurrent,
            }],
        });
    };

    calculateRollingAverage() {
        // const {chartDataCurrentMonth} = this.state;
        // console.log('--=calculateRollingAverage state', this.state);
        // console.log('--=calculateRollingAverage chartDataCurrentMonth', this.state.chartDataCurrentMonth);
        // console.log('--=calculateRollingAverage productDetailData', this.props.productDetailData);
        // console.log('--=calculateRollingAverage chartDataDayCnt', this.props.chartDataDayCnt);

        this.setState(prevState => ({
            chartDataCurrentMonth: [...prevState.chartDataCurrentMonth],
            // chartDataCurrentMonth: [...previousState.chartDataCurrentMonth, 'new value']
            // chartDataCurrentMonth : prevState.chartDataCurrentMonth.concat([data]),
            // chartDataDayCnt: prevState.chartDataCurrentMonth.length,
            // chartDataDayCnt: prevState.partItem['data'],
            chartDataDayCnt: prevState.chartDataDayCnt,
        }));

        // console.log('--=chartDataCurrentMonth', this.state.chartDataCurrentMonth);
        // console.log('--=chartDataDayCnt', this.state.chartDataDayCnt);
        // console.log('--=partItem', this.state);


    }


    getChartData() {
        const {productDetailData, part, partId} = this.props;
        const today = moment().add(1, 'day').format('YYYY-MM-DD');
        const lastMonth = moment().subtract(1, 'month').add(1, 'day').format('YYYY-MM-DD');

        let chartDataCurrentMonthCurrent = [];
        let monthDate = moment(productDetailData[partId][0].transactionDate).format('ll').toString();

        // console.log('---getChartData productDetailData[partId]', productDetailData[partId]);
        // console.log('---getChartData productDetailData[partId]', moment(productDetailData[partId][0].TransactionDate).format('DD-MMM'));
        // console.log('---getChartData productDetailData[partId] length', productDetailData[partId].length);
        // console.log('---getChartData chartDataDayCnt', this.state.chartDataDayCnt);
        // console.log('--=chartDataDayCnt', this.state.chartDataDayCnt);


        Object.keys(productDetailData[partId]).map((items, i) => {
            // console.log('---+items', items);
            // console.log('---+productDetailData[partId][items]', productDetailData[partId][items]);
            const partItem = productDetailData[partId][items];

            let transactionDate = moment(partItem.TransactionDate).format('YYYY-MM-DD');
            // let monthDate = moment(transactionDate).format('ll').toString();
            let afterLastMonth = moment(transactionDate).isAfter(lastMonth, 'day');
            let beforeTomorrow = moment(transactionDate).isBefore(today, 'day');
            let day = moment(transactionDate).format('D');

            let data = {"x": day, "y": partItem.Sales};


            // console.log('---transactionDate:', transactionDate);
            // console.log('---lastMonth:', lastMonth);
            // console.log('---afterLastMonth:', afterLastMonth);
            // console.log('---beforeTomorrow:', beforeTomorrow);

            if (afterLastMonth && beforeTomorrow) {
                // this.setState(prevState => ({
                //     ...prevState,
                //     chartDataCurrentMonth : prevState.chartDataCurrentMonth[data],
                // }));

                // this.setState(prevState => ({
                //     // ...prevState.chartDataCurrentMonth,
                //     chartDataCurrentMonth: [...prevState.chartDataCurrentMonth, data],
                //     // chartDataCurrentMonth: prevState.chartDataCurrentMonth.concat([data]),
                //     monthDate: monthDate,
                //     chartDataDayCnt: prevState.chartDataDayCnt + 1,
                // }));

                chartDataCurrentMonthCurrent = [...chartDataCurrentMonthCurrent, data];

                // this.setState(state => {
                //     state.chartDataCurrentMonth = [...state.chartDataCurrentMonth, data];
                //     state.monthDate = monthDate;
                // });



                // data = {"x": day, "y": item.Sales};
            }


            return (data);

        });

        // this.setState(state => {
        //     state.chartDataCurrentMonth = [...state.chartDataCurrentMonth, chartDataCurrentMonth];
        //     state.monthDate = monthDate;
        //     state.chartDataDayCnt = chartDataCurrentMonth.length;
        //     state.partItem =  [{
        //         id: part.part_description,
        //         color: 'hsl(296, 70%, 50%)',          // update value of specific key
        //         data: state.chartDataCurrentMonth[0],
        //     }]
        // });

        // this.setState({
        //     chartDataCurrentMonth: [...chartDataCurrentMonthCurrent],
        //     monthDate: monthDate,
        //     chartDataDayCnt: chartDataCurrentMonthCurrent.length,
        //     partItem: [{
        //         id: part.part_description,
        //         color: 'hsl(296, 70%, 50%)',          // update value of specific key
        //         data: chartDataCurrentMonthCurrent[0],
        //     }],
        // });

        console.log('--=chartDataCurrentMonthCurrent', chartDataCurrentMonthCurrent);
        this.updateChartData(chartDataCurrentMonthCurrent, monthDate, part);
        // console.log('--=chartDataCurrentMonth.length', chartDataCurrentMonth.length);
        // console.log('--=this.state', this.state);
        // console.log('---salesItems', salesItems);
        // console.log('---today', today);
        // console.log('---lastMonth', lastMonth);
        // console.log('---salesItems', salesItems);


        // this.setState(prevState => ({
        //     partItem: [{
        //         id: part.part_description,
        //         color: 'hsl(296, 70%, 50%)',          // update value of specific key
        //         data: prevState.chartDataCurrentMonth,
        //     }]
        // }));

        // this.calculateRollingAverage();

        this.setState({hasChartData: true});

        // });
    };


    renderDetails() {
        const {productDetailData, partId} = this.props;
        const {chartDataCurrentMonth, partItem, monthDate} = this.state;

        // console.log('---props', this.props);
        // console.log('---part', part);
        // console.log('---productDetailData', productDetailData);
        // console.log('---productDetailData.partId', productDetailData[partId]);
        // console.log('---productDetailData.partId eval', !!(productDetailData[partId]));
        // console.log('---productDetailData.partId eval length', (!!(productDetailData[partId].length) || false));
        // console.log('---partId', partId);
        // console.log('---partItem', partItem);

        const hasSalesData = !!(productDetailData[partId] && chartDataCurrentMonth);
        const loaderStyle = {
            marginBottom: '1rem',
        };
        const graphStyle = {
            paddingBottom: '10px',
            height: '350px',
        };


        // console.log('---hasSalesData', hasSalesData);


        if (hasSalesData) {
            // this.getChartData();
            console.log('---state', this.state);
            console.log('---productDetailData', productDetailData);
            // console.log('---data', data);

            return (
                <div className="row">
                    <div className="thirteen wide column" style={graphStyle}>
                        <ResponsiveLineChart data={partItem} monthDate={monthDate}/>
                        {/*<ResponsiveBarChart data={barData}/>*/}
                    </div>
                    <div className="two wide column" style={graphStyle}>Side-bar</div>
                </div>
            );
        } else {
            return (
                <div className="ui centered active inline loader" style={loaderStyle}></div>
            )
        }

        // hasSalesData &&
        // productDetailData.map((sales, i) => {
        //     const {PartId, Sales, TransactionDate} = sales;
        //     const rowStyle = {
        //         marginBottom: 0,
        //         marginTop: 0,
        //     };
        //
        //     return (
        //         <div className="row" key={i}>
        //             <div className="two wide column" style={rowStyle}>{PartId}</div>
        //             <div className="five wide column" style={rowStyle}>{Sales}</div>
        //             <div className="five wide column" style={rowStyle}>{TransactionDate}</div>
        //         </div>
        //     );
        // })

    }


    render() {

        // console.log('--=render');

        // const {productDetailData, partId} = this.props;
        // const {hasChartData} = this.state;


        // const rowStyle = {
        //     marginBottom: 0,
        //     marginTop: 0,
        // };

        const listStyle = {
            paddingBottom: '10px',
        };

        // if (productDetailData[partId] && !hasChartData) {
        //     this.getChartData();
        // }


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
    // console.log('---getProductDetail state', state);
    return {
        productDetailData: state.product.productDetailData,
    };
};


export default connect(
    mapStateToProps,
    {getProductDetail}
)(ProductDetails);

