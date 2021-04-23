// import logo from '../../../assets/images/logo/logo.svg';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';

function App() {
	return (
		<Router>
			<div>
				<Route path="/" exact component={Dashboard} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</div>
		</Router>
	);
}

export default App;
