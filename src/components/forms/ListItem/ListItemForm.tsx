import * as React from 'react';
import uuidv4 from 'uuid/v4';
import { Form } from '~components/forms/Form';
import { TextField } from '~components/forms/Inputs';

interface IListFormProps {
    onSubmit: Function;
    onCancel: Function;
}
export const ListItemForm: React.FC<IListFormProps> = props => {
    const [name, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);

    return (
        <Form
            onSubmit={() => {
                props.onSubmit({
                    id: uuidv4(),
                    name: name,
                    category: category,
                    quantity: quantity,
                    isActive: true,
                });
            }}
            onCancel={props.onCancel}
            submitText={'Create'}
            cancelText={'Cancel'}
        >
            <TextField value={name} label="Name" onChange={setName} />
            <TextField value={category} label="Category" onChange={setCategory} />
            <TextField value={quantity} label="Quantity" onChange={setQuantity} />
        </Form>
    );
};
