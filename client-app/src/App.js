import './App.css';
import Layout from './components/layout/Layout';
import AllProducts from './components/product/AllProducts';

function App() {
  return (
    <div className="App" style={{
      minHeight: '100%', 
      height: '100%', 
      minWidth: '100%', 
      width: '100%', 
      position: 'absolute'
      }}>
      <Layout />
    </div>
  );
}

export default App;
