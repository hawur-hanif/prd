jadi kan kita pake ejs nih. <br>
ejs tuh jadi kita gk perlu ketik ulang berkali-kali kalo ada hal yang sama. <br>
contohnya kek navbar sama heading di html gitu <br>
jadi reusables tuh isinya begituan. <br>

cara make reusable: <br>
tambahin ini di bagian yang diinginkan sesuai dengan ejs nya <br>
<%- include(filepath); %> 
<br>
contohnya : <br>
<%- include('/reusables/navbar');%>
<br>

