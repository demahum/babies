var Babies = {
  get_babies : function(){
    RestClient.get('rest/babies', function(data){
      var html = '';
      for(var i = 0; i < data.length; i++){
        html += '<tr> <td>' + data[i].gender + '</td>';
        html += '<td>' + data[i].weight + '</td>';
        html += '<td>' + data[i].height + '</td>';
        html += '<td>' + data[i].mother_name + '</td>';
        html += '<td>' + data[i].date_time + '</td>';
        html += '<td><button type="button" class="btn btn-danger" onclick="Babies.delete_baby('+data[i].id+');">Delete</button></td> </tr>';
      }

      $("#babies_body").html(html);
    });
  },

  get_babies_count : function(){
    RestClient.get('rest/baby_count', function(data){
      $("#count_males").html(data.male);
      $("#count_females").html(data.female);
    });
  },

  add_baby : function(data, callback, error_callback){
    RestClient.post('rest/babies', data, callback, error_callback);
  },

  delete_baby : function(id){
    RestClient.delete('rest/babies/'+id, {}, function(){
      toastr.success('Baby has been deleted successfully');
      Babies.get_babies();
    });
  }
}
