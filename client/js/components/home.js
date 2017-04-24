import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';


export class Home extends React.Component {
	constructor(props) {
    	super(props);
    	
  	}

	render() {

	return (
		<div>
			<h3>Introduction to MintLite</h3>
			<p>If you are a first time user, I would recommend reading the below introduction</p>
			<h3></h3>
			<h4>Categories</h4>
			<p> Categories are your starting place. Every future expense or financial goal will relate to a category. To create a category, select the Category tab above. Categories can be as specific or all encompasing as you would like</p>
			<p></p>
			<p>The Category tab also lists all current categories created by you.</p>
			<h3></h3>
			<h4>Expenses</h4>
			<p>To add a new expense, select the New Expense tab above. You will be asked to select the corresponding category under which the expense will fall. You will also be asked for the date of the transaction, the dollar amount of the transaction, and an optional note for your records.</p>
			<p></p>
			<p>To view your expenses, please select the Transactions tab above. You will be asked to enter a start date and end date of transactions you are looking for. In addition, you may simply select all transactions within that date range or you may filter your list of transaction by category.</p>
			<p></p>
			<p>Once you have entered your date and category filters, your transactions will form a list in chronological order with the oldest transaction at the top and the most recent on bottom.</p>
			<h3></h3>
			<h4>Goals</h4>
			<p>Goals are a helpful addition to tracking your finances. To create a goal, select the Goals tab above. You will be asked to select a corresponding category and dollar amount. Results will be posted below the input with status bars and percentage to give you a great visual on how you are doing relative to your goals.</p>
			<p></p>
			<p>These goals are flexible and only based on the start and end date you provide. So, if you create a Goal of $600 per month for your Food category, simply select the calendar dates for the past 30 days at any point in time to see how your are doing relative to you goal.</p>
		</div>
	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
});

export default connect(mapStateToProps)(Home);