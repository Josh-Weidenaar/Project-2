
function GetDropDownData() { 
  $.ajax({
    type: "GET",
    url: "/api/data/all",
    data: '{values : }',
    dataType: "json",
    success: function(data) {
      console.log("thisdat")
      console.log(data)
      unique ={}
      data.values.forEach(i => {
        var name = i["honoree name"];
        var html = '<li class="dropdown-item">' + name + '</li>';
        if(typeof unique[name] == "undefined") {
          unique[name] = ""
          $("#afterthis").append(html)//.text(name).property("value")
        }
        
      });
    }
  })
}
// ('your-custom-id').mdbDropSearch();
const searchInputDropdown = document.getElementById('search-input-dropdown');


searchInputDropdown.addEventListener('input', () => {
  const dropdownOptions = document.querySelectorAll('li.dropdown-item');
  console.log(dropdownOptions)
  console.log("this is happening")
  const filter = searchInputDropdown.value.toLowerCase();
  console.log(filter)
  showOptions();
  const valueExist = !!filter.length;
  console.log(valueExist)
  if (valueExist) {
    dropdownOptions.forEach((el) => {
      console.log("els happening")
      console.log(el)
      const elText = el.textContent.trim().toLowerCase();
      console.log("elishere" + elText);
      const isIncluded = elText.includes(filter);
      if (!isIncluded) {
        el.style.display = 'none';
      }
    });
  }
});

const showOptions = () => {
  const dropdownOptions = document.querySelectorAll('li.dropdown-item')
  dropdownOptions.forEach((el) => {
    el.style.display = 'flex';
  })
}

// populated tables from: https://medium.com/@defrian.yarfi/load-json-data-into-table-using-jquery-56b97b59024
// json data
var api = "/api/data/all";
// button trigger
$('#search').on('click',function() {      
   var button = $(this);      
   $.ajax({
      url:api,
      method:'GET',
      cache:false,
      type:"text/json"
   })
   .always(function(){
      $(button).html('Load Doctor Data...');
   })
   .done(function(evt) {
      // Disable button
      $(button).prop('disabled',true);
      // Set timeout for lazy loading
      setTimeout(function(){
         var result = JSON.parse(evt);
         var html = '<h2>Data Dokter</h2>';
         html += '<div class="tables-doctor-content">';
         for(var i=0;i < result.Data.length; i++) {
            html +='<h3 class="tables-doctor-name">'+result.Data[i].DoctorName+'</h3>'
               +'<p class="tables-doctor-title">'+result.Data[i].Specialist+'</p>';
if(result.Data[i].Hospitals.length > 0) {  
               html +='<table class="table">'
                  +'<thead>'
                  +'<tr>'
                  +'<th scope="col">Nama Rumah Sakit</th>'
                  +'<th scope="col">Alamat</th>'
                  +'<th scope="col">Jadwal Praktek</th>'
                  +'</tr>'
                  +'</thead>'
                  +'<tbody>';
for(var j=0;j < result.Data[i].Hospitals.length; j++) {
                  html +='<tr>'
                     +'<th scope="row">'+result.Data[i].Hospitals[j].Name+'</th>'
                     +'<td>'+result.Data[i].Hospitals[j].Address+'</td>'
                     +'<td>'+result.Data[i].Hospitals[j].Schedule+'</td>'
                     +'</tr>';
               }
               html +='</tbody></table>';
            }
         }
         html +='</div>';
         // Set all content
         $('.tables-doctor').html(html);
     },1000); 
   })
   .fail(function() {
      alert('Error : Failed to reach API Url or check your connection');
      $(button).prop('disabled',false);
   })
   .then(function(evt){
      setTimeout(function(){        
         $(button).css({'background-color':'#ccc'}).hide();          
      },1000);
   });
});
