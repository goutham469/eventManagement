const getTime = ()=>{
    let cur_date = new Date();

    let currentTime = `${cur_date.getHours()}/${cur_date.getMinutes()}/${cur_date.getSeconds()}`

    return currentTime
}

module.exports = getTime;