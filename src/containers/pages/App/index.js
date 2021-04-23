import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux';

import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import './index.css';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Route path="/" exact component={Dashboard} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
