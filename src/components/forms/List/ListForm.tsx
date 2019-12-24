import * as React from 'react';
import uuidv4 from 'uuid/v4';
import { Form } from '~components/forms/Form';
import { TextField } from '~components/forms/Inputs';

interface IListFormProps {
    onSubmit: Function;
    onCancel: Function;
}
export const ListForm: React.FC<IListFormProps> = props => {
    const [name, setName] = React.useState('');
    const [members, setMembers] = React.useState('');

    return (
        <Form
            onSubmit={() => {
                props.onSubmit({
                    id: uuidv4(),
                    name: name,
                    owner: 'me@domain.com',
                    members: members.split(','),
                });
            }}
            onCancel={props.onCancel}
            submitText={'Create'}
            cancelText={'Cancel'}
        >
            <TextField value={name} label="List name" onChange={setName} />
            <TextField value={'me@domain.com'} label="List owner" onChange={setName} disabled={true} />
            <TextField value={members} label="Share with" onChange={setMembers} />
        </Form>
    );
};
