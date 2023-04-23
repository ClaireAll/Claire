import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.less';
import 'antd/dist/reset.css';
import { Col, ConfigProvider, Row } from 'antd';
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
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: getComputedStyle(document.documentElement).getPropertyValue('--theme-color')
				},
			}}
		>
			<Row wrap={false} className='claire-home'>
				<Col span={5} className='claire-navigation'><Navigation /></Col>
				<Col span={19} className='claire-content'><PlatHome /></Col>
			</Row>
		</ConfigProvider>
	</BrowserRouter>
);
reportWebVitals();
