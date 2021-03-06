// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.timeago
//= require bootstrap
//= require_tree .

$(document).ready(function(){
  setTimeout(function(){
  $('.alert-dismissible').fadeOut();
    },
   2000);

  jQuery("time.timeago").timeago();

  $(".comment-button").submit(function() {
  return false;
  });

  $('.comment-button').on('click', function(){
    var slug = $('.var').data('url');
    var api_key = $('.var').data('key');
    var dataParams = { comment: $('#comment-body').val(),
                       api_key: api_key
                     }

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/v1/projects/" + slug + "/comments",
      // ***** url: "https://vicarious.li/api/v1/projects/" + slug + "/comments",
      data: dataParams,
      success: function(comment){
        $('#comment-body').val('');
        $('.comments-list').prepend("<li class='blah'><div class='comment-main-level'><div class='comment-avatar'><img src='" + comment.user.avatar_url + "'></div><div class='comment-box'><div class='comment-head'><h6 class='comment-name by-author'>" + comment.user.name + " | " + jQuery.timeago(comment.created_at) + "</h6></div><div class='comment-content'>" + comment.comment_body + "</div></div></div></li>")
      }
      });
    });


  });
