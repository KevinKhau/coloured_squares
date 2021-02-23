import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        const localSquares = localStorage.getItem( 'squares' );
        const squares = localSquares ? localSquares.split(',') : [...Array(10)];
        super(props);
        this.state = {
            colors: [...Array(4)].map(this.getRandomColor),
            squares
        }
    }

    render() {
        return (
            <div className="App">
                {this.state.colors.map((color, index) =>
                    <div className="corner" key={index}>
                        <button style={this.setStyle(color)}
                                onClick={() => this.stackColor(color)}>
                            Click me: {color}
                        </button>
                    </div>
                )}
                {this.state.squares.map((color, i) =>
                    <div className="square" style={this.setStyle(color)} key={i}>
                        <span>*</span>
                    </div>
                )}
            </div>
        );
    }

    setStyle(color) {
        if (!color) return;
        const style = {backgroundColor: color};
        if (this.isDark(color)) {
            style.color = 'white';
        }
        return style;
    }

    stackColor(color) {
        this.setState({squares: [color, ...this.state.squares.slice(0, this.state.squares.length - 1)]});
        localStorage.setItem('squares', this.state.squares);
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    isDark(color) {
        const c = color.substring(1);      // strip #
        const rgb = parseInt(c, 16);   // convert rrggbb to decimal
        const r = (rgb >> 16) & 0xff;  // extract red
        const g = (rgb >>  8) & 0xff;  // extract green
        const b = (rgb >>  0) & 0xff;  // extract blue

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        if (luma < 40) {
            return true;
        }
    }
}

export default App;
