import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import regeneratorRuntime from 'regenerator-runtime';
configure({ adapter: new Adapter() });
