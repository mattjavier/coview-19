const { User } = require("../../models");

document.getElementById('signIn').addEventListener('click', event => {

  var usernameInput = $("input#username");
  var passwordInput = $("input#password");
 
//   console.log( usernameInput.val(), passwordInput.val())

    event.preventDefault()
    var userData = {
        username: usernameInput.val(),
        password: passwordInput.val()
      };
  
      console.log(userData)
      if (!userData.username || !userData.password) {
        console.log('Empty')
        return;
      }
     
      signInUser(userData.email, userData.password);
      usernameInput.val("");
      passwordInput.val("");
    
    })

    axios.get('/api/users') 
    
    .then(() => {
  
      function loginUser(email, password) {
        $.post("/api/login", {
          email: email,
          password: password
        })

      db.User.findOne()

      if (userData.username === Users.username) {
        console.log('yes')
      }


      app.post('/login', function(request, response) {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
          connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
              request.session.loggedin = true;
              request.session.username = username;
              response.redirect('/home');
            } else {
              response.send('Incorrect Username and/or Password!');
            }			
            response.end();
          });
        } else {
          response.send('Please enter Username and Password!');
          response.end();
        }
      })
  
    







      // function signInUser(username, password) {
      //   api.post("/api/signIn", {
      //     username: username,
      //     password: password
      //   })
      //     .then(function(data) {
      //       window.location.replace("/");
      //       // If there's an error, handle it by throwing up a bootstrap alert
      //     })
      //     .catch(handleLoginErr);
      // }

      // function signUpUser(username, password) {
      //   api.post("/api/signUp", {
      //     username: username,
      //     password: password
      //   })
      //     .then(function(data) {
      //       window.location.replace("/");
      //       // If there's an error, handle it by throwing up a bootstrap alert
      //     })
      //     .catch(handleLoginErr);
      // }

      
    
      // function handleLoginErr(err) {
      //   $("#alert .msg").text(err.responseJSON);
      //   $("#alert").fadeIn(500);
      // }
      // }})
      

//     axios.post('/api/items', {
    
//     text: document.getElementById('text').value,
//     isDone: False
    
//     } )


// document.addEventListener('click', event => {
    
//     if (event.target.idName === 'complete') {
    
//     axios.put(`/api/items/${event.target.dataset.id}`, {
//         isDone: event.target.dataset.done === 'false'
//     })
//     .then(() => {
//         if (event.target.dataset.done === 'false') {
//             event.target.dataset.done = 'true'
//         event.target.parentNode.classList.add('done') 
//         event.target.parentNode.classList.remove('notDone') 
//     } else {
//         event.target.dataset.done = 'false'
//         event.target.parentNode.classList.remove('done') 
//         event.target.parentNode.classList.add('notDone') 
//     }
//     })
//     .catch(err => console.log(err))