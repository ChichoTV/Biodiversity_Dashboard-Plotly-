var datab=d3.json('/../samples.json').then(data => {
    var selection=d3.select('#selDataset');
    // the data binding we just learned seemed to be a viable way to add all the patient options
    var options=selection.selectAll('option');
    options.data(data.names)
      .enter()
      .append('option')
      .text(function(d){
      return `${d}`
      })

      // Initializing pat_id variable for filtering the data
    var pat_id='default';

    // Plot restyling function based on pat_id selected
    function changer(){
      pat_id=selection.node().value;
      console.log('success');
      function filtering(samples){
        return samples.id==pat_id;
      }
      var dem=data.metadata.filter(filtering);
      var dem_dom=d3.select('#sample-metadata');
      var list=dem_dom.selectAll('li');
      // Again, data binding to easily show all the demographic data of the patient
      list.data(Object.entries(dem[0]))
        .text(function (d){
          return d;
        })
        // filtering data based on pat_id
      var filtered=data.samples.filter(filtering);
      console.log(filtered);
      var tops=data.samples.map(sample=> sample.sample_values[0]);
      var top_vals=filtered['0'].sample_values.slice(0,10);
      var otu_ids=filtered['0'].otu_ids.slice(0,10);
      var otus=otu_ids.map(val=>'OTU '+val);
      // restyling plots after grabbing all the data
      Plotly.restyle('bar','x',[top_vals.reverse()]);
      Plotly.restyle('bar', 'y',[otus.reverse()]);
      Plotly.relayout('bar',{title:`Patient ${pat_id}`});
      Plotly.restyle('bubble','x',[otu_ids])
      Plotly.restyle('bubble','y',[top_vals])
      Plotly.relayout('bubble',{title: `Patient ${pat_id}`})

    }
    // event handling
    selection.on('change',changer);
    console.log(pat_id);

    // Initial plots function
    function init(){
      pat_id='940';
      function filtering(samples){
        return samples.id==pat_id;
      }
      var dem=data.metadata.filter(filtering);
      var dem_dom=d3.select('#sample-metadata');
      dem_dom.append('ul');
      var list=dem_dom.selectAll('li');
      list.data(Object.entries(dem[0]))
        .enter()
        .append('li')
        .text(function (d){
          return d;
        })
      var filtered=data.samples.filter(filtering);
      console.log(filtered);
      var tops=data.samples.map(sample=> sample.sample_values[0]);
      var top_vals=filtered['0'].sample_values.slice(0,10);
      var otu_ids=filtered['0'].otu_ids.slice(0,10);
      var otus=otu_ids.map(val=>'OTU '+val);
      var trace1 = {
        x: top_vals.reverse(),
        y: otus.reverse(),
        text: selection,
        type: "bar",
        orientation: "h"
      };
      var trace2={
        x:otu_ids,
        y:top_vals,
        mode:'markers',
        marker:{size:top_vals,color:otu_ids}
      }
      var to_plot2=[trace2];
      var layout2={
        title:`Patient ${pat_id}`
      }
      var layout={title:`Patient ${pat_id}`};
      var to_plot=[trace1];
      Plotly.newPlot('bar',to_plot,layout);
      Plotly.newPlot('bubble',to_plot2,layout2);
    }
    init();
})
