import React from 'react';
import Selection from 'react-ds';

const width = 32;
const height = 32;
const row = 9;
const col = 12;

const rows = [...Array(row).keys()].map((r, i) =>
    [...Array(col).keys()].map((c, j) => i * col + j)
);

const SelectionItem = ({ index, i, j }) => {
    const left = j * width;
    const top = i * height;
    const tileStyle = {
        backgroundPosition: `-${left}px -${top}px`,
        backgroundImage: 'url(http://www.w3schools.com/bootstrap4/sanfran.jpg)'
    };

    return <div style={tileStyle}>{index}</div>;
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

    getStyle = index => {
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
                        {r.map((index, j) => (
                            <div key={j} ref={this.addElementRef} style={this.getStyle(index)}>
                                <SelectionItem index={index} i={i} j={j} />
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
    item: { width, height, background: 'yellow', border: '1px solid black' },
    selected: { background: 'red' }
};
