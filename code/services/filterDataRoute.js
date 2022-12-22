const fs = require("fs");
const _ = require("lodash");
const getFilterData = async(filter, filterQuery, orderby) => {
    const content = fs.readFileSync('./data/sampleData.json', "utf8");
    const filterQueryNew = filterQuery ? filterQuery.sortData : [];
    const filterOnData = filter ? filter.filterOn : '';
    const filterOrderBy = orderby ? orderby.orderBy : '';
    const convertContent = JSON.parse(content);
    let passedContent = [];
    Object.keys(convertContent).forEach((item)=>{
        if(item === filterOnData){
            passedContent = convertContent[item];
        }
    });
    const allcontent = passedContent.length > 0 ? passedContent.filter((data)=> data === filterOnData) : [];
    const checkProperty = allcontent.hasOwnProperty("title") ? 'title' : 'name';
    const resultReturn = await processData(passedContent, filterQueryNew, checkProperty);
    const orderbyRes = _.orderBy(resultReturn, filterOrderBy, ['asc']);
    return orderbyRes;
}

const processData = (data, filterQuery,checkProperty) => {
    const result = _.intersectionBy(data, filterQuery, checkProperty);
    return result;
}

module.exports = {
    getFilterData: getFilterData
}