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

        this.loop = true;

        this.init();

        this.nonActiveItemOnLeft = 0;

        // buttons for navigation
        this.btnPrevious = document.querySelector('.button.prev');
        this.btnNext = document.querySelector('.button.next');
        this.btnPrevious.addEventListener('click', () => this.handleClick("prev"));
        this.btnNext.addEventListener('click', () => this.handleClick("next"));

        this.activeAreaWidth = 0;
        this.handleClick = (type = "prev") => {
            // get active item after click
            this.currentActiveItem = document.querySelector('.active');
            // get non active item
            this.sliderItemsNotActive = document.querySelectorAll('.slider-behind-items .slider-item:not(.active)');

            if(type === "next" && this.currentActiveItem.nextElementSibling === null && this.loop){
                this.sliderLoop("next");
                console.log("loop");
                return;
            }
            if(type === "prev" && this.currentActiveItem.previousElementSibling === null && this.loop){
                this.sliderLoop("prev");
                console.log("loop");

                return;
            }

            console.log("activeAreaWidth: ", this.activeAreaWidth)

            this.sliderNavigation(this.currentActiveItem.previousElementSibling, this.currentActiveItem.nextElementSibling, type);
        }

    }

    init(){
        // active first item
        this.sliderItems[0].classList.add('active');
    }

    sliderLoop(type){


        if(type === "next"){
            const moveX = Math.abs(this.slider.getBoundingClientRect().left) + this.currentActiveItem.clientWidth;
            this.sliderItemsNotActive.forEach(item => {
                item.style.left = `${moveX}px`;
            })

            this.sliderNavigation(this.currentActiveItem.previousElementSibling, this.sliderItems[0], type, true);
            this.currentActiveItem.style.left = `${moveX}px`;
            this.currentActiveItem = this.sliderItems[0];
        }else if(type === "prev"){
            const moveX = Math.abs(this.slider.getBoundingClientRect().right) + this.currentActiveItem.clientWidth;
            console.log("moveX: ", moveX, this.slider.getBoundingClientRect().left, this.currentActiveItem.clientWidth);
            this.sliderItemsNotActive.forEach(item => {
                item.style.left = `-${moveX}px`;
            })

            this.sliderNavigation(this.sliderItems[this.sliderItems.length - 1], this.currentActiveItem.nextElementSibling, type);
            this.currentActiveItem.style.left = `-${moveX}px`;
            this.currentActiveItem = this.sliderItems[this.sliderItems.length - 1];
        }
    }

    sliderNavigation(previousElement, nextElement, type, isLoop = false){
        if(type === "next"){
            this.activeAreaWidth += nextElement.clientWidth;

            this.addActiveClass(nextElement, this.sliderItems);
            this.slider.style.transform = `translateX(-${this.activeAreaWidth}px)`;

        }else if(type === "prev"){
            //
            // this.nonActiveItemOnLeft = this.activeAreaWidth - previousElement.clientWidth;
            // // console.log("nonActiveItemOnLeft: ", this.nonActiveItemOnLeft)
            //
            // this.activeAreaWidth -= this.nonActiveItemOnLeft === 0 ? previousElement.clientWidth : this.nonActiveItemOnLeft;

            this.activeAreaWidth -= previousElement.clientWidth;

            this.addActiveClass(previousElement, this.sliderItems);
            this.slider.style.transform = `translateX(-${this.activeAreaWidth}px)`;
        }
    }

    addActiveClass(item, items){
        console.log(item)
        items.forEach(item => item.classList.remove('active'));
        item.classList.add('active');
    }
}