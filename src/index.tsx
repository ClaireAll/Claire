import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.less';
import 'antd/dist/reset.css';
import { Col, Row } from 'antd';
import Navigation from 'src/components/menu/Navigation';
import PlatHome from './components/home/Home';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
	<BrowserRouter>
		<Row>
			<Col span={5} className="router"><Navigation /></Col>
			<Col span={19}><PlatHome /></Col>
		</Row>
	</BrowserRouter>
);
reportWebVitals();
