import React, { Component } from 'react';
import './Visualizer.css';
import SortingMenu from './SortingMenu';

class Visualizer extends Component {

    state = {
        array : []
    }
    
    


    componentDidMount() {
        this.get_array();
    }

    get_array(){
        const array = [];
        const numbOfBars = window.screen.width*0.8/10;
        for(let i = 0; i < numbOfBars; i++){
            array.push(Math.floor(Math.random() * 450) + 10);
        }
        this.setState({array: array});
    }

    bubble_sort_visualize(){
        const arr = this.state.array;
        const animations = this.bubble_sort_and_push([], arr);
        this.animate(animations);
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
        }
        this.pushGreen(arr, animations);
        return animations;
    }


    insertion_sort_visualize(){
        const arr = this.state.array;
        const animations = this.insertion_sort_and_push([], arr);
        this.animate(animations);
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

    selection_sort_visualize(){
        const arr = this.state.array;
        const animations = this.selection_sort_and_push([], arr);
        this.animate(animations);
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
        }        
        this.pushGreen(arr, animations);    
        return animations;
    }

    quick_sort_visulaize(){
        const arr = this.state.array;
        const animations = this.quick_sort_helper([], arr, 0 , arr.length-1);
        this.pushGreen(arr, animations);
        this.animate(animations);
        
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
                animations.push([low, i, 1]);
                animations.push([low, i, 2]);
                const tmp = arr[low];
                arr[low] = arr[i];
                arr[i] = tmp;
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

    animate(animations){    
        const colors = ['blue', 'red', 'bisque', '#80ff80'];
        const bars = document.getElementsByClassName("bar");
        let i = 0;
        const intervalHander = function(){
            const animation = animations[i];
            const bar1 = bars[animation[0]];
            const bar2 = bars[animation[1]];
            const color = colors[animation[2]];
            changeColor(bar1, bar2, color);
            i++;
            if(i === animations.length){
                window.clearInterval(interval);
            }
        }
        const interval = window.setInterval(intervalHander,5);
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
                    get_array={() => this.get_array()}
                    bubble_sort={() => this.bubble_sort_visualize()}
                    insertion_sort={() => this.insertion_sort_visualize()}
                    selection_sort={() => this.selection_sort_visualize()}
                    quick_sort={() => this.quick_sort_visulaize()}
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
