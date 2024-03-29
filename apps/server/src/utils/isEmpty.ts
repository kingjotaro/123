//Checks if an object is empty by iterating through its keys.
export default function isEmpty(obj: any): boolean {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
