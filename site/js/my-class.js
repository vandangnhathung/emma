export class MySingleWebPage{
    constructor(){

        // slider
        this.slider = document.querySelector('.slider-behind-items');

        // get all items
        this.sliderItems = document.querySelectorAll('.slider-behind-items .slider-item');

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

    select(index = 0, direction = this.getDirection(index)){
        if(index < this.minIndex || index > this.maxIndex) return;
        if(index === this.index) return;

        // hide the old index
        this.hide(this.index, direction);

        // update new index
        this.index = index;

        // add active class for new index
        this.addActiveClass(this.sliderItems[index], this.sliderItems);

        // show the new index
        this.show(this.index, direction);
    }

    getDirection(index){
        if(index < this.index) return -1;
        else if(index > this.index) return 1;
    }

    hide(index, direction){
        console.log("hide", index);
        this.sliderItems[index].style.transition = `none`;
        this.sliderItems[index].style.transform = `translateX(0)`;

        setTimeout(() => {
            this.sliderItems[index].style.transition = `all 1s ease-in-out`;
            this.sliderItems[index].style.transform = `translateX(${direction * -1 * 100}%)`;
        }, 10);
        // this.sliderItems[index].style.transition = `all 1s ease-in-out`;
        // this.sliderItems[index].style.transform = `translateX(${direction * -1 * 100}%)`;
    }

    show(index, direction){
        console.log("show", index);
        this.sliderItems[index].style.transition = `none`;
        this.sliderItems[index].style.transform = `translateX(${direction * 100}%)`;

        setTimeout(() => {
            this.sliderItems[index].style.transition = `all 1s ease-in-out`;
            this.sliderItems[index].style.transform = `translateX(0)`;
        }, 10);
        // this.sliderItems[index].style.transition = `all 1s ease-in-out`;
        // this.sliderItems[index].style.transform = `translateX(0)`;
    }

    addActiveClass(item, items){
        items.forEach(item => item.classList.remove('active'));
        item.classList.add('active');
    }
}