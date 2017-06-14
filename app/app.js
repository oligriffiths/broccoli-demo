import foo from './foo';
import bar from './foo';
import answer from 'the-answer';

const message = 'Eat your greens';
function doAlert() {
    const arr = [1,3,4];
    arr.reduce((a, b) => a + b, 0);
    console.log(arr);

    setTimeout(() => {
        console.log(message);
        console.log(this);
        console.log(foo);
        console.log(answer);
    });
}
new doAlert();