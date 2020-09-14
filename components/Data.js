export let Obj = {};
export let IMAGE_PATH = '';
export let changesdetect = 'initialize';
export let changesdetect1 = 'initialize';
export let selected_brand = "";

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
export function SetChangesDetect(val){
    changesdetect = val;
}
export function SetChangesDetect1(val){
    changesdetect1 = val;
}
export function Setselected_brand(val){
    selected_brand = val;
}