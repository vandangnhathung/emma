export class MySingleWebPage{
    constructor(){
        // slider
        this.slider = document.querySelector('.slider-behind-items');

        // get all items
        this.sliderItems = document.querySelectorAll('.slider-behind-items .slider-item');

        // add data-index to each item
        this.sliderItems.forEach((item, index) => {
            item.setAttribute('data-index', index + 1);
        });

        this.index = 0;
        this.maxIndex = this.sliderItems.length - 1;
        this.minIndex = 0;

        // prevent the function from being clicked while the animation is running
        this.isRunning = false;

        this.loop = true;

        this.init();

        // buttons for navigation
        this.btnPrevious = document.querySelector('.button.prev');
        this.btnNext = document.querySelector('.button.next');
        this.btnPrevious.addEventListener('click', () => this.previous());
        this.btnNext.addEventListener('click', () => this.next());

        // Store timeout IDs for clearing later
        this.hideTimeoutId = null;
        this.showTimeoutId = null;
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
        // Exit if an animation is currently running
        if(this.isRunning) return;

        // check if the index is out of range
        if(index < this.minIndex || index > this.maxIndex) return;

        // check if the index is the same as the current index
        if(index === this.index) return;

        // set the animation to running after the condition is met
        this.isRunning = true;

        // prevent the function from being clicked while the animation is running
        this.animationTimeoutId = setTimeout(() => {
            this.isRunning = false;
        }, 1500);

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
        // Clear any existing timeout
        if(this.hideTimeoutId) clearTimeout(this.hideTimeoutId);


        this.sliderItems[index].style.transition = `none`;
        this.sliderItems[index].style.transform = `translateX(0)`;

        this.hideTimeoutId = setTimeout(() => {
            this.sliderItems[index].style.transition = `all 1.5s linear`;
            this.sliderItems[index].style.transform = `translateX(${direction * -1 * 100}%)`;
        }, 100);
    }

    show(index, direction){
        // Clear any existing timeout
        if(this.showTimeoutId) clearTimeout(this.showTimeoutId);

        this.sliderItems[index].style.transition = `none`;
        this.sliderItems[index].style.transform = `translateX(${direction * 100}%)`;

        this.showTimeoutId = setTimeout(() => {
            this.sliderItems[index].style.transition = `all 1.5s linear`;
            this.sliderItems[index].style.transform = `translateX(0)`;
        }, 100);
    }

    addActiveClass(item, items){
        items.forEach(item => item.classList.remove('active'));
        item.classList.add('active');
    }
}
