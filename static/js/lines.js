var myurl = URL("static/data_collection/Beard_db_final.json")
var jsonData = JSON.parse(myurl);

    
    // get the info for the demographic panel
    var metadata = data.values;
    const ourjson = metadata;
    console.log(metadata);

    metadata.array.forEach(i => {
        console.log(i)
        
    });

console.log(jsonData);