import foo from './foo';
import bar from './foo';

const message = 'Eat your greens';
function doAlert() {
    setTimeout(() => {
        alert(message);
        console.log(this);
        console.log(foo);
    });
}
new doAlert();