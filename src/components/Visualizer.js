import React, { Component } from 'react';
import './Visualizer.css';
import SortingMenu from './SortingMenu';

class Visualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            status: false
        }
    }
    
    componentDidMount() {
        this.get_array();
    }

    get_array(){
        const numbOfBars = window.screen.width*0.8/10;
        const array = [];
        for(let i = 0; i < numbOfBars; i++){
            array.push(Math.floor(Math.random() * 450) + 10);
        }
        this.setState({array: array});
    }

    new_array(){
        if(this.state.status === false){
            const bars = Array.from(document.getElementsByClassName("bar"));
            bars.forEach(element => {
                element.style.backgroundColor = 'bisque';
            });
            this.get_array();
        }
    }

    change_style(text){
        const buttons = Array.from(document.getElementsByClassName("sortButton"));
        buttons.forEach(button => {
            if(button.innerText !== text){
                button.style.backgroundColor = 'grey'; 
                button.style.opacity= 0.2;
            }
        })
    }

    revert_style(){
        const buttons = Array.from(document.getElementsByClassName("sortButton"));
        buttons.forEach(button => {
            button.style = "sortButton";
        })
    }


    async bubble_sort_visualize(text){
        if(this.state.status === false){
            this.change_style(text);
            this.setState({status: true});
            const arr = this.state.array.slice();
            const animations = this.bubble_sort_and_push([], arr);
            await this.animate(animations);
            this.setState({array: arr, status: false});
            this.revert_style();

        }
    }

    bubble_sort_and_push(animations, arr){
        for(let i=0; i < arr.length - 1; i++){
            for(let j=0; j < arr.length - i - 1; j++){
                animations.push([j, j+1, 0]);
                if(arr[j] > arr[j+1]){
                    animations.push([j, j+1, 1]);
                    const tmp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = tmp;
                }
                animations.push([j, j+1, 2]);
            }
            animations.push([arr.length - 1 - i, arr.length - 1 - i, 3]);
        }
        animations.push([0,0,3]);
        return animations;
    }


    async insertion_sort_visualize(text){
        if(this.state.status === false){
            this.change_style(text);
            this.setState({status: true});
            const arr = this.state.array.slice();
            const animations = this.insertion_sort_and_push([], arr);
            await this.animate(animations);
            this.setState({array: arr, status: false});
            this.revert_style();
        }
    }

    insertion_sort_and_push(animations, arr){
        for(let i=1; i < arr.length; i++){
            let curr = arr[i];
            let change = false;
            let j = i -1;
            while(j >= 0 && curr < arr[j]){
                animations.push([j, j+1, 0]);
                animations.push([j, j+1, 1]);
                animations.push([j, j+1, 2]);
                change = true;
                arr[j+1] = arr[j];
                j--;
            }
            if(change === false){
                animations.push([j, j+1, 0]);
                animations.push([j, j+1, 2]);
            }
            else{
                arr[j+1] = curr;
            }
        }
        this.pushGreen(arr, animations);
        return animations;
    }

    pushGreen(arr, animations){
        for(let i=0; i < arr.length; i++){
            animations.push([i,i,3]);
        }
    }

    async selection_sort_visualize(text){
        if(this.state.status === false){
            this.change_style(text);
            this.setState({status: true});
            const arr = this.state.array.slice();
            const animations = this.selection_sort_and_push([], arr);
            await this.animate(animations);
            this.setState({array: arr, status: false});
            this.revert_style();
        }
    }

    selection_sort_and_push(animations, arr){
        for(let i=0; i < arr.length; i++){
            let minIndex = i;
            for(let j = i+1; j < arr.length; j++){
                animations.push([minIndex, j, 0]);
                animations.push([minIndex, j, 2]);
                if(arr[minIndex] > arr[j]){
                    minIndex = j;
                }
            }
            animations.push([minIndex, i, 1]);
            animations.push([minIndex, i, 2]);
            const tmp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = tmp;
            animations.push([i,i,3]);
        }          
        return animations;
    }

    async quick_sort_visulaize(text){
        if(this.state.status === false){
            this.change_style(text);
            this.setState({status: true});
            const arr = this.state.array.slice();
            const animations = this.quick_sort_helper([], arr, 0, arr.length - 1);
            this.pushGreen(arr, animations);
            await this.animate(animations);
            this.setState({array: arr, status: false});
            this.revert_style();
        }
        
    }

    quick_sort_helper(animations, arr, low, high){
        if(low < high){
            const mid = this.partition(animations, arr, low, high);
            this.quick_sort_helper(animations, arr, low, mid - 1);
            this.quick_sort_helper(animations, arr, mid + 1, high);
        }
        return animations;
    }

    partition(animations, arr, low, high){
        const pivot = high;
        const tmp_pivot = arr[pivot];
        low--;        
        for(let i = low+1; i < high; i++){
            animations.push([i,high,0]);
            if(arr[i] < arr[high]){
                low++;
                if(low !== i){
                    animations.push([low, i, 1]);
                    animations.push([low, i, 2]);
                    const tmp = arr[low];
                    arr[low] = arr[i];
                    arr[i] = tmp;
                }
            }
            animations.push([i,high,2]);
        }
        low++;
        if(low !== high){
            animations.push([low, high, 1]);
            animations.push([low, high, 2]);
            arr[high] = arr[low];
            arr[low] = tmp_pivot;
        }
        animations.push([low,low,3]);
        return low;
    }

    async merge_sort_visualize(text){
        if(this.state.status === false){
            this.change_style(text);
            this.setState({status: true});
            const arr = this.state.array.slice();
            const animations = [];
            this.merge_sort_helper(animations, arr, 0, arr.length - 1);
            this.pushGreen(arr, animations);
            await this.merge_sort_animate(animations);
            this.setState({array: arr, status: false});
            this.revert_style();
        }
    }

    merge_sort_helper(animations, arr, low, high){
        if(low < high){
            const mid = Math.floor(low + (high-low)/2);
            this.merge_sort_helper(animations, arr, low, mid);
            this.merge_sort_helper(animations, arr, mid+1, high);
            this.merge_helper(animations, arr, low, mid, high);
        }
        //this.setState({array: arr});
    }

    merge_helper(animations, arr, low, mid, high){
        const new_array= [];
        let i = low;
        let k = low;
        let j = mid+1;
        while(i <= mid && j <= high){
            animations.push([k,j,0]);
            if(arr[i] <= arr[j]){
                animations.push([k,j,2]);
                new_array.push(arr[i]);
                i++;
                k++;
                
            } else{
                const diff = j - k;
                animations.push([j, j - diff, 1]);
                animations.push([j, j - diff, -1]);
                new_array.push(arr[j]);
                j++;
                k++;
            }
        }
        while(i <= mid){
            new_array.push(arr[i]);
            i++;
        }
        while(j <= high){
            new_array.push(arr[j]);
            j++;
        }
        while(high >= low){
            arr[high] = new_array.pop();
            high--;
        }
    }

    merge_sort_animate(animations){
        return new Promise(resolve => {  
            const colors = ['blue', 'red', 'bisque', '#80ff80'];
            const bars = document.getElementsByClassName("bar");
            let i = 0;
            const intervalHandler = function(){
                const animation = animations[i];
                let j = animation[0];
                let k = animation[1];
                let color = animation[2];
                if(color === 0 || color === 2 || color === 3){
                    changeColor(bars[k], bars[j], colors[color]);
                }
                else{
                    if(color === -1){
                        color = 2;
                    }
                    while(k < j){
                        changeColor(bars[j], bars[j-1], colors[color]);
                        j--;
                    }
                }
                i++;
                if(i === animations.length){
                    window.clearInterval(interval);
                    resolve();
                }
            }
            const interval = window.setInterval(intervalHandler,3);
        })
    }

    animate(animations){  
        return new Promise(resolve => {  
            const colors = ['blue', 'red', 'bisque', '#80ff80'];
            const bars = document.getElementsByClassName("bar");
            let i = 0;
            const intervalHandler = function(){
                const animation = animations[i];
                const bar1 = bars[animation[0]];
                const bar2 = bars[animation[1]];
                const color = colors[animation[2]];
                changeColor(bar1, bar2, color);
                i++;
                if(i === animations.length){
                    window.clearInterval(interval);
                    resolve();
                }
            }
            const interval = window.setInterval(intervalHandler,3);
        })
    }

    render() {
        let arr = this.state.array.map((bar,idx) => 
        <ul className="bar" key={idx} style={{
            height: `${bar}px`
          }}
        ></ul>);

        return (
            
            <div className="container">
                <SortingMenu 
                    get_array = {() => this.new_array()}
                    bubble_sort = {(text) => this.bubble_sort_visualize(text)}
                    insertion_sort = {(text) => this.insertion_sort_visualize(text)}
                    selection_sort = {(text) => this.selection_sort_visualize(text)}
                    quick_sort = {(text) => this.quick_sort_visulaize(text)}
                    merge_sort = {(text) => this.merge_sort_visualize(text)}
                />
                <div className="array">{arr}</div>
            </div>  
        );
    }

    

}

function changeColor(bar1, bar2, color){
    bar1.style.backgroundColor = color;
    bar2.style.backgroundColor = color;
    if(color === 'red'){
        const tmp = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tmp; 
    }
}

export default Visualizer;
