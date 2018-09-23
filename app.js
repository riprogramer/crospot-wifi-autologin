const http = require('http');
var interval_provjere_u_ms=5000;
var check_url="http://detectportal.firefox.com/success.txt";
var logon_url_part="http://192.168.101.1:2050/nodogsplash_auth/";
setInterval(function(){
http.get(check_url, (resp) => 
{
	let d = '';
	resp.on('data', (c) => {d += c;});
	resp.on('end', () => 
	{
		if(d.includes(logon_url_part))
		{
			var rest = d.split(logon_url_part);
			rest=rest[1].split('"')[0];
			http.get(logon_url_part+rest, (resp) => 
			{
				let e = '';
				resp.on('data', (c) => {e += c;});
				resp.on('end', () => {console.log("Logged you in");})	
			});
		}else{console.log("Idle");}
	});
}).on("error", (err) => 
	{console.log("Error: " + err.message);});}, interval_provjere_u_ms);
