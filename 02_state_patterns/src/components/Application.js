import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import './Application.css';

const defaultState = [
    { value: 'Pants', id: uniqueId(), packed: false },
    { value: 'Jacket', id: uniqueId(), packed: false },
    { value: 'iPhone Charger', id: uniqueId(), packed: false },
    { value: 'MacBook', id: uniqueId(), packed: false },
    { value: 'Sleeping Pills', id: uniqueId(), packed: true },
    { value: 'Underwear', id: uniqueId(), packed: false },
    { value: 'Hat', id: uniqueId(), packed: false },
    { value: 'T-Shirts', id: uniqueId(), packed: false },
    { value: 'Belt', id: uniqueId(), packed: false },
    { value: 'Passport', id: uniqueId(), packed: true },
    { value: 'Sandwich', id: uniqueId(), packed: true },
];

class Application extends Component {
    state = {
        items: defaultState
    }

    // How are we going to manipulate the state?
    // Ideally, users are going to want to add, remove,
    // and check off items, right?

    toggleItem = (itemId) => {
        this.setState((state) => {
            return {
                items: state.items.map((item) => {
                    if (item.id === itemId) {
                        return {...item, packed : !item.packed }
                    }
                    return item
                })
            }
        })
    }

    removeItem = (itemId) => {
        this.setState((state) => {
            return {
                items: state.items.filter((item) => item.id !== itemId)
            }
        })
    }


    addItem = (newItem) => {
        this.setState((state) => {
            return { items: [...state.items, newItem] }
        })
    }


    splitItems = () => {
        const { items } = this.state;
        const unPacked = [];
        const packed = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].packed) {
                packed.push(items[i])
            } else {
                unPacked.push(items[i])
            }
        }

        return [unPacked, packed]
    }


    render() {
        const [unPackedItems, packedItems] = this.splitItems();

        return (
            <div className="Application">
                <NewItem onSubmit={this.addItem} />
                <CountDown />
                <Items title="Unpacked Items" items={unPackedItems} onCheckOff={this.toggleItem} onRemove={this.removeItem} />
                <Items title="Packed Items" items={packedItems} onCheckOff={this.toggleItem} onRemove={this.removeItem} />
                <button className="button full-width">Mark All As Unpacked</button>
            </div>
        );
    }
}

export default Application;