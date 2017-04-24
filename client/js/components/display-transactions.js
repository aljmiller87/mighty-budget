import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import DatePicker from 'react-bootstrap-date-picker';

export class DisplayTransactions extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.handleStartDateChange = this.handleStartDateChange.bind(this);
    	this.handleEndDateChange = this.handleEndDateChange.bind(this);
    	this.dateToNum = this.dateToNum.bind(this);
    	this.formatDate = this.formatDate.bind(this);
  	}

	handleChange(event) {
		let tempCategory = (this.refs.expenseCategory).value;
		this.props.dispatch(actions.changeCurrentCategory(tempCategory));
	}

	handleStartDateChange(value) {
		new Date(document.getElementById("start-datepicker").value);
		let tempDate = value;
		console.log("Testing get start date as number on change", tempDate);
		this.props.dispatch(actions.setStartDate(tempDate));
	}

	handleEndDateChange(value) {
		let tempDate = value;
		this.props.dispatch(actions.setEndDate(tempDate));
	}

	dateToNum(dateInISO) {
		let tempDate = new Date(dateInISO);
		let tempYear = tempDate.getFullYear();
		let tempMonth = tempDate.getMonth() + 1;
		let tempDay = tempDate.getDate();
		if (tempDay < 10) {
			tempDay = '0' + tempDay;
		}
		if (tempMonth < 10) {
			tempMonth = '0' + tempMonth;
		}
		return parseInt(tempYear + tempMonth + tempDay);
	}

	formatDate(dateInISO) {
		console.log("is this called?")
	    let month = (dateInISO.getMonth() + 1);
	    let day = (dateInISO.getDate());
	    let year = (dateInISO.getFullYear());
    	return month + "/" + day + "/" + year;
	}

	onSubmit(event) {
  		event.preventDefault();
		this.props.dispatch(actions.asyncFetchAllTransactions());
	}
	
	render() {
		let startDateAsNum = this.dateToNum(this.props.startDatePicked);

		let endDateAsNum = this.dateToNum(this.props.endDatePicked);

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		});
		let listOfTransactions;
		if (this.props.tempResults[0]) {
		
			if (this.props.currentCategory === "All") {
				listOfTransactions = this.props.tempResults[0].filter(transaction => {
					return (this.dateToNum(transaction.date) >= startDateAsNum)}).filter(transaction => {
					return (this.dateToNum(transaction.date) <= endDateAsNum)}).sort(function(a, b){
					    if(a.date < b.date) return -1;
					    if(a.date > b.date) return 1;
					    return 0;
					}).map((transaction, index) => {
					return (
					<tr key={index}><td>{transaction.date.slice(0,10)}</td><td>{transaction.category}</td><td>{transaction.cost}</td><td>{transaction.description}</td></tr>
					)
				})
			} else {
				listOfTransactions = this.props.tempResults[0].filter(transaction => {
					return (this.dateToNum(transaction.date) >= startDateAsNum)}).filter(transaction => {
					return (this.dateToNum(transaction.date) <= endDateAsNum)}).filter(transaction => {
					return (transaction.category == this.props.currentCategory)}).sort(function(a, b){
					    if(a.date < b.date) return -1;
					    if(a.date > b.date) return 1;
					    return 0;
					}).map((transaction, index) => {
						return (
							<tr key={index}><td><bold>{transaction.date.slice(0,10)}</bold></td><td><bold>{transaction.category}</bold></td><td><bold>{transaction.cost}</bold></td><td><bold>{transaction.description}</bold></td></tr>
						)
				})
			}
		


		}

	return (
		<div>
			<div className="page-header"><h3>Display Transactions</h3></div>
			<form onSubmit={this.onSubmit}>
				<label>By Category</label>
				<select name="expenseCategory" id='expenseCategory' className="form-control" value={this.value} ref="expenseCategory" onChange={this.handleChange} required>
					<option value="All">All</option>					
					{options}
				</select>
				<label className="datePicker">Start Date</label>
				<DatePicker  id="start-datepicker" value={this.props.startDatePicked} onChange={this.handleStartDateChange} />
				<label className="datePicker">End Date</label>
				<DatePicker  id="end-datepicker" value={this.props.endDatePicked} onChange={this.handleEndDateChange} />
				<p></p>
				<input type="submit" className="btn btn-primary"/>
			</form>
			<div>
			<table className="table table-striped">
				<thead><tr><th>Date</th><th>Category</th><th>Amount</th><th>Description</th></tr></thead>
				<tbody>
					{listOfTransactions}
				</tbody>
			</table>
			</div>
		</div>
	)}
}


const mapStateToProps = (state, props) => ({
	categories: state.categories,
	tempResults: state.tempResults,
	currentCategory: state.currentCategory,
	startDatePicked: state.startDatePicked,
	endDatePicked: state.endDatePicked
});


export default connect(mapStateToProps)(DisplayTransactions);