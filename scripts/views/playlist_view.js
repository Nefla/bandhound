var $ = require('jquery'),
    Backbone = require('backbone'),
    ArtistFinder = require('../models/artist_finder'),
    PlayerView = require('./player_view');

Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  initialize: function(){
    this.enabled = false;
    this.selected = null;
    this.player = new PlayerView({
      el: $('#player-controls'),
      playlist: this
    });
    this.$playlist = this.$el.find('table');
    this.page = 1;
  },

  events: {
    "click tr": "playSong",
    "click #load-more": "loadMore"
  },

  search: function(){
    this.$playlist.children('tbody').remove();
    var self = this;
    setTimeout(function(){
      var list = "<tr " + "data-youtube-id='I67ThDYhk7g'";
      list += " data-track-index='0'>" + "<td>Honey</td><td>Open Hand</td></tr>";

      list += "<tr " + "data-youtube-id='TkogNHMcXQI'";
      list += " data-track-index='1'>" + "<td>Crooked crown</td><td>Open Hand</td></tr>";

      list += "<tr " + "data-youtube-id='A_HZqcLylT4'";
      list += " data-track-index='2'>" + "<td>Life as it is</td><td>Open Hand</td></tr>";

      self.$el.append(list);
      self.enabled = true;
    }, 1);
  },

  clear: function(){
    this.$playlist.children('tbody').remove();
    this.selected = null;
    this.playing = null;
  },

  loadMore: function(){
    this.loading();
    this.artistFinder.findSimilar({
      artist: this.artist, page: ++this.page, callback: this.loaded });
  },

  playSong: function(e){
    this.playing = $(e.currentTarget);
    this.selectNewTrack();
    var track  = $(e.currentTarget).children('td')[0].innerText;
    var artist = $(e.currentTarget).children('td')[1].innerText;
    var id = $(e.currentTarget).attr('data-youtube-id');
    this.player.play({artist: artist, title: track, id: id});
  },

  selectNewTrack: function(){
    if (this.selected != null)
      this.selected.removeClass('current');
    this.selected = this.playing;
    this.selected.addClass('current');
  },

  previousSong: function(){
    if (this.playing.prev().length == 0)
      return null;

    this.playing = this.playing.prev();
    this.selectNewTrack();
    return {
      artist: this.playing.children('td')[1].innerText,
      title : this.playing.children('td')[0].innerText,
      id    : this.playing.attr('data-youtube-id')
    };
  },

  nextSong: function(){
    if (this.playing.next().length == 0)
      return null;

    this.playing = this.playing.next();
    this.selectNewTrack();
    return {
      artist: this.playing.children('td')[1].innerText,
      title : this.playing.children('td')[0].innerText,
      id    : this.playing.attr('data-youtube-id')
    };
  },

  findSimilarArtists: function(artist){
    this.clear();
    this.loading();
    this.artistFinder = new ArtistFinder();
    this.artistFinder.findSimilar({artist: artist, callback: this.loaded});
    this.enabled = true;
  },

  loading: function(){
    // Display load spinner
    var $loader = $('#loader-container');
    $loader.removeClass('hidden');

    // Hide load more button
    var $loadMore = $('#load-more');
    $loadMore.addClass('hidden');
  },

  loaded: function(){
    var $loader = $('#loader-container');
    $loader.addClass('hidden');

    var $loadMore = $('#load-more');
    $loadMore.removeClass('hidden');
  }
});