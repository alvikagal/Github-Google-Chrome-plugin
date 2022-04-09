window.onload = function () {
    let url = "https://api.github.com/repos/alvikagal/Github-Google-Chrome-plugin/issues";
    document.getElementById("login").focus();
    document.getElementById('form').addEventListener('submit', function (e) {
        e.preventDefault();

        let formData = new Object(),
            login = document.getElementById('login').value,
            password = document.getElementById('password').value,
            title = document.getElementById('title'),
            textDescription = document.getElementById('textDescription'),
            httpRequest = new XMLHttpRequest();

        formData[title.name] = title.value;
        formData[textDescription.name] = textDescription.value;

        httpRequest.onreadystatechange = function () {
            console.log(httpRequest.responseText);
            console.log(httpRequest.status);
            console.log(this.readyState);
            // alert(httpRequest.responseText)
            if (this.readyState == 4 ) {
                if (this.status == 201){
                    document.getElementById("result").classList.add("text-success")
                    document.getElementById("result").classList.remove("text-danger")
                    document.getElementById("result").innerHTML = 'Issue add';
                    setTimeout(goodbay, 2000);
                }
                else {
                    document.getElementById("result").classList.add("text-danger")
                    document.getElementById("result").classList.remove("text-success")
                    document.getElementById("result").innerHTML = 'Error login or token';
                    setTimeout(alert, 2000, 'Error - '+this.status);
                }

            }
        }

        httpRequest.open('POST', url, true);
        httpRequest.setRequestHeader("Accept", "application/vnd.github.v3+json");
        httpRequest.setRequestHeader("Authorization", "Basic " + btoa(login + ":" + password));
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.send(JSON.stringify(formData));

        function goodbay() {
            alert('Success')
            window.close()
        }
    })

}