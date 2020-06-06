import React, { Component } from 'react';

class SortingMenu extends Component {

    render() {
        return (
            <nav>
                <ul>
                    <li><button className="sortButton" 
                        onClick={() =>{
                            this.props.get_array();
                        }}>Change Array
                        </button>
                    </li>
                    
                    <li><button className="sortButton"
                        onClick={() =>{
                            this.props.bubble_sort("Bubble Sort");
                        }}>Bubble Sort
                        </button>
                    </li>

                    <li><button className="sortButton" 
                        onClick={() =>{
                            this.props.insertion_sort("Insertion Sort");
                        }}>Insertion Sort
                        </button>
                    </li>

                    <li><button className="sortButton" 
                        onClick={() =>{
                            this.props.selection_sort("Selection Sort");
                        }}>Selection Sort
                        </button>
                    </li>

                    <li><button className="sortButton" 
                        onClick={() =>{
                            this.props.quick_sort("Quick Sort");
                        }}>Quick Sort
                        </button>
                    </li>

                    <li><button className="sortButton" 
                        onClick={() =>{
                            this.props.merge_sort("Merge Sort");
                        }}>Merge Sort
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default SortingMenu;
