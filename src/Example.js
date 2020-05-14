import React from 'react';
import Selection from 'react-ds';

const rows = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];

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
        const index = i * 3 + j;
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
                                {c}
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
    item: { width: 72, height: 72, background: 'yellow', border: '1px solid black' },
    selected: { background: 'red' }
};
