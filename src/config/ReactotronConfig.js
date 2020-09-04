import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

//verificando ambiente

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure().use(reactotronRedux()).connect();

  tron.clear();

  console.tron = tron;
}
