export interface IList {
    id: string;
    name: string;
    owner: string;
    members?: string[];
}

export interface IListItem {
    id: string;
    listId: string;
    category: string;
    name: string;
    quantity: number;
    isActive: boolean;
}

const LATENCY: number = 1000; // to mock the latency of the API in ms

let sampleListData: IList[] = [
    {
        id: '88a1051a-d69b-4655-8ba4-be8d9a44599f',
        name: 'Weekly shopping list',
        owner: 'me@domain.com',
        members: ['you@domain.com'],
    },
    {
        id: '0ba0e852-5e9f-44a7-9d6e-d113b4a63173',
        name: 'Hardware supplies',
        owner: 'me@domain.com',
        members: ['him@domain.com'],
    },
    {
        id: '2a335b66-a92a-4fb0-94e7-4ec1c673937e',
        name: 'Christmas list - East coast fam',
        owner: 'you@domain.com',
        members: ['me@domain.com', 'her@domain.com'],
    },
];

let sampleListItemData: IListItem[] = [
    {
        id: '3dd08312-7cca-4467-b443-09296cb54245',
        listId: '88a1051a-d69b-4655-8ba4-be8d9a44599f',
        category: 'produce',
        name: 'avocados',
        quantity: 3,
        isActive: true,
    },
    {
        id: '7e81ee74-5fc1-4395-be2b-4b4616f6ab59',
        listId: '88a1051a-d69b-4655-8ba4-be8d9a44599f',
        category: 'produce',
        name: 'tomatoes',
        quantity: 1,
        isActive: true,
    },
    {
        id: '43529c83-a355-4099-b6f5-2179f210d4b9',
        listId: '88a1051a-d69b-4655-8ba4-be8d9a44599f',
        category: 'produce',
        name: 'onions',
        quantity: 1,
        isActive: true,
    },
    {
        id: '36de2c94-bfc6-41dc-91f7-6fd812107785',
        listId: '88a1051a-d69b-4655-8ba4-be8d9a44599f',
        category: 'produce',
        name: 'cilantro - bunch',
        quantity: 1,
        isActive: true,
    },
    {
        id: '1bf8f08a-7ddd-45b9-b401-ca8e13870382',
        listId: '88a1051a-d69b-4655-8ba4-be8d9a44599f',
        category: 'spices',
        name: 'salt',
        quantity: 1,
        isActive: false,
    },
    {
        id: '293df6d2-e9d6-4f42-92f6-257543d6dde4',
        listId: '88a1051a-d69b-4655-8ba4-be8d9a44599f',
        category: 'spices',
        name: 'pepper',
        quantity: 1,
        isActive: false,
    },
    {
        id: '8253fc7c-14fd-47e7-ad08-4b560cfb34ef',
        listId: '0ba0e852-5e9f-44a7-9d6e-d113b4a63173',
        category: 'Lumber',
        name: "2x4s - 4'",
        quantity: 8,
        isActive: true,
    },
    {
        id: '7e1b906c-f6d4-467b-9cea-7072d4cb1d43',
        listId: '0ba0e852-5e9f-44a7-9d6e-d113b4a63173',
        category: 'Lighting',
        name: 'LED floodlight bulbs - 2700k',
        quantity: 2,
        isActive: true,
    },
];

let listSubscribers: Function[] = [];
let listItemSubscribers: Object = {};

export const subscribeToLists = (cb: Function) => {
    if (listSubscribers.indexOf(cb) === -1) listSubscribers.push(cb);
};

export const unsubscribeToLists = (cb: Function) => {
    let index = listSubscribers.indexOf(cb);
    if (index !== -1) {
        listSubscribers.splice(index, 1);
    }
};

export const subscribeToListItems = (listId: string, cb: Function) => {
    if (listItemSubscribers[listId] === undefined) {
        listItemSubscribers[listId] = [cb];
    } else {
        listItemSubscribers[listId] = [...listItemSubscribers[listId], cb];
    }
};

export const unsubscribeToListItems = (listId: string, cb: Function) => {
    if (listItemSubscribers[listId] !== undefined) {
        let index = listItemSubscribers[listId].indexOf(cb);
        if (index !== -1) {
            listItemSubscribers[listId].splice(index, 1);
        }
    }
};

const onUpdateLists = (data: IList[]) => {
    listSubscribers.forEach(fn => fn(data));
};

const onUpdateListItems = (listId: string, data: IListItem[]) => {
    if (listItemSubscribers[listId] !== undefined) {
        listItemSubscribers[listId].forEach(fn => fn(data));
    }
};

export const fetchLists = async () => {
    const lists: IList[] = await new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve(sampleListData);
        }, LATENCY);
    });
    onUpdateLists(lists);
    return lists;
};

export const createList = async (list: IList) => {
    const newList: IList = await new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve(list);
        }, LATENCY);
    });
    sampleListData.push(newList);
    onUpdateLists(sampleListData);
    return list;
};

export const editList = async (list: IList) => {
    const saved: IList = await new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve(saved);
        }, LATENCY);
    });
    const index = sampleListData.findIndex(_list => _list.id === list.id);
    sampleListData.splice(index, 1, saved);
    onUpdateLists(sampleListData);
    return saved;
};

export const fetchListItems = async (listId: string) => {
    const items: IListItem[] = await new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve(sampleListItemData.filter(item => item.listId === listId));
        }, LATENCY);
    });
    onUpdateListItems(listId, items);
    return items;
};

export const createListItem = async (item: IListItem) => {
    const saved: IListItem = await new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve(item);
        }, LATENCY);
    });
    sampleListItemData.push(saved);
    onUpdateListItems(item.listId, sampleListItemData);
    return item;
};

export const editListItem = async (item: IListItem) => {
    const saved: IListItem = await new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve(item);
        }, LATENCY);
    });
    const index = sampleListItemData.findIndex(_item => _item.id === item.id);
    sampleListItemData.splice(index, 1, saved);
    onUpdateListItems(
        item.listId,
        sampleListItemData.filter(_item => _item.listId === item.listId),
    );
    return saved;
};
