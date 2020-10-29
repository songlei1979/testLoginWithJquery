BaseURL = "http://127.0.0.1:8000/";

function login(username, password){
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: BaseURL+'api/auth/login',
        data: {username : username, password: password},
        async: false,
        success: function (data) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            console.log(JSON.stringify(data.user));
            console.log(data.token);
            location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function hasValidToken(){
    token = localStorage.getItem('token');
    var loginStatus = false;
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: BaseURL+'api/auth/user',
        headers: { 'Authorization': 'Token ' + token },
        async: false,
        success: function (data) {
            console.log(data);
            loginStatus = true;
        },
        error: function (err) {
            console.log(err);
        }
    });
    return loginStatus;
}

function hasValidLogin(){
    var loginStatus = false;
    try {
        user = JSON.parse(localStorage.getItem('user'));
        token = localStorage.getItem('token');
        // console.log("validToken: "+hasValidToken());
        if (hasValidToken()){
            loginStatus = true;
        }
    }
    catch(err) {
        console.log("no user login");
    }
    return loginStatus;
}

function logout(){
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: BaseURL+'api/auth/logout',
        headers: { 'Authorization': 'Token ' + token },
        async: false,
        success: function (data) {
            console.log(data);
            localStorage.clear();
            location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
}
