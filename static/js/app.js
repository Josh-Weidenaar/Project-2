// function to get data
function getInfo(id) {
    // read the json file
    const url = "/api/data/all";
    
    d3.json(url).then((data)=> {
        
        // get the info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demo panel
        demographicInfo.html("");

        // grab the demographic data for the id and append
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Creating function for plots
function getPlot(id) {
    // getting data from the json file
    d3.json(url).then((data)=> {
        console.log(data)
  
           
        // filter by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // top 10 
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_TOP = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_ID = OTU_TOP.map(d => "OTU " + d)
    
  
        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);
  
 
        // create trace
        var trace = {
            x: samplevalues,
            y: OTU_ID,
            text: labels,
            marker: {
              color: 'rgb(255,0,153)'},
            type:"bar",
            orientation: "h",
        };

// Initializes the page with a default plot
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json(url).then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call functions to display the data and the plots
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}


init();