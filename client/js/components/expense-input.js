import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import DatePicker from 'react-bootstrap-date-picker';
import Store from '../store';

export class ExpenseInput extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.componentDidUpdate = this.componentDidUpdate.bind(this);
  	}

  	handleChange(value, formattedValue) {
    	console.log({
    	  value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
     	 formattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
    	})
   	}

  componentDidUpdate() {
    // Access ISO String and formatted values from the DOM. 
    var hiddenInputElement = document.getElementById("example-datepicker");
}

  	onSubmit(event) {
  		event.preventDefault();
  		if ((this.refs.expenseCategory).value.trim() === "Select") {
  			this.refs.dollars.value = "";
		    this.refs.description.value = "";
  			return ;
  		} else {
	  		let expenseDollars = parseInt((this.refs.dollars).value.trim());
	        let expenseCategory = (this.refs.expenseCategory).value.trim();
	        
	        let expenseDescription = (this.refs.description).value.trim();
	        let dateSelected = document.getElementById("example-datepicker").getAttribute('value');
	        let date = new Date(document.getElementById("example-datepicker").value);
	    	let year = date.getFullYear();
			let month = date.getMonth()+1;
			let dt = date.getDate();
			if (dt < 10) {
	  			dt = '0' + dt;
			}
			if (month < 10) {
				month = '0' + month;
			}
			let dateAsNum = parseInt(year+month+dt);
			console.log("DATE AS NUM", dateAsNum);
		    this.props.dispatch(actions.asyncAddExpense(expenseDollars, expenseCategory, expenseDescription, dateSelected, dateAsNum));
		    this.refs.dollars.value = "";
		    this.refs.expenseCategory.value = "";
		    this.refs.description.value = "";
		}
	}

  	render() {		
		let options = this.props.categories.map((category,index)=>{
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		})

		return (
			<div>
				<div className="page-header"><h3>Expense Input</h3></div>
				<div>
					<form onSubmit={this.onSubmit}>
						<label className="datePicker">Select a Date</label>
						<DatePicker  id="example-datepicker" value={new Date().toISOString()} ref="datePicked" onChange={this.handleChange} />
						<label> Expense Amount </label>
						<input type="text" className="form-control" ref="dollars"required/>


						<label className="category" >Expense Category</label>
	      					<select name="expenseCategory" id='expenseCategory' className="form-control" value={this.value} ref="expenseCategory" required>
	      						<option default>Select</option>
	      						{options}
	        				</select>

						<label> Expense Description </label>
						<input type="text" className="form-control" ref="description" required/>
						<p></p>
						<input type="submit" className="btn btn-primary"/>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories
});

export default connect(mapStateToProps)(ExpenseInput);
