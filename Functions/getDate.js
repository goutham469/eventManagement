const getDate = ()=>{
    let cur_date = new Date();
    let today_date = `${cur_date.getDate()}/${cur_date.getMonth()}/${cur_date.getFullYear()}`
    return today_date;
}

module.exports = getDate()