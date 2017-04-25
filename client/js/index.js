import 'babel-polyfill';
const root = document.getElementById('app');
console.log(`Client running in ${process.env.NODE_ENV} mode`);
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/layout';
import Home from './components/home';
import ExpenseCategoryList from './components/expense-category-list';
import CategoryGoals from './components/category-goals';
import ExpenseInput from './components/expense-input';
import DisplayTransactions from './components/display-transactions';

import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
    	<Provider store={store} >
    		<Router history={browserHistory}>
    			<Route path="/" component={Layout}>
    				<Route path="categories" component={ExpenseCategoryList}></Route>
    				<Route path="goals" component={CategoryGoals}></Route>
    				<Route path="new_expense" component={ExpenseInput}></Route>
    				<Route path="transactions" component={DisplayTransactions}></Route>
      			</Route>
   			</Router>

    	</Provider>, document.getElementById('app'))
);
