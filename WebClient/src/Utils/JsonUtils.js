export function isJsonValid(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export function convertJsonToPatchString(obj) {
    if (!obj) {
        return "[]"
    }

    let result = "[{}";
    Object.keys(obj).forEach((key, index) => { result += `,{"propName":"${key}","value":"${obj[key]}"}` });
    result += "]"

    return result
}

export function convertJsonToFormData(obj) {
    let formData = new FormData();

    Object.keys(obj).forEach((key, index) => { 
        formData.append(key, obj[key])
    });

    return formData
}