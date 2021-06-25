
// Creating function for plots
function getPlot(status) {
    var years = [1991, 1992, 1993, 1994, 1995,1996,1997,1998,1999,
        2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,
        2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,
        2020];
    var femme = []
    var masc = [] 
    var nullielist = []
    var _3rdGenderList = []  
    d3.json("static/data_collection/Beard_db_final.json").then((data)=> {
        years.forEach(date => {
            let female = 0;
            let male = 0;
            let nullie = 0;
            let _3rdGender = 0;
            yearArray = data.values.filter(i => i.year == date)
            yearArray.forEach(j => {
                var gender = j.gender;
                var year = j.year;

                if (gender === "Female"){
                    female += 1;
                } else if (gender === "Male"){
                    male += 1; 
                } else if (gender === null){
                    nullie += 1;
                } else {
                    _3rdGender += 1;
                }
                });
            masc.push(male);
            femme.push(female);
            nullielist.push(nullie);
            _3rdGenderList.push(_3rdGender);
            // console.log("femme");
            // console.log(femme);
            // console.log("masc");
            // console.log(masc);
            // console.log("nullie" + (nullielist));
            // console.log(_3rdGenderList);
            });
        console.log(years);
        var trace1 = {
            x: years,
            y: masc,
            type: 'scatter',
            name:'Male'
        };
        var trace2 = {
            x: years,
            y: femme,
            type: 'scatter',
            'name':'Female'
        };
        var trace3 = {
            x: years,
            y: nullielist,
            type: 'scatter',
            'name':'Unknown'
        };
        var data = [trace1, trace2,trace3];
        Plotly.newPlot('gauge', data, {}, {showSendToCloud: true});  });
}

function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// Initializes the page with a default plot
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
 
    d3.json("static/data_collection/Beard_db_final.json").then((data)=> {
        // console.log("this dat")
        // console.log(data)
        // console.log(data.values[15].gender);

   
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