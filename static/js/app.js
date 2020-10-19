var datab=d3.json('/../samples.json').then(data => {
    var selection='940';
    function filtering(samples){
        return samples.id==selection;
    }
    var filtered=data.samples.filter(filtering);
    var tops=data.samples.map(sample=> sample.sample_values[0]);
    console.log(data.samples);
    console.log(`-----------`);
    console.log(tops);
    console.log(`-----------`);
    console.log(filtered);
    var top_vals=filtered['0'].sample_values.slice(0,10);
    var otu_ids=filtered['0'].otu_ids.slice(0,10);
    console.log(otu_ids);
    var otus=otu_ids.map(val=>'OTU '+val);
    var trace1 = {
        x: top_vals.reverse(),
        y: otus.reverse(),
        text: selection,
        type: "bar",
        orientation: "h"
      };
    var layout={title: selection};
    var to_plot=[trace1];
    Plotly.newPlot('bar',to_plot,layout);
})

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }