import React from 'react';
import Selection from 'react-ds';

const SelectionItem = ({ index, i, j, width, height }) => {
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
            width: 32,
            height: 32,
            row: 9,
            col: 12,
            ref: null,
            elRefs: [],
            selectedElements: [] // track the elements that are selected
        };
    }

    handleSelection = indexes => this.setState({ selectedElements: indexes });

    getStyle = index => {
        const { width, height } = this.state;
        if (this.state.selectedElements.indexOf(index) > -1) {
            // Selected state
            return { ...styles.item, ...styles.selected, width, height };
        }
        return { ...styles.item, width, height };
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

    refresh() {
        this.setState({
            width: 24,
            height: 24,
            row: 12,
            col: 16,
            elRefs: []
        });
    }

    render() {
        const { row, col, width, height } = this.state;
        const rows = [...Array(row).keys()].map((r, i) =>
            [...Array(col).keys()].map((c, j) => i * col + j)
        );
        // console.log(this.state.elRefs.map(e => e.outerText));
        return (
            <div ref={ref => this.setState({ ref })}>
                {rows.map((r, i) => (
                    <div key={i} style={styles.row}>
                        {r.map((index, j) => (
                            <div
                                key={j}
                                ref={ref => {
                                    if (ref) {
                                        const indexes = this.state.elRefs.map(e => e.outerText);
                                        if (!indexes.includes(ref.outerText)) {
                                            const elRefs = this.state.elRefs;
                                            elRefs.push(ref);
                                            this.setState({ elRefs });
                                        }
                                    }
                                }}
                                style={this.getStyle(index)}
                            >
                                <SelectionItem
                                    index={index}
                                    i={i}
                                    j={j}
                                    width={width}
                                    height={height}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                {this.renderSelection()}
                <button onClick={() => this.refresh()}>refresh</button>
            </div>
        );
    }
}

const styles = {
    row: { display: 'flex' },
    item: { background: 'yellow', border: '1px solid black' },
    selected: { background: 'red' }
};
