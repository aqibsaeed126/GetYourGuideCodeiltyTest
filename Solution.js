// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
    
    let pictureArr = S.split('\n');
    let picObjArr = [];

    // Parse String to Array of Objects with Fields
    for (let i=0; i<pictureArr.length; i++) {
        let tempObj = {};
        let tempArr = pictureArr[i].split(', ');
        obj = {name: tempArr[0], city: tempArr[1], date: tempArr[2]};
        picObjArr.push(obj);
    }

    // Group by City
    let groupByCityObj = picObjArr.reduce((group, obj) => {
        const { city } = obj;
        group[city] =  group[city] || [];
        group[city].push(obj);
        return group;
    }, {});

    // Sort Array of Objects by Date Time
    for(let key in groupByCityObj) {
        let tempArrObj = groupByCityObj[key];
        
        tempArrObj.sort((a,b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);

            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
        });
        groupByCityObj[key] = tempArrObj;
    }

    // Add Number Count(with 0 if needed) Property to Each Object in order 
    for(let key in groupByCityObj) {
        let tempArr = groupByCityObj[key];
        for(let i=1; i<=tempArr.length; i++) {
            // Add advance 0 if length > 9
            if (i !== tempArr.length && tempArr.length > 9) {
                tempArr[i-1]['id'] = '0'+ i;
            } else {
                tempArr[i-1]['id'] = i;
            }
            
        }
    }

    // Compile the result in required format 
    let resultStrArr = Array(picObjArr.length).fill(0);
    for (let key in groupByCityObj) {
        let tempArr = groupByCityObj[key];
        for(let i=0; i<tempArr.length; i++) {
            let nameSplit = tempArr[i].name.split('.');
            let actualName = nameSplit[0];
            let extension = nameSplit[1];

            let tempResult = tempArr[i].city + tempArr[i].id + '.' + extension;

            let index = picObjArr.findIndex((obj) => {
                return obj.name === tempArr[i].name && obj.city === tempArr[i].city;
            });

            resultStrArr[index] = tempResult;
        }
    } 

    // Return in String format
    let finalResultString = ''
    for (let i=0; i<resultStrArr.length; i++) {
        finalResultString += resultStrArr[i];

        if (i !== resultStrArr.length - 1) {
            finalResultString += '\n'
        }
    }
    
    return finalResultString;
}
