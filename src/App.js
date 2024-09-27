import './style/index.scss';
import Table from './components/Table';

const source = ['JS', 'HTML', 'CSS', 'TS', 'React', 'Angular', 'Vue', 'Svelte'];

const App = () => {
  return (
    <div className="App">
      <Table source={source} />
    </div>
  );
}

export default App;
