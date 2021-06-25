
// function to get data
function getInfo(id) {
    // read the json file
    // const url = "/api/data/all";
    
    d3.json("static/data_collection/Beard_db_final.json").then((data)=> {
        
        // get the info for the demographic panel
        var metadata = data.values;

        console.log(metadata);

        //filter by id
        var result = metadata.filter(meta => meta._id["$oid"].toString() === "60c960daf161e35aa00b202b");
        
        console.log(result)
        // // select demographic panel to put data
        // var demographicInfo = d3.select("#sample-metadata");
        
        // // empty the demo panel
        // demographicInfo.html("");

        // // grab the demographic data for the id and append
        // Object.entries(result).forEach((key) => {   
        //         demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        // });
    });
}

// Creating function for plots
// function getPlot(id) {
//     // getting data from the json file
//     d3.json("../data_collection/Beard_db_final.json").then((data)=> {
//         console.log(data)
  
           
//         // filter by id 
//         var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
//         console.log(samples);
  
//         // top 10 
//         var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
//         // get only top 10 otu ids for the plot OTU and reversing it. 
//         var OTU_TOP = (samples.otu_ids.slice(0, 10)).reverse();
        
//         // get the otu id's to the desired form for the plot
//         var OTU_ID = OTU_TOP.map(d => "OTU " + d)
    
  
//         // get the top 10 labels for the plot
//         var labels = samples.otu_labels.slice(0, 10);
  
 
//         // create trace
//         var trace = {
//             x: samplevalues,
//             y: OTU_ID,
//             text: labels,
//             marker: {
//               color: 'rgb(255,0,153)'},
//             type:"bar",
//             orientation: "h",
//         };

// Initializes the page with a default plot
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
    // const years = { awardyear: function(){
    //     var numberArray = [];

    //     for(var i = 1; i <= 20; i++){
    //         numberArray.push(i);
    //     }; return numberArray}}
    //     console.log(years)
    // read the data 
    var years = [1991, 1992, 1993, 1994, 1995,1996,1997,1998,1999,
        2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,
        2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,
        2020];
    var femme = []
        
    d3.json("static/data_collection/Beard_db_final.json").then((data)=> {
        console.log("this dat")
        console.log(data)
        console.log(data.values[15].gender);

        years.forEach(date => {
            let female = 0;
            yearArray = data.values.filter(i => i.year == date)
            yearArray.forEach(j => {
                var gender = j.gender;
                var year = j.year;

                if (gender === "Female"){
                    female += 1;}
                });
            femme.push(female);
            console.log(femme);
            console.log(female);
            });


        });
        
        // get the id data to the dropdwown menu
        data.values.forEach(function(name) {
            dropdown.append("option").text(name['achievement status']).property("value");
        });

//         // call functions to display the data and the plots
//         getPlot(data['achievement status'][0]);
//         getInfo(data.values[31]['achievement status']);
    };


getInfo();

init();