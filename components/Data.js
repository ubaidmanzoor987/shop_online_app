export let Obj = {};
export let IMAGE_PATH = '';
export function SetValues(obj){
    if(obj){
        Obj = obj
    }
};
export function SetImage(img){
    if(img){
        IMAGE_PATH = img;
    }
}
