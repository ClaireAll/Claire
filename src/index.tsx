import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'antd/dist/reset.css';
import { Col, Row } from 'antd';
import Menu from './components/menu/menu';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
  <Row>
      <Col span={5} className="router"><Menu /></Col>
      <Col span={19}>主题</Col>
  </Row>
);
reportWebVitals();
