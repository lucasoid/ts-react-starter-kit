# TypeScript React Starter Kit

Demo of TypeScript and React 16.8+ features.

## React 16 features

-   ReactDOM.createPortal: see src/components/ui/Modal/Modal.tsx
-   React.createContext: see src/theme, src/components/views/Home/Home.tsx, src/components/ui/Modal/Modal.tsx, etc.
-   React.ErrorBoundary: see src/components/errors/ErrorBoundary.tsx, src/components/App.tsx, src/components/views/View.tsx
-   React.Fragment: see src/components/views/Home/Home.tsx, src/components/iews/List/ListDetails.tsx
-   React.useState: see src/components/forms/List/ListForm.tsx
-   React.useEffect: see src/components/ui/Modal/Modal.tsx

For a comparison between a class component using lifecycle methods and a functional component using hooks and effects, see `src/components/views/Home/Home.tsx` (class) and `src/components/views/List/ListDetails.tsx` (function).

## Unit testing

### Testing hooks

This solution uses Jest and Enzyme to test components. To date there is not a clean API for mocking hooks. However, you can use Jest's module mocking system:

```js
// Component.js
import * as React from 'react';
import { ThemeContext } from '~theme';

export const MyComponent = (props) => {
    let { theme } = useContext(ThemeContext);
    return <div>The theme is { theme }</div>;
}

// Component.test.js
import { MyComponent } from '../MyComponent';
import * as React from 'react';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useContext: jest.fn(),
        useState: jest.fn(),
        useEffect: jest.fn()
    }
});

describe('MyComponent', () => {
    it('uses hooks', () => {
        // @ts-ignore <-- tell the IDE to be cool about using mockImplementationOnce
        React.useContext.mockImplementationOnce(() => ({
            theme: 'tangerine'
        });
    });
});
```

For examples, see:

-   useContext: src/components/errors/**tests**/ErrorMessage.test.tsx
-   useState: see src/components/forms/ListItem/**tests**/ListItemForm.test.tsx

### Testing async hooks

For scenarios where you use useEffect to perform some async action that operates on state (such as fetching data from an API), you can use ReactDOM's act() util. Enzyme already uses act() to synchronously mount components, but does not capture updates made asynchronously. For that, you can do:

```js
let wrapper = mount(<MyComponent />); // mounts a component inside act()
await act(async () => new Promise(setImmediate)); // causes async updates to be flushed
wrapper.update(); // tells Enzyme to update its rendering
... // do something great with the updated wrapper
```

For an example, see src/components/views/List/**tests**/ListDetails.tsx.

More on act(): https://reactjs.org/docs/test-utils.html#act

### Testing functional components with hooks versus class components with instance methods

To date, the tooling makes it easier to test instance methods than hooks. Consider:

```js
export MyClass extends React.Component {
    state = {
        something: false
    }

    doSomething() {
        this.setState({ something: true });
    }

    render() {
        return (<div>{this.state.something}<Button onDid={this.doSomething}>Do</Button></div>);
    }
}

describe('MyClass', () => {
    it('does something', () => {
        let wrapper = shallow(<MyClass />);
        wrapper.instance().doSomething();
        expect(wrapper.text()).toContain('true');
    });
});
```

versus:

```js
export const MyFunction = (props) => {
    let [something, setSomething] = useState(false);

    doSomething() {
        setSomething(true);
    }

    return <div>{something}<Button onDid={doSomething}>Do</Button></div>;
}
describe('MyFunction', () => {
    it('does something', () => {
        let wrapper = mount(<MyClass />);
        // you either have to tightly couple this test to the child component's implementation,
        // or you have to mock the child component in the test.
        // Neither approach is as clean as just invoking an instance method.
        wrapper.find('button[title="Do"]').first().simulate('click');
        expect(wrapper.text()).toContain('true');
    });
});
```

### Testing portals

Shallow rendering just works. See src/components/ui/Modal.

For full rendering, you need to make sure the element you are targeting with createPortal is present in JSDom. You can set this up in a beforeEach call. See src/components/ui/Modal.
