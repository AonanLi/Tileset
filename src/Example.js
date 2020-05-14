import React from 'react';
import Selection from 'react-ds';

const rows = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
];

const SelectionItem = ({ value, row, col, tileWidth, tileHeight }) => {
    const bgLeft = ((value - 1) % col) * tileWidth;
    const bgTop = Math.floor((value - 1) / row) * tileHeight;
    let tileStyle = {
        backgroundPosition: `-${bgLeft}px -${bgTop}px`,
        backgroundImage: 'url(http://www.w3schools.com/bootstrap4/sanfran.jpg)'
    };

    return <div style={tileStyle}>{value}</div>;
}; // generate demo data

export default class Example extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            ref: null,
            elRefs: [],
            selectedElements: [] // track the elements that are selected
        };
    }

    handleSelection = indexes => this.setState({ selectedElements: indexes });

    getStyle = (i, j) => {
        const index = i * 12 + j;
        if (this.state.selectedElements.indexOf(index) > -1) {
            // Selected state
            return { ...styles.item, ...styles.selected };
        }
        return styles.item;
    };

    addElementRef = ref => {
        const elRefs = this.state.elRefs;
        elRefs.push(ref);
        this.setState({ elRefs });
    };

    renderSelection() {
        if (!this.state.ref || !this.state.elRefs) {
            return null;
        }
        return (
            <Selection
                target={this.state.ref}
                elements={this.state.elRefs}
                onSelectionChange={this.handleSelection}
            />
        );
    }

    render() {
        return (
            <div ref={ref => this.setState({ ref })}>
                {rows.map((r, i) => (
                    <div key={i} style={styles.row}>
                        {r.map((c, j) => (
                            <div key={j} ref={this.addElementRef} style={this.getStyle(i, j)}>
                                <SelectionItem
                                    value={i * 12 + j}
                                    col={12}
                                    row={9}
                                    tileHeight={32}
                                    tileWidth={32}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                {this.renderSelection()}
            </div>
        );
    }
}

const styles = {
    row: { display: 'flex' },
    item: { width: 32, height: 32, background: 'yellow', border: '1px solid black' },
    selected: { background: 'red' }
};
