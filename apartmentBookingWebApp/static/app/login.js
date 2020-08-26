var log = new Vue({ 
    el: '#log',
    data: {
    	username: "",
    	password: ""
    },
    methods: {
    	tryLog : function(username, password) {
    		axios
    		.post("/rest/login", {username: this.username, password: this.password})
    		.then(function(response) {
				window.location.href = '/test.html';
			})
			.catch(function(error){alert("Wrong username or password")})
			
		},
    	
    }
});