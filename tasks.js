var fs = require('fs');
fs.writeFile('aarti.txt', 'i am aarti how', function(err){
    if(!err){
        console.info('[aarti.txt] file created')
    }else{
        console.error(err)
    }
})

try{
    const fc = fs.writeFileSync('yogesh.txt', 'i am aarti\'s navra oo!')
    if(!fc){
        console.info('[yogesh.txt] file created')
    }else{
        console.error(fc)
    }
}catch(e){
    console.log('error in modifying yogesh.txt!!')
}
