export const formatdate = (date) => {
    const dateaObj = new Date(date);
    const hour = dateaObj.getHours();
    const min = dateaObj.getMinutes();
    return `${formatNumber(hour)}:${formatNumber(min)}`;
}
const formatNumber=(num)=>{
    if(num<10) return `0${num}`;
    return num;
}