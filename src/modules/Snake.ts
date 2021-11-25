class Snake {
    head: HTMLElement;
    bodies: HTMLCollection;
    element: HTMLElement;

    constructor() {
        this.head = document.querySelector('#snake > #head')!;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.element = document.getElementById('snake')!;
    }

    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value) {
        if (this.X === value) {
            return;
        }
        // 判断是否撞墙，X的合法范围是0~290
        if (value <0 || value > 290){
            throw new Error("撞墙啦！！");
        }
        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.X) {
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value = this.X - 10;
            } else {
                // 向左走
                value = this.X + 10;
            }
        }

        this.moveBody();
        this.head.style.left = value + 'px';
        // 检查有没有撞到自己
        this.checkHeadBody();
    }
    set Y(value) {
        if (this.Y === value) {
            return;
        }
        if (value <0 || value > 290){
            throw new Error("撞墙啦！！");
        }
        // 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    moveBody() {
        //遍历身体，从后往前改
        for (let i = this.bodies.length - 1; i > 0; i--){
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    //检测有没有撞到自己
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了！');
            }
        }
    }
}

export default Snake;
