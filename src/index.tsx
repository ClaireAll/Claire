import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.less';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { ClaireHome } from './components/home/home';

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
			<ClaireHome />
		</ConfigProvider>
	</BrowserRouter>
);
reportWebVitals();
