var axios = require('axios');

var helpers = {

  runQuery: function(term, start, end)  {

    term = term.trim();
    start = start.trim() + "0101";
    end = end.trim() + "1231";

    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
          'api-key': '9707b10b5ab44dada00194c572da1017',
          'q': term,
          'begin_date': start,
          'end_date': end
      }
    }).then(function(results){
      return results.data.response;
    });
  },

  getSaved: function(){
    return axios.get('/api/saved').then(function(results){
        return results;
    });
  },

  postSaved: function(title, date, url){
    var newArticle = {title: title, date: date, url: url};
    return axios.post('/api/saved', newArticle).then(function(results){
        return results._id;
    });
  },

  deleteSaved: function(title, date, url){

    return axios.delete('/api/saved', {
      data: {
        'title': title,
        'date': date,
        'url': url,
      }
    }).then(function(results){
      return results;
    });
  }
}

module.exports = helpers;
