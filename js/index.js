$(function(){
    var audio = $('audio').get(0);
  //  获取数据并且渲染到页面中
    var database=[];
    var createList = function(){
      $.each(database,function(k,v){
         $('<li mid="j10" class=""><strong class="music_name" title="'+v.title+'">'+v.title+'</strong><strong class="singer_name" title="'+v.artist+'">'+v.artist+'</strong><strong class="play_time">'+v.duration+'</strong></li><div class="list_cp"><strong class="btn_like" title="喜欢" name="" mid="004fQTu016b9W4"><span></span></strong><strong class="btn_share" title="分享"><span></span></strong><strong class="btn_fav" title="收藏到歌单"><span></span></strong><strong class="btn_del" title="从列表中删除"><span></span></strong></div>').appendTo('#cc');
      })
      $('.open_list').find('span').text(database.length);
    }
  $.getJSON('./js/database.json')
   .done(function(data){
      database = data;
      createList();
  });

  var currentSong = 0;
  var onsongchange = function(){
      audio.play();
      $('#divplaylist').find('li').removeClass('play_current');
      $('#divplaylist li').eq(currentSong).addClass('play_current');
      $('.music_info_main p').eq(0).find('span').text(database[currentSong].title);
      $('.music_info_main p').eq(1).text(database[currentSong].artist);
      $('.music_info_main p').eq(2).text(database[currentSong].duration);
      
  }
  $('#divplaylist').on('click','li',function (e) {
       currentSong = $(this).index();
       audio.src = database[currentSong].filename;
       onsongchange();
       $('#btnplay').removeClass('play_bt').addClass('pause_bt')
       $('#musicop').css('display','block')
 })


  


     $('#btnplay').on('click',function(){
     	if(audio.paused){
           audio.play();
           $(this).removeClass('play_bt').addClass('pause_bt');

     	}else{
            audio.pause();
            $(this).removeClass('pause_bt').addClass('play_bt');
     	}
     	  
     })

     //声音控制
     $('#spanvolume').on('click',function(e){
     	 var paifenbi = e.offsetX/$(this).width();
     	 console.log(paifenbi)
     	 audio.volume = paifenbi;
     	 $('#spanvolumebar').css('width',paifenbi*100+'%')
     	 $('#spanvolumeop').css('left',paifenbi*100+'%')
         
     })
    //音量的拖拽效果
    $('#spanvolume').on('mousemove',function(e){
         var paifenbi = e.offsetX/$(this).width();
         console.log(paifenbi)
         audio.volume = paifenbi;
         $('#spanvolumebar').css('width',paifenbi*100+'%')
         $('#spanvolumeop').css('left',paifenbi*100+'%')
         
     })
     // 设置静音
     var prepvolume;
     $('#spanmute').on('click',function(){
     	  $(this).toggleClass('volume_mute').addClass('volume_icon');
     	  if(audio.volume = 0){
     	  	$('#spanmute').removeClass('volume_mute').addClass('volume_icon')
     	  	 audio.volume = prepvolume
     	  }else{
             
     	     prepvolume = audio.volume
     	     return;
     	  }  
     })
     //播放进度控制
     $('.player_bar').on('click',function(e){
     	 var jingdu = e.offsetX/$(this).width();
     	 // console.log(jingdu)
     	 audio.currentTime = jingdu*audio.duration
     	 $('#spanprogress_op').css('left',jingdu*100+'%');
     	 $('#spanplaybar').css('width',jingdu*100+'%');
     })
     // 播放鼠标拖

     //进度条变化
     $(audio).on('timeupdate', function(){
     	 var bianhuadewidth = (this.currentTime/this.duration)*$('#spanplayer_bgbar').width()
         console.log(bianhuadewidth)
     	 $('#spanprogress_op').css('left',bianhuadewidth);
     	 $('#spanplaybar').css('width',bianhuadewidth);
     })
 
     // 切换歌曲
     
     var play = function(){
     	audio.play();
        onsongchange();
    	$('#ptime').text(currentSong[$(this).index()].duration);
    	audio.onended = function(){
    	audio.src= database[currentSong+1].filename;
    	audio.play();
    	}
     }

     // 切换下一首
     $('#nextbt').on('click',function(){
     	currentSong +=1;
     	if(currentSong === database.length){
            currentSong = 0;
        }
     	audio.src=database[currentSong].filename
        audio.play();
        $('#btnplay').removeClass('play_bt').addClass('pause_bt');
        $('#divplaylist').find('li').removeClass('play_current');
       $('#divplaylist li').eq(currentSong).addClass('play_current');
     })
     // 切换上一首
     $('#prevbt').on('click',function(){
         currentSong -=1;
         if(currentSong === -1){
            currentSong = database.length-1;
         }

     	 audio.src=database[currentSong].filename;
         audio.play();
         $('#btnplay').removeClass('play_bt').addClass('pause_bt');
         $('#divplaylist').find('li').removeClass('play_current');
      $('#divplaylist li').eq(currentSong).addClass('play_current');
     })


    $('#spansongnum1').on('click',function(){
   	  $('#divplayframe').toggleClass('play_list_frame').addClass('chuxianhexiaoshi');
    })
    // 列表循环
    $('#btnPlayway').on('click',function(e){
   	 $('#divselect').show();


   })
    var zheshilei = ['ordered_bt','unordered_bt','cycle_single_bt','cycle_bt'];

    $('#divselect').on('click','strong',function(e){
        $('#divselect').hide();
        $('#btnPlayway').removeClass().addClass(zheshilei[$(this).index()])

    })

  // 清空列表
  $('#clear_list').on('click',function(){
      $('.play_list_main').text('');
  })
  
  //音乐分享删除
  $('#cc').on('mouseenter mouseleave','li',function(e){
      $(this).toggleClass('play_hover')
  })
  //底部动画的消失
  $('#btnfold').on('click',function(){
      $('.play_list_frame').fadeOut(80)
      // $('.m_player').animate(left:'-540px').toggleClass()
  })





  // $('.folded_bt').on('click',function(){
     
  //    $('#divplayer').animate({left:'0'},2000).removeClass('m_player_playing')

     

  // })
})  
    




