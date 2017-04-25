import React from 'react';
import ExpenseCategoryList from './expense-category-list';
import CategoryGoals from './category-goals';
import ExpenseInput from './expense-input';
import DisplayTransactions from './display-transactions';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, OverlayTrigger, ProgressBar, Tooltip, Grid, Row, Col } from 'react-bootstrap';
var Scroll = require('react-scroll');
var Element = Scroll.Element;
var scroller = Scroll.scroller;


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

	scrollDown() {
		scroller.scrollTo('myScrollToElement', {
		    duration: 1500,
		    smooth: true
		})
	}

	render() { 


		let pathName = this.props.location.pathname;
		console.log('pathName', pathName);
		const tooltip = (
    		<Tooltip id="tooltip"><strong>Log In!</strong> Coming Soon!</Tooltip>
		);



		return (
			<div className="layoutClass">
				
				<Navbar inverse collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>
				        <Link to="/">Mighty Budget</Link>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav>
				        <NavItem eventKey={1} href="#" onClick={this.scrollDown}><scroller >How it works</scroller></NavItem>
				        <OverlayTrigger placement="bottom" overlay={tooltip}>
					        <NavDropdown eventKey={3} title="Resources" id="basic-nav-dropdown">
					          <MenuItem eventKey={3.1}>Action</MenuItem>
					          <MenuItem eventKey={3.2}>Another action</MenuItem>
					          <MenuItem eventKey={3.3}>Something else here</MenuItem>
					          <MenuItem divider />
					          <MenuItem eventKey={3.3}>Separated link</MenuItem>
					        </NavDropdown>
					    </OverlayTrigger>
				      </Nav>
				      <Nav pullRight className="move-left">
				      	<OverlayTrigger placement="bottom" overlay={tooltip}>
				        	<NavItem eventKey={1} href="#">Log In</NavItem>
				        </OverlayTrigger>
				        <NavItem eventKey={2} href="#"><Link to="categories">Try Demo</Link></NavItem>
				      </Nav>
				    </Navbar.Collapse>
				</Navbar>
				<header>
					<h1>Take charge of your future!</h1>
					<h3>Use the fast and easy solution for setting and tracking your financial goals.</h3>
					<Grid className="log-in-buttons">
						<Row>
							<Col xs={6} >
									<OverlayTrigger placement="bottom" overlay={tooltip}>
								        <Button bsStyle="warning">Log In!</Button>
								    </OverlayTrigger>
							</Col>
							<Col xs={6} >
								<Link to="categories"><Button bsStyle="warning">Try Demo!</Button></Link>
							</Col>
						</Row>
						<Row><p></p></Row>
						<Row className={pathName === "/" ? "hidden" : "exit-demo"} >
							<Col xs={12}>
								<Link to="/"><Button bsStyle="warning">Exit Demo!</Button></Link>
							</Col>
						</Row>
					</Grid>
				</header>

				<section id="how-it-works" className={pathName === "/" ? "about" : "hidden"}>
					<Element name="myScrollToElement">
					<Grid className="about-grid">
						<Row className="show-grid about-row">
							<Col sm={4} className="card red">
								<div className="description-container">
									<h3>Categories</h3>
									<div className="description"> 
										<p>Categories are your starting place. Every future expense or financial goal will relate to a category. Categories can be as specific or broad in scope as you would like.</p>
										<p>For your reference, all categories you have previously created will be listed under your categories tab.</p>
										<p>For your convenience, with the deployment of V2, categories will be able to be deleted or edited as needed.</p>
									</div>
								</div>
							</Col>
							<Col sm={4} className="card green">
								<div className="description-container">
									<h3>Expenses</h3>
									<div className="description">
										
										<p>Choose the corresponding category under which the expense will fall. Enter the date of the transaction, the dollar amount of the transaction, and an optional note for your records.</p>
										<p>To view your expenses, enter a start date and end date of transactions you are looking for. In addition, you may simply select all transactions within that date range or you may filter your list of transaction by category.</p>
									</div>
								</div>
							</Col>
							<Col sm={4} className="card blue">
								<div className="description-container">
									<h3>Goals</h3>
									<div className="description">
										
										<p>Select a corresponding category and dollar amount. Results will be posted below the input with status bars and percentage to give you a great visual on how you are doing relative to your goals.</p>
										<p>These goals are flexible and only based on the start and end date you provide. So, if you create a Goal of $600 per month for your Food category, simply select the calendar dates for the past 30 days at any point in time to see how your are doing relative to you goal.</p>
									</div>
								</div>
							</Col>
						</Row>
					</Grid>
					</Element>
				</section>
				<section className={pathName === "/" ? "sample-status" : "hidden"}>
					<h2>Stay on track!</h2>
					<div className="status-bar-container">
						<h4>Sample Status bar</h4>
						<ProgressBar active now={45} label={`${45}%`} />
						<h4>Sample Status bar</h4>
						<ProgressBar active now={75} label={`${75}%`} />
					</div>
				</section>

				<ul className={pathName === "/" ? "hidden" : "nav nav-tabs"}>
				    <li role="presentation" className={pathName === "categories" ? "active" : ""}><Link to="categories">Categories</Link></li>
				    <li role="presentation" className={pathName === "new_expense" ? "active" : ""}><Link to="new_expense">New Expense</Link></li>
				    <li role="presentation" className={pathName === "transactions" ? "active" : ""}><Link to="transactions">Transactions</Link></li>
				    <li role="presentation" className={pathName === "goals" ? "active" : ""}><Link to="goals">Goals</Link></li>
				    <li role="presentation" className={pathName === "/" ? "active" : ""}><Link to="/">Exit Demo</Link></li>
				</ul>

				{this.props.children}

				<footer className={pathName === "/" ? "" : "gray-background"}>
					<h1>Sign up for Mighty Budget today!</h1>
					<Grid className="log-in-buttons">
						<Row>
							<Col xs={6} >
									<OverlayTrigger placement="bottom" overlay={tooltip}>
								        <Button bsStyle="warning">Log In!</Button>
								    </OverlayTrigger>
							</Col>
							<Col xs={6} >
								<Link to="categories"><Button bsStyle="warning">Try Demo!</Button></Link>
							</Col>
						</Row>
						<Row><p></p></Row>
						<Row className={pathName === "/" ? "hidden" : "exit-demo"} >
							<Col xs={12}>
								<Link to="/"><Button bsStyle="warning">Exit Demo!</Button></Link>
							</Col>
						</Row>
					</Grid>
				</footer>

			
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