export class MySingleWebPage{
    constructor(){

        // slider
        this.slider = document.querySelector('.slider-behind-items');

        // get all items
        this.sliderItems = document.querySelectorAll('.slider-behind-items .slider-item');

        // set total items variable in css
        this.slider.style.setProperty('--total-items', this.sliderItems.length);

        // add data-index to each item
        this.sliderItems.forEach((item, index) => {
            item.setAttribute('data-index', index + 1);
        })

        this.index = 0;

        this.maxIndex = this.sliderItems.length - 1;
        this.minIndex = 0;
        this.direction = -1;

        this.loop = true;

        this.init();

        // select
        // this.select(2);

        // buttons for navigation
        this.btnPrevious = document.querySelector('.button.prev');
        this.btnNext = document.querySelector('.button.next');
        this.btnPrevious.addEventListener('click', () => this.handleClick("prev"));
        this.btnNext.addEventListener('click', () => this.handleClick("next"));


        this.handleClick = (type = "prev") => {
            if(type === "next"){
                this.next();
            }else if(type === "prev"){
                this.previous();
            }
        }

    }

    init(){

        // active first item
        this.select(0);
    }


    next(){
        let newIndex = this.index;

        if(newIndex === this.maxIndex) newIndex = this.minIndex;
        else newIndex++;

        this.select(newIndex, 1);
    }

    previous(){
        let newIndex = this.index;

        if(newIndex === this.minIndex) newIndex = this.maxIndex;
        else newIndex--;

        this.select(newIndex, -1);
    }

    select(index = 0, direction){
        if(index < this.minIndex || index > this.maxIndex) return;
        if(index === this.index) return;

        // determine direction
        this.direction = direction;

        if(index < this.index && !direction) this.direction = -1;
        else if(index > this.index && !direction) this.direction = 1;

        console.log(this.direction);

        this.index = index;
        // console.log(this.index);
        this.addActiveClass(this.sliderItems[index], this.sliderItems);
    }

    hide(index){
        const hideElement = this.sliderItems[index]
    }

    show(index){

    }

    addActiveClass(item, items){
        items.forEach(item => item.classList.remove('active'));
        item.classList.add('active');
    }
}