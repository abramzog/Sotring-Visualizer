import React, { Component } from 'react';


class SortingMenu extends Component {

    render() {
        return (
            <nav>
                <ul>
                    <li><button className="sortButton" 
                        onClick={() =>{
                            console.log(this);
                            this.props.get_array();
                        }}>Get Array
                        </button>
                    </li>

                    <li><button className="sortButton" 
                        onClick={() =>{
                            console.log(this);
                            this.props.bubble_sort();
                        }}>Bubble Sort
                        </button>
                    </li>

                    <li><button className="sortButton" 
                        onClick={() =>{
                            console.log(this);
                            this.props.insertion_sort();
                        }}>Insertion Sort
                        </button>
                    </li>

                    <li><button className="sortButton" 
                        onClick={() =>{
                            console.log(this);
                            this.props.selection_sort();
                        }}>Selection Sort
                        </button>
                    </li>

                    <li><button className="sortButton" 
                        onClick={() =>{
                            console.log(this);
                            this.props.quick_sort();
                        }}>Quick Sort
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    

}

export default SortingMenu;
