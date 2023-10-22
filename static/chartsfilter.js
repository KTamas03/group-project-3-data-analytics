// Using data from /counts route of API

const url2 = "http://127.0.0.1:5000/api/v1.0/counts"

// This function plots a horizontal barchart for input = [year,feature] chosen 
function BarChart(input) {
    d3.json(url2).then(function(data) {
        let year = input[0];
        let option = input[1];
        let Data = data[0]
        let feature_data=''
        // selecting dataset that user has chosen 
        if (option=='Locality Type'){
            feature_data=Data.DEGS 
        }
        else if (option=='LGA (Top 10)'){
            feature_data=Data.LGA 
        }
        else if (option=='Region'){
            feature_data=Data.region
        }
        else if (option=='Atmospheric Condition (Top 10)'){
            feature_data=Data.atmos_cond
        }
        else if (option=='Surface Condition (Top 10)'){
            feature_data=Data.surface_cond
        }
        else if (option=='Light Condition'){
            feature_data=Data.light_cond
        }
        else if (option=='Speed Zone (Top 10)'){
            feature_data=Data.speed_zone
        }
        else if (option=='Age Group'){
            feature_data=Data.age_group
        }
        else if (option=='Vehicle Type (Top 10)'){
            feature_data=Data.vehicle_type
        }
        else if (option=='Vehicle Brand (Top 10)'){
            feature_data=Data.vehicle_brand
        }
        let feat = [];
        let accident_count = [];
        let accident_count_copy=[];
        // Putting features and accident numbers into separate arrays
        for (const [key, value] of Object.entries(feature_data)){
            if (key.slice(-4)==year){
                feat.push(key);
                accident_count.push(value);
                accident_count_copy.push(value);
            }
        }
        // cleaning features
        for (let i=0;i<feat.length;i++){
            // Converting strings to lower case and removing year from end of string
            feat[i]=feat[i].toLowerCase()
            feat[i]=feat[i].substring(0, feat[i].length-5)

            if (option=='Locality Type'){
                // Adding space to end of string
                feat[i]=`${feat[i]} `
                // Making first letter uppercase
                feat[i]=feat[i][0].toUpperCase() + feat[i].slice(1)
                feat[i] = feat[i].replace("_", " ")
                if (feat[i]=="Large provincial_cities "){
                    feat[i]="Large provincial cities "
                }
            }
            else if (option=='Vehicle Brand (Top 10)'){ // Making corrections to vehicle brand names
                feat[i]=`${feat[i]} `
                feat[i]=feat[i][0].toUpperCase() + feat[i].slice(1)
                if (feat[i] == '       '){
                    accident_count[i]=0;
                    }
                else if (feat[i]=='Unkn   '){
                    feat[i]='Unknown '
                }
                else if (feat[i]=='Hyndai '){
                    feat[i]='Hyundai '
                }
                else if (feat[i]=='Mitsub '){
                    feat[i]='Mitsubishi '
                }
            }
            else if (option == 'Speed Zone (Top 10)'){ // Changing speed zone codes to names
                if (feat[i]=='999'){
                    feat[i]='Unknown'
                }
                else if (feat[i]=='888'){
                    feat[i]='Camping grounds, off road'
                }
                else if (feat[i]=='777'){
                    feat[i]='Other'
                }
                else {
                    feat[i]=`${feat[i]} km/hr `
                }

            }
            else if (option == 'Vehicle Type (Top 10)'){ 
                feat[i]=`${feat[i]} `
                feat[i]=feat[i][0].toUpperCase() + feat[i].slice(1)
                if (feat[i]=='Prime mover (no of trailers unknown) '){
                    feat[i]='Prime mover '
                }
                else if (feat[i]=='Heavy vehicle (rigid) > 4.5 tonnes '){
                    feat[i]='Heavy vehicle '

                }
                else if (feat[i]=='Light commercial vehicle (rigid) <= 4.5 tonnes gvm '){
                    feat[i]='Light commercial vehicle '

                }
            }
            else if (option == 'Region' || option == 'Atmospheric Condition (Top 10)' || option=='Surface Condition (Top 10)' || option=='Light Condition' || option == 'LGA (Top 10)'){
                feat[i]=`${feat[i]} `
                feat[i]=feat[i][0].toUpperCase() + feat[i].slice(1)
        }
        }
        // For certain options, only showing top 10
        if (option=='LGA (Top 10)' || option=='Vehicle Type (Top 10)' || option=='Vehicle Brand (Top 10)' || option=='Atmospheric Condition (Top 10)'|| option=='Speed Zone (Top 10)'|| option=='Surface Condition (Top 10)'){
            top_10_accident=accident_count_copy.sort(function(a, b){return b - a}).splice(0,10); // sorting top ten 
            top_10_features=[];
            let index = 0;
            for (let i=0;i<10;i++){
                index=accident_count.indexOf(top_10_accident[i]); // finding indices of top ten accidents 
                top_10_features.push(feat[index]); // finding features corresponding to top ten accidents
            }
            accident_count=top_10_accident.reverse();
            feat=top_10_features.reverse();
        }
        let x_label_text = 'Number of Accidents' // Choosing x label 
        if (option == 'Age Group'){
            x_label_text='Number of People'
        }
        else if (option == 'Vehicle Type (Top 10)'||option == 'Vehicle Brand (Top 10)'){
            x_label_text='Number of Vehicles'
        }
            let bar_data = [{  
                x: accident_count,
                y: feat,
                type: "bar",
                orientation:'h',
                marker: {
                    color: 'green'
                }
            }];
            let layout = {
                yaxis: {
                    automargin: true,
                  },
                xaxis: {
                    title: {
                        text: x_label_text,
                      }
                  },
                  bargap: 0.3, // Adjust the gap between bars
                  // Set the background color of the plot area to make it opaque
                  paper_bgcolor: 'rgba(255, 255, 255, 0.1)', // Opaque white color for the entire chart background
                  plot_bgcolor: 'rgba(255, 255, 255, 0.1)',
              }
            Plotly.newPlot("bar", bar_data,layout); // Plotting data 
        }
    )};


// // Assigning variable to div with class = selDatasetFeat
let dropdownMenuFeat = d3.select("#selDatasetFeat");

let dropdownMenuYear = d3.select("#selDatasetYear");

function optionChanged(){
    // Finding options chosen
    let feature = dropdownMenuFeat.property("value");
    let year = dropdownMenuYear.property("value");
    // Calling function for options
    BarChart([year,feature]);
}


// This function plots default charts for when the page is vistited 
function init(){
    // Plotting default charts 
    BarChart(['2020','Locality Type']);
    // Put options in the dropdown menu 
    years = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
    features=['Locality Type','LGA (Top 10)','Region','Atmospheric Condition (Top 10)','Surface Condition (Top 10)','Light Condition','Speed Zone (Top 10)','Age Group','Vehicle Type (Top 10)','Vehicle Brand (Top 10)']
    for (let i = 0;i<features.length;i++){
        dropdownMenuFeat.append("option").text(features[i]);
    }
    for (let i = 0;i<years.length;i++){
        dropdownMenuYear.append("option").text(years[i]);
    }
};

init()