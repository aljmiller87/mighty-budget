import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import DatePicker from 'react-bootstrap-date-picker';

export class CategoryGoals extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.dateToNum = this.dateToNum.bind(this);
    	this.handleStartDateChange = this.handleStartDateChange.bind(this);
    	this.handleEndDateChange = this.handleEndDateChange.bind(this);
  	}

  	componentDidMount() {
  		// this.props.dispatch(actions.asyncFetchAllCategories());
  		// this.props.dispatch(actions.asyncFetchAllTransactions());
  		// this.props.dispatch(actions.asyncFetchAllGoals());
  	}

  	handleStartDateChange(value) {
		new Date(document.getElementById("start-datepicker").value);
		let tempDate = value;
		this.props.dispatch(actions.setStartDate(tempDate));
	}

	handleEndDateChange(value) {
		let tempDate = value;
		this.props.dispatch(actions.setEndDate(tempDate));
	}


	onSubmit(event) {
  		event.preventDefault();
  		if ((this.refs.expenseCategory).value.trim() === "Select") {
  			this.refs.dollars.value = "";
  			return ;
  		} else {
	  		let categoryAmount = parseInt((this.refs.dollars).value.trim());
	        let goalCategory = (this.refs.expenseCategory).value.trim();
			let goalIndex = -1;
			for (let i = 0; i < this.props.goals.length; i++) {
				if ((this.props.goals[i].category) === goalCategory) {
					goalIndex = i;
				}
	  		}
			if (goalIndex === -1) {
				this.props.dispatch(actions.asyncAddCategoryGoal(goalCategory,categoryAmount));
			}
			this.refs.dollars.value = "";
		}
	};

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

	render() {

		let totalExpenses = {}
		let divStyle = {width: '60%'}
		
		for (let i=0; i<this.props.categories.length; i++) {
			let temp = this.props.categories[i].name;
			totalExpenses[temp] = 0;
			for(let k=0; k<this.props.expenses[0].length; k++){
				let newTemp = this.props.expenses[0];
				if (newTemp[k].category === temp && this.dateToNum(newTemp[k].date) >= this.dateToNum(this.props.startDate) && this.dateToNum(newTemp[k].date) <= this.dateToNum(this.props.endDate)) {
					totalExpenses[temp] += newTemp[k].cost;
				}
			}
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		})
		let goals = this.props.goals.sort(function(a, b){
		    if(a.category < b.category) return -1;
		    if(a.category > b.category) return 1;
		    return 0;
		}).map((goal,index)=>{
			let otherTemp = goal.category;
			let percentageVal;
			if (Math.floor((totalExpenses[otherTemp]/goal.goal) * 100) > 100) {
				percentageVal = 100
			} else {
				percentageVal = Math.floor((totalExpenses[otherTemp]/goal.goal) * 100)
			}
			let divStyle = {width: `${percentageVal}%`}
			return (
				<div key={index}>
					<table className="table"><tbody>
						<tr><td>{goal.category}</td><td>{goal.goal}</td><td>{totalExpenses[otherTemp]}</td></tr>
					</tbody></table>
					<div className="progress">
				    	<div className="progress-bar" role="progressbar" aria-valuenow="{percentageVal}" aria-valuemin="0" aria-valuemax="100" style={divStyle}>
				    		{percentageVal}%
				    	</div>
					</div>
				</div>
			);
		})

	return (
		<div className="mighty-budget">
			<div className="page-header"><h3>Category Goals</h3></div>
			<div >
				<h4>Add New Goal:</h4>
				<form onSubmit={this.onSubmit} >
					<label>Expense Category</label>
						<select className="form-control" name="expenseCategory" id='expenseCategory' ref="expenseCategory" required>
							<option default>Select</option>
							{options}
						</select>
						<p></p>
					<label>Category Amount</label>
						<input type="text" className="form-control" placeholder="Enter dollar amount" ref="dollars" required />
						<p></p>
						<input type="submit" className="btn btn-primary"/>
					
				</form>
			</div>
			<div>
				<h4>Select Date Range To Analyze</h4>
				<label className="datePicker">Start Date</label>
				<DatePicker  id="start-datepicker" value={this.props.startDatePicked} onChange={this.handleStartDateChange} />
				<label className="datePicker">End Date</label>
				<DatePicker  id="end-datepicker" value={this.props.endDatePicked} onChange={this.handleEndDateChange} />
			</div>
			<div>
				<div>
					<table className="table table-striped">
						<thead><tr><th><h4>Category</h4></th><th><h4>Goal</h4></th><th><h4>Actual</h4></th></tr></thead>
					</table>
					{goals}
				</div>
				
			</div>
		</div>

	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses,
	startDate: state.startDatePicked,
	endDate: state.endDatePicked
});

export default connect(mapStateToProps)(CategoryGoals);