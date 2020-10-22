var datab=d3.json('/../samples.json').then(data => {
    var selection=d3.select('#selDataset');
    var options=selection.selectAll('option');
    options.data(data.names)
      .enter()
      .append('option')
      .text(function(d){
      return `${d}`
      })
    var pat_id='default';
    function changer(){
      pat_id=selection.node().value;
      console.log('success');
      function filtering(samples){
        return samples.id==pat_id;
      }
      var dem=data.metadata.filter(filtering);
      var dem_dom=d3.select('#sample-metadata');
      var list=dem_dom.selectAll('li');
      list.data(Object.entries(dem[0]))
        .text(function (d){
          return d;
        })
      var filtered=data.samples.filter(filtering);
      console.log(filtered);
      var tops=data.samples.map(sample=> sample.sample_values[0]);
      var top_vals=filtered['0'].sample_values.slice(0,10);
      var otu_ids=filtered['0'].otu_ids.slice(0,10);
      var otus=otu_ids.map(val=>'OTU '+val);
      Plotly.restyle('bar','x',[top_vals.reverse()]);
      Plotly.restyle('bar', 'y',[otus.reverse()]);
      Plotly.relayout('bar',{title:`Patient ${pat_id}`});
      Plotly.restyle('bubble','x',[otu_ids])
      Plotly.restyle('bubble','y',[top_vals])
      Plotly.relayout('bubble',{title: `Patient ${pat_id}`})

    }
    selection.on('change',changer);
    console.log(pat_id);

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
