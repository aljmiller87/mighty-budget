import React from 'react';
import ExpenseCategoryList from './expense-category-list';
import CategoryGoals from './category-goals';
import ExpenseInput from './expense-input';
import DisplayTransactions from './display-transactions';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

import { Link, IndexLink } from "react-router";

export class Layout extends React.Component {
	constructor(props) {
    	super(props);
  	}

	componentDidMount() {
		this.props.dispatch(actions.asyncFetchAllCategories());
  		this.props.dispatch(actions.asyncFetchAllTransactions());
  		this.props.dispatch(actions.asyncFetchAllGoals());
	}

	render() { 
		let pathName = this.props.location.pathname;

		return (
			<div className="layoutClass">
				<header> Test Header CSS </header>
				<div className="jumbotron jumbotron-custom">
    				<div className="container">
       					<h1>Mint Lite!</h1>
        				<p><strong>The fast and easy solution for setting and tracking your financial goals.</strong></p>
    				</div>
				</div>

				<ul className="nav nav-tabs">
				  <li role="presentation" className={pathName === "/" ? "active" : ""}><IndexLink to="/">About</IndexLink></li>
				  <li role="presentation" className={pathName === "categories" ? "active" : ""}><Link to="categories">Categories</Link></li>
				  <li role="presentation" className={pathName === "new_expense" ? "active" : ""}><Link to="new_expense">New Expense</Link></li>
				  <li role="presentation" className={pathName === "transactions" ? "active" : ""}><Link to="transactions">Transactions</Link></li>
				  <li role="presentation" className={pathName === "goals" ? "active" : ""}><Link to="goals">Goals</Link></li>
				</ul>

				{this.props.children}

		
				
			
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses,
	tempResults: state.tempResults,
	currentCategory: state.currentCategory,
	startDatePicked: state.startDatePicked,
	endDatePicked: state.endDatePicked

});

export default connect(mapStateToProps)(Layout);