$(document).on('turbolinks:load', function() {
  $(document).on('click', '#new-category', function (event) {
    event.preventDefault();
    var form_data = $('#new_category');
    $.ajax({
      type: 'POST',
      url: '/admin/categories',
      data: form_data.serialize(),
      dataType: 'html',
      success: function(resp) {
        if($(resp).filter('#error_explanation').length){
          $('#error_explanation').remove();
          $('#main-content').prepend(resp);
        } else {
          alert(I18n.t('admin.categories.new.success'));
          $('#main-content').find('#error_explanation').slideUp();
          $('#category_name').val('');
          $('#result_search').prepend(resp);
          if(current_elements_in_page() >= PER_PAGE){
            $('#result_search').children('tr').last().remove();
          }
          index_for();
        }
        $('#new-category-modal').slideUp();
        $('.modal-backdrop').fadeOut();
      },
      error: function () {
        alert(I18n.t('admin.categories.new.danger'));
      }
    })
  });

  $(document).on('click', '.update-cate', function (event) {
    event.preventDefault();
    var id = $(this).attr('id');
    $('#edit-category-modal-' + id).modal();
    $('#update-category-' + id).click(function () {
      event.preventDefault();
      var form_data = $('#edit_category_'+id);
      $.ajax({
        type: 'PUT',
        url: '/admin/categories/'+id,
        data: form_data.serialize(),
        dataType: 'html',
        success: function(resp) {
          if($(resp).filter('#error_explanation').length){
            $('#error_explanation').remove();
            $('#main-content').prepend(resp);
          } else {
            alert(I18n.t('admin.categories.update.success'));
            $('#main-content').find('#error_explanation').slideUp();
            $('#result_search').children('#category-' + id).replaceWith(resp);
            index_for();
          }
          $('#edit-category-modal-' + id).slideUp();
          $('.modal-backdrop').fadeOut();
        },
        error: function () {
          alert(I18n.t('admin.categories.update.danger'));
        }
      })
    });
  });

  $(document).on('click', '.del-cate', function (event) {
    event.preventDefault();
    var id = $(this).attr('id');
    var name = $('#category-'+id).children('td').eq(1).text().trim();
    if(confirm('Delete category '+name+' ?')){
      $.ajax({
        url: '/admin/categories/' + id,
        method: 'DELETE',
        success: function(){
          alert(I18n.t('admin.categories.delete.success'));
          $('#category-'+id).remove();
          index_for();
        },
        error: function () {
          alert(I18n.t('admin.categories.delete.danger'));
        }
      });
    }
  });
});
